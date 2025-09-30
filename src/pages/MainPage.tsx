import React, { useState, useEffect, useRef, useCallback } from 'react';
import { PokemonListItem } from '../types';
import PokemonCard from '../components/PokemonCard';
import Loader from '../components/Loader';

const MainPage: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<PokemonListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nextUrl, setNextUrl] = useState<string | null>('https://pokeapi.co/api/v2/pokemon?limit=24');
  
  const observer = useRef<IntersectionObserver | null>(null);

  const loadMorePokemons = useCallback(async () => {
    if (!nextUrl || isLoading) return;
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(nextUrl);
      const data = await response.json();
      setPokemonList(prev => [...prev, ...data.results]);
      setNextUrl(data.next);
    } catch (err) {
      setError('Failed to fetch Pokémon.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, nextUrl]);

  const lastPokemonElementRef = useCallback((node: HTMLDivElement) => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && nextUrl) {
        loadMorePokemons();
      }
    });
    if (node) observer.current.observe(node);
  }, [isLoading, nextUrl, loadMorePokemons]);

  useEffect(() => {
    loadMorePokemons();
  }, []);

  const getPokemonIdFromUrl = (url: string) => {
      const parts = url.split('/');
      return parseInt(parts[parts.length - 2]);
  }

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {pokemonList.map((pokemon, index) => {
          const pokemonId = getPokemonIdFromUrl(pokemon.url);
          if (pokemonList.length === index + 1) {
            return <div ref={lastPokemonElementRef} key={pokemon.name}><PokemonCard pokemonId={pokemonId} /></div>;
          }
          return <PokemonCard key={pokemon.name} pokemonId={pokemonId} />;
        })}
      </div>
      {isLoading && <div className="flex justify-center my-8"><Loader /></div>}
      {error && <p className="text-center text-red-500 my-8">{error}</p>}
      {!nextUrl && !isLoading && <p className="text-center text-gray-500 my-8">모든 포켓몬을 확인했습니다!</p>}
    </div>
  );
};

export default MainPage;