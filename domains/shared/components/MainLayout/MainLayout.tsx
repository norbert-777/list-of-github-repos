import { Footer } from '@domains/shared/components/Footer/Footer';
import { Header } from '@domains/shared/components/Header/Header';
import type { FC, ReactNode } from 'react';

export const MainLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
