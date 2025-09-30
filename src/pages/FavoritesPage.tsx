
import React from 'react';
import { useFavorites } from '../context/FavoritesContext';
import PokemonCard from '../components/PokemonCard';

const FavoritesPage: React.FC = () => {
  const { favorites } = useFavorites();

  return (
    <div>
      <h2 className="text-4xl font-bold text-center mb-8">찜 목록</h2>
      {favorites.length === 0 ? (
        <div className="text-center text-gray-400 text-xl flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <p>찜한 포켓몬이 없습니다.</p>
            <p className="text-sm mt-2">하트 아이콘을 눌러 포켓몬을 추가해보세요.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {favorites.map((id) => (
            <PokemonCard key={id} pokemonId={id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
