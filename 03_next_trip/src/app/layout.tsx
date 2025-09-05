import type { Metadata } from 'next';
import './globals.css';

import Header from '@/components/Header';
import Providers from '@/config/Providers';
import { Pretendard } from '@/assets/fonts/fonts';
import BottomNavBar from '@/components/BottomNav/BottomNavBar';

export const metadata: Metadata = {
  title: 'triptrip',
  description: 'triptrip description',
  keywords: ['triptrip', 'next.js', 'typescript', 'tailwindcss'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko' className={`${Pretendard.variable}`}>
      <Providers>
        <body
          className={`flex h-full w-full flex-col items-center justify-center font-Pretendard antialiased`}
        >
          <Header />
          <main className='flex-1 py-16'>{children}</main>
          <BottomNavBar />
        </body>
      </Providers>
    </html>
  );
}
