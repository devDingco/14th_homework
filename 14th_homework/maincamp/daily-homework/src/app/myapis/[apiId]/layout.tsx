import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'API 상세',
    description: 'API 상세 정보를 확인하세요',
    openGraph: {
      title: 'API 상세 - TripTalk',
      description: 'API 상세 정보를 확인하세요',
      type: 'website',
      siteName: 'TripTalk',
    },
  };
}

export default function MyApiDetailLayout({ children }: { children: React.ReactNode }) {
  return children;
}
