import MainLayout from '@/commons/layout';
import { ReactNode } from 'react';

export default function MypageLayout({ children }: { children: ReactNode }) {
  return <MainLayout showBanner={false}>{children}</MainLayout>;
}
