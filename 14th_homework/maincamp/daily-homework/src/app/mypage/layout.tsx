import type { Metadata } from 'next';
import MainLayout from '@/commons/layout';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: '마이페이지',
  description: '내 정보를 확인하고 관리하세요',
  openGraph: {
    title: '마이페이지 - TripTalk',
    description: '내 정보를 확인하고 관리하세요',
    type: 'website',
    siteName: 'TripTalk',
  },
};

export default function MypageLayout({ children }: { children: ReactNode }) {
  return <MainLayout showBanner={false}>{children}</MainLayout>;
}
