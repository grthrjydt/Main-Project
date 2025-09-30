import React, { ReactNode } from 'react';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-grow">
        {children}
      </main>
      <footer className="text-center py-4 text-gray-500 text-sm">
        <p>프론트엔드 12기 메인프로젝트</p>
      </footer>
    </div>
  );
};

export default Layout;