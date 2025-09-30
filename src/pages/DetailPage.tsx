import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPokemonDetails } from '../services/pokemonService';
import { Pokemon } from '../types';
import Loader from '../components/Loader';
import TypeBadge from '../components/TypeBadge';
import { useFavorites } from '../context/FavoritesContext';

const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const fetchPokemon = async () => {
      if (!id) return;
      setIsLoading(true);
      setError(null);
      try {
        const data = await getPokemonDetails(id);
        setPokemon(data);
      } catch (err) {
        setError('앗! 이 포켓몬은 숨어있나 봐요.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPokemon();
  }, [id]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-[calc(100vh-200px)]"><Loader /></div>;
  }

  if (error || !pokemon) {
    return <p className="text-center text-yellow-400 text-2xl mt-10">{error}</p>;
  }

  const isFav = isFavorite(pokemon.id);

  const handleFavoriteClick = () => {
    if (isFav) removeFavorite(pokemon.id);
    else addFavorite(pokemon.id);
  };

  const statMax = 255;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-gray-800 rounded-xl shadow-2xl p-6 md:p-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-xl text-gray-400">No. {String(pokemon.id).padStart(4, '0')}</p>
            <h2 className="text-5xl font-bold capitalize">{pokemon.koreanName}</h2>
          </div>
          <button onClick={handleFavoriteClick} className="text-4xl text-gray-500 hover:text-red-500 transition-colors">
            {isFav ? '♥' : '♡'}
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center">
            <div className="w-64 h-64 md:w-80 md:h-80 [perspective:1000px]" onClick={() => setIsFlipped(!isFlipped)}>
              <div className={`relative w-full h-full [transform-style:preserve-3d] transition-transform duration-500 ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}>
                <img src={pokemon.imageUrl} alt={pokemon.name} className="absolute w-full h-full object-contain [backface-visibility:hidden]"/>
                <img src={pokemon.backImageUrl || pokemon.imageUrl} alt={`${pokemon.name} back`} className="absolute w-full h-full object-contain [backface-visibility:hidden] [transform:rotateY(180deg)]"/>
              </div>
            </div>
             <button onClick={() => setIsFlipped(!isFlipped)} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">뒤집기</button>
            <p className="text-gray-300 mt-4 text-center italic text-lg">{pokemon.flavorText}</p>
          </div>

          <div>
            <div className="mb-6">
              <h3 className="text-2xl font-semibold mb-2 border-b-2 border-red-500 pb-1">타입</h3>
              <div className="flex space-x-2">
                {pokemon.types.map(({ type }) => <TypeBadge key={type.name} type={type} />)}
              </div>
            </div>

            <div className="mb-6">
                <h3 className="text-2xl font-semibold mb-3 border-b-2 border-red-500 pb-1">능력</h3>
                <ul className="text-lg">
                    {pokemon.abilities.map(({ability, is_hidden}) => (
                        <li key={ability.name} className="capitalize">{ability.koreanName} {is_hidden && <span className="text-sm text-gray-400">(숨겨진 특성)</span>}</li>
                    ))}
                </ul>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-3 border-b-2 border-red-500 pb-1">기본 스탯</h3>
              {pokemon.stats.map(({ stat, base_stat }) => (
                <div key={stat.name} className="flex items-center mb-2">
                  <span className="w-1/3 text-md capitalize">{stat.koreanName}</span>
                  <div className="w-2/3 bg-gray-600 rounded-full h-5">
                    <div
                      className="bg-green-500 h-5 rounded-full flex items-center justify-end px-2"
                      style={{ width: `${(base_stat / statMax) * 100}%` }}
                    >
                      <span className="font-bold text-sm text-black">{base_stat}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-8">
         <Link to="/" className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-lg">
          목록으로 돌아가기
        </Link>
      </div>
    </div>
  );
};

export default DetailPage;