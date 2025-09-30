
export interface PokemonListItem {
  name: string;
  url: string;
}

export interface Pokemon {
  id: number;
  name: string;
  koreanName: string;
  imageUrl: string;
  backImageUrl: string;
  types: {
    type: {
      name: string;
      koreanName: string;
    };
  }[];
  stats: {
    base_stat: number;
    stat: {
      name: string;
      koreanName: string;
    };
  }[];
  abilities: {
    ability: {
      name: string;
      koreanName: string;
    };
    is_hidden: boolean;
  }[];
  flavorText: string;
}

export interface PagedPokemonResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export interface SearchablePokemon {
  id: number;
  name: string;
  koreanName: string;
  url: string;
}

export const POKEMON_TYPE_COLORS: { [key: string]: string } = {
  normal: 'bg-gray-400',
  fighting: 'bg-red-700',
  flying: 'bg-indigo-400',
  poison: 'bg-purple-600',
  ground: 'bg-yellow-600',
  rock: 'bg-yellow-800',
  bug: 'bg-lime-500',
  ghost: 'bg-indigo-800',
  steel: 'bg-gray-500',
  fire: 'bg-red-500',
  water: 'bg-blue-500',
  grass: 'bg-green-500',
  electric: 'bg-yellow-400',
  psychic: 'bg-pink-500',
  ice: 'bg-cyan-300',
  dragon: 'bg-indigo-700',
  dark: 'bg-gray-800',
  fairy: 'bg-pink-300',
  unknown: 'bg-gray-200',
  shadow: 'bg-gray-700',
};

export const POKEMON_STAT_NAMES: { [key: string]: string } = {
  hp: "HP",
  attack: "공격",
  defense: "방어",
  'special-attack': "특수공격",
  'special-defense': "특수방어",
  speed: "스피드",
};

export const POKEMON_TYPE_NAMES: { [key: string]: string } = {
  normal: "노말",
  fighting: "격투",
  flying: "비행",
  poison: "독",
  ground: "땅",
  rock: "바위",
  bug: "벌레",
  ghost: "고스트",
  steel: "강철",
  fire: "불꽃",
  water: "물",
  grass: "풀",
  electric: "전기",
  psychic: "에스퍼",
  ice: "얼음",
  dragon: "드래곤",
  dark: "악",
  fairy: "페어리",
};