import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '숙소 상세',
    description: '숙소 상세 정보를 확인하세요',
    openGraph: {
      title: '숙소 상세 - TripTalk',
      description: '숙소 상세 정보를 확인하세요',
      type: 'website',
      siteName: 'TripTalk',
    },
  };
}

export default function AccommodationDetailIdLayout({ children }: { children: React.ReactNode }) {
  return children;
}
