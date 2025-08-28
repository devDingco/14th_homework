import Banner from '@/components/banner/banner';
import { ReactNode } from 'react';

interface HomeLayoutProps {
  children: ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <div>
      <Banner />
      {children}
    </div>
  );
}
