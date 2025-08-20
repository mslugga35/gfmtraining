'use client';

import Navigation from './Navigation';
import Footer from './Footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col body-font" style={{ backgroundColor: 'rgb(255, 255, 255)', color: 'rgb(0, 0, 0)' }}>
      <Navigation />
      <main className="flex-1 pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;