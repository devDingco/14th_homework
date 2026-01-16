import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '숙소 판매 등록',
  description: '숙소를 등록하고 판매하세요',
  openGraph: {
    title: '숙소 판매 등록 - TripTalk',
    description: '숙소를 등록하고 판매하세요',
    type: 'website',
    siteName: 'TripTalk',
  },
};

export default function AccommodationSellLayout({ children }: { children: React.ReactNode }) {
  return children;
}
