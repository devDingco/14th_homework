import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '숙소 메인',
  description: '인기 숙소와 추천 여행 상품을 확인하세요',
  openGraph: {
    title: '숙소 메인 - TripTalk',
    description: '인기 숙소와 추천 여행 상품을 확인하세요',
    type: 'website',
    siteName: 'TripTalk',
  },
};

export default function AccommodationMainLayout({ children }: { children: React.ReactNode }) {
  return children;
}
