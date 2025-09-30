
import React from 'react';
import { POKEMON_TYPE_COLORS } from '../types';

interface TypeBadgeProps {
  type: {
    name: string;
    koreanName: string;
  };
}

const TypeBadge: React.FC<TypeBadgeProps> = ({ type }) => {
  const color = POKEMON_TYPE_COLORS[type.name] || 'bg-gray-400';
  return (
    <span className={`px-3 py-1 text-xs font-bold text-white rounded-full ${color}`}>
      {type.koreanName}
    </span>
  );
};

export default TypeBadge;
