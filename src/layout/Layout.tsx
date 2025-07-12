import type { ReactNode } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ThemeBackground } from '../components/shared/ThemeBackground';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col theme-transition">
      <ThemeBackground />
      <Header />
      <main className="flex-1 pt-32">
        {children}
      </main>
      <Footer />
    </div>
  );
}; 