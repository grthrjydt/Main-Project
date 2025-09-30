import React, { useState, useEffect, useMemo } from 'react';
import { getAllSearchablePokemons } from '../services/pokemonService';
import { SearchablePokemon } from '../types';
import PokemonCard from '../components/PokemonCard';
import Loader from '../components/Loader';

const SearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [allPokemons, setAllPokemons] = useState<SearchablePokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllPokemons = async () => {
      try {
        setIsLoading(true);
        const data = await getAllSearchablePokemons();
        setAllPokemons(data);
      } catch (error) {
        console.error('Failed to fetch all pokemon names', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllPokemons();
  }, []);

  const filteredPokemons = useMemo(() => {
    if (!searchTerm) {
      return [];
    }
    const lowercasedTerm = searchTerm.toLowerCase();
    return allPokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(lowercasedTerm) ||
      pokemon.koreanName.toLowerCase().includes(lowercasedTerm)
    );
  }, [searchTerm, allPokemons]);

  return (
    <div>
      <h2 className="text-4xl font-bold text-center mb-8">포켓몬 검색</h2>
      <div className="max-w-xl mx-auto mb-8">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="포켓몬 이름 입력..."
          className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-500 transition-colors"
          disabled={isLoading}
        />
      </div>

      {isLoading && (
        <div className="flex flex-col justify-center items-center my-8">
          <Loader />
          <p className="text-gray-400 mt-4">도감의 모든 포켓몬을 불러오고 있어요...</p>
        </div>
      )}

      {!isLoading && searchTerm && filteredPokemons.length === 0 && (
         <p className="text-center text-gray-400">"{searchTerm}"(은)는 아직 발견되지 않은 포켓몬인가봐요.</p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredPokemons.map(pokemon => (
          <PokemonCard key={pokemon.name} pokemonId={pokemon.id} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;