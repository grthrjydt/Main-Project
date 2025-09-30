
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { getPokemonDetails } from '../services/pokemonService';
import { Pokemon } from '../types';
import TypeBadge from './TypeBadge';

interface PokemonCardProps {
  pokemonId: number;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemonId }) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setIsLoading(true);
        const data = await getPokemonDetails(pokemonId);
        setPokemon(data);
      } catch (error) {
        console.error('Failed to fetch pokemon details', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPokemon();
  }, [pokemonId]);

  if (isLoading || !pokemon) {
    return (
      <div className="bg-gray-800 rounded-lg p-4 flex flex-col items-center justify-center aspect-square animate-pulse">
        <div className="w-24 h-24 bg-gray-700 rounded-full mb-4"></div>
        <div className="h-6 w-32 bg-gray-700 rounded"></div>
      </div>
    );
  }
  
  const isFav = isFavorite(pokemon.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFav) {
      removeFavorite(pokemon.id);
    } else {
      addFavorite(pokemon.id);
    }
  };

  return (
    <Link to={`/pokemon/${pokemon.id}`} className="block">
      <div className="bg-gray-800 rounded-lg shadow-lg p-4 text-center transform hover:scale-105 transition-transform duration-300 flex flex-col items-center justify-between h-full group">
        <div className="relative w-full">
            <img 
                src={pokemon.imageUrl || 'https://picsum.photos/200'} 
                alt={pokemon.koreanName} 
                className="w-32 h-32 mx-auto mb-4 object-contain transition-opacity duration-300 group-hover:opacity-80" 
            />
            <button onClick={handleFavoriteClick} className="absolute top-0 right-0 p-2 text-2xl text-gray-500 hover:text-red-500 transition-colors">
            {isFav ? '♥' : '♡'}
            </button>
        </div>
        <div>
          <p className="text-gray-400 text-sm">No. {String(pokemon.id).padStart(4, '0')}</p>
          <h3 className="text-xl font-bold capitalize mb-2">{pokemon.koreanName}</h3>
          <div className="flex justify-center space-x-2">
            {pokemon.types.map(({ type }) => (
              <TypeBadge key={type.name} type={type} />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PokemonCard;
