import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'API 등록',
  description: '새로운 API를 등록하세요',
  openGraph: {
    title: 'API 등록 - TripTalk',
    description: '새로운 API를 등록하세요',
    type: 'website',
    siteName: 'TripTalk',
  },
};

export default function MyApisNewLayout({ children }: { children: React.ReactNode }) {
  return children;
}
