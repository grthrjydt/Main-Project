
import React, { lazy, Suspense } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext';
import Layout from './components/Layout';
import Loader from './components/Loader';

const MainPage = lazy(() => import('./pages/MainPage'));
const DetailPage = lazy(() => import('./pages/DetailPage'));
const FavoritesPage = lazy(() => import('./pages/FavoritesPage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));

const App: React.FC = () => {
  return (
    <FavoritesProvider>
      <HashRouter>
        <Layout>
          <Suspense fallback={<div className="flex justify-center items-center h-[calc(100vh-200px)]"><Loader /></div>}>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/pokemon/:id" element={<DetailPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/search" element={<SearchPage />} />
            </Routes>
          </Suspense>
        </Layout>
      </HashRouter>
    </FavoritesProvider>
  );
};

export default App;
