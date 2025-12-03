import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '내 API 목록',
  description: '내가 등록한 API를 관리하세요',
  openGraph: {
    title: '내 API 목록 - TripTalk',
    description: '내가 등록한 API를 관리하세요',
    type: 'website',
    siteName: 'TripTalk',
  },
};

export default function MyApisLayout({ children }: { children: React.ReactNode }) {
  return children;
}
