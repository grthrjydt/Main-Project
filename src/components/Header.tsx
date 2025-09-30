
import React from 'react';
import { NavLink } from 'react-router-dom';

const Header: React.FC = () => {
    const activeLinkStyle = {
        color: '#000000',
        fontWeight: 'bold',
    };
  return (
    <header className="sticky top-0 z-50">
      <div className="bg-red-600 p-4 shadow-lg">
        <h1 className="text-3xl font-bold text-center text-white tracking-wider" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
          포켓몬 도감
        </h1>
      </div>
      <nav className="bg-white text-gray-800 p-3 shadow-md">
        <div className="container mx-auto flex justify-center items-center space-x-8">
            <NavLink
                to="/"
                className="text-lg hover:text-red-600 transition-colors duration-300"
                style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
            >
                메인
            </NavLink>
            <NavLink
                to="/favorites"
                className="text-lg hover:text-red-600 transition-colors duration-300"
                 style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
            >
                찜 목록
            </NavLink>
             <NavLink
                to="/search"
                className="text-lg hover:text-red-600 transition-colors duration-300"
                 style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Header;
