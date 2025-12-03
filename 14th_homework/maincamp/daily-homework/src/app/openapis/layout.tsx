import type { Metadata } from 'next';
import MainLayout from '@/commons/layout';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: '오픈 API 목록',
  description: '공개된 API 목록을 확인하세요',
  openGraph: {
    title: '오픈 API 목록 - TripTalk',
    description: '공개된 API 목록을 확인하세요',
    type: 'website',
    siteName: 'TripTalk',
  },
};

export default function OpenapisLayout({ children }: { children: ReactNode }) {
  return <MainLayout>{children}</MainLayout>;
}
