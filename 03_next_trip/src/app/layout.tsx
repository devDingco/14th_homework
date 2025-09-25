import type { Metadata } from 'next';
import './globals.css';

import Header from '@/components/commons/Header';
import Banner from '@/components/commons/Banner';
import Providers from './Providers';
import { Pretendard } from '@/assets/fonts/fonts';
import BottomNavBar from '@/components/BottomNav/BottomNavBar';
import { IProps } from '@/types';

export const metadata: Metadata = {
  title: 'triptrip',
  description: 'triptrip description',
  keywords: ['triptrip', 'next.js', 'typescript', 'tailwindcss'],
};

export default function RootLayout({ children }: Readonly<IProps>) {
  return (
    <html lang='ko' className={`${Pretendard.variable}`}>
      <Providers>
        <body
          className={`flex h-full flex-col items-center justify-center font-Pretendard antialiased`}
        >
          <Header />
          <Banner />

          <main className='w-full max-w-7xl flex-1'>{children}</main>
          <BottomNavBar />
        </body>
      </Providers>
    </html>
  );
}
