
import { Pokemon, PagedPokemonResponse, PokemonListItem, SearchablePokemon } from '../types';

const API_BASE_URL = 'https://pokeapi.co/api/v2';
const CACHE: Map<string, any> = new Map();

async function fetchAndCache<T,>(url: string): Promise<T> {
  if (CACHE.has(url)) {
    return CACHE.get(url) as T;
  }
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}`);
  }
  const data = await response.json();
  CACHE.set(url, data);
  return data;
}

const getKoreanName = (names: { language: { name: string }; name: string }[]): string => {
  const koreanNameEntry = names.find(name => name.language.name === 'ko');
  return koreanNameEntry ? koreanNameEntry.name : '';
};

const getKoreanFlavorText = (flavorTextEntries: { language: { name: string }; flavor_text: string }[]): string => {
  const koreanEntry = flavorTextEntries.find(entry => entry.language.name === 'ko');
  return koreanEntry ? koreanEntry.flavor_text.replace(/\n/g, ' ') : 'No description available.';
};

const getPokemonIdFromUrl = (url: string): number => {
    const parts = url.split('/');
    return parseInt(parts[parts.length - 2]);
};

export const getPokemons = async (limit = 20, offset = 0): Promise<PagedPokemonResponse> => {
  return fetchAndCache<PagedPokemonResponse>(`${API_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
};

export const getAllPokemonNames = async (): Promise<PokemonListItem[]> => {
    const data = await fetchAndCache<{results: PokemonListItem[]}> (`${API_BASE_URL}/pokemon?limit=1302`);
    return data.results;
};

export const getAllSearchablePokemons = async (): Promise<SearchablePokemon[]> => {
    const cacheKey = 'allSearchablePokemons';
    if (CACHE.has(cacheKey)) {
        return CACHE.get(cacheKey) as SearchablePokemon[];
    }
    
    const pokemonList = await getAllPokemonNames();
    const searchableList: SearchablePokemon[] = [];
    const batchSize = 100;

    for (let i = 0; i < pokemonList.length; i += batchSize) {
        const batch = pokemonList.slice(i, i + batchSize);
        const batchPromises = batch.map(async (pokemon) => {
            try {
                const id = getPokemonIdFromUrl(pokemon.url);
                const speciesData = await fetchAndCache<any>(`${API_BASE_URL}/pokemon-species/${id}`);
                const koreanName = getKoreanName(speciesData.names) || pokemon.name;
                return {
                    id,
                    name: pokemon.name,
                    koreanName,
                    url: pokemon.url,
                };
            } catch (e) {
                const id = getPokemonIdFromUrl(pokemon.url);
                return {
                    id,
                    name: pokemon.name,
                    koreanName: pokemon.name,
                    url: pokemon.url,
                };
            }
        });
        
        const resolvedBatch = await Promise.all(batchPromises);
        searchableList.push(...resolvedBatch);
    }
    
    CACHE.set(cacheKey, searchableList);
    return searchableList;
}


export const getPokemonDetails = async (idOrName: string | number): Promise<Pokemon> => {
  const pokemonData = await fetchAndCache<any>(`${API_BASE_URL}/pokemon/${idOrName}`);
  const speciesData = await fetchAndCache<any>(`${API_BASE_URL}/pokemon-species/${idOrName}`);
  
  const typesWithKoreanNames = await Promise.all(
    pokemonData.types.map(async (typeInfo: any) => {
      const typeDetails = await fetchAndCache<any>(typeInfo.type.url);
      return {
        ...typeInfo,
        type: {
          ...typeInfo.type,
          koreanName: getKoreanName(typeDetails.names) || typeInfo.type.name,
        },
      };
    })
  );
  
  const abilitiesWithKoreanNames = await Promise.all(
      pokemonData.abilities.map(async (abilityInfo: any) => {
          const abilityDetails = await fetchAndCache<any>(abilityInfo.ability.url);
          return {
              ...abilityInfo,
              ability: {
                  ...abilityInfo.ability,
                  koreanName: getKoreanName(abilityDetails.names) || abilityInfo.ability.name
              }
          }
      })
  );
  
  const statsWithKoreanNames = await Promise.all(
      pokemonData.stats.map(async (statInfo: any) => {
          const statDetails = await fetchAndCache<any>(statInfo.stat.url);
          return {
              ...statInfo,
              stat: {
                  ...statInfo.stat,
                  koreanName: getKoreanName(statDetails.names) || statInfo.stat.name
              }
          }
      })
  );

  return {
    id: pokemonData.id,
    name: pokemonData.name,
    koreanName: getKoreanName(speciesData.names) || pokemonData.name,
    imageUrl: pokemonData.sprites.other['official-artwork'].front_default,
    backImageUrl: pokemonData.sprites.back_default,
    types: typesWithKoreanNames,
    stats: statsWithKoreanNames,
    abilities: abilitiesWithKoreanNames,
    flavorText: getKoreanFlavorText(speciesData.flavor_text_entries),
  };
};