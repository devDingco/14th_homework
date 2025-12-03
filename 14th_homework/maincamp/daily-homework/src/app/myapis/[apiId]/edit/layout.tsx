import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'API 수정',
    description: '등록한 API 정보를 수정하세요',
    openGraph: {
      title: 'API 수정 - TripTalk',
      description: '등록한 API 정보를 수정하세요',
      type: 'website',
      siteName: 'TripTalk',
    },
  };
}

export default function MyApiEditLayout({ children }: { children: React.ReactNode }) {
  return children;
}
