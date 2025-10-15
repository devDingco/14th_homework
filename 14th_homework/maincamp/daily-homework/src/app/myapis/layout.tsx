import MainLayout from '@/commons/layout';
import { ReactNode } from 'react';

export default function MyapisLayout({ children }: { children: ReactNode }) {
  return <MainLayout>{children}</MainLayout>;
}
