import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '숙소 상세',
  description: '숙소 상세 정보를 확인하세요',
  openGraph: {
    title: '숙소 상세 - TripTalk',
    description: '숙소 상세 정보를 확인하세요',
    type: 'website',
    siteName: 'TripTalk',
  },
};

export default function AccommodationDetailLayout({ children }: { children: React.ReactNode }) {
  return children;
}
