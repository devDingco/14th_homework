import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '숙소 판매 수정',
  description: '등록한 숙소 정보를 수정하세요',
  openGraph: {
    title: '숙소 판매 수정 - TripTalk',
    description: '등록한 숙소 정보를 수정하세요',
    type: 'website',
    siteName: 'TripTalk',
  },
};

export default function AccommodationSellEditLayout({ children }: { children: React.ReactNode }) {
  return children;
}
