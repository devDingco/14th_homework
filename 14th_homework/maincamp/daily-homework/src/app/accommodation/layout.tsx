import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '숙소 목록',
  description: '다양한 여행 숙소를 검색하고 예약하세요',
  openGraph: {
    title: '숙소 목록 - TripTalk',
    description: '다양한 여행 숙소를 검색하고 예약하세요',
    type: 'website',
    siteName: 'TripTalk',
  },
};

export default function AccommodationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
