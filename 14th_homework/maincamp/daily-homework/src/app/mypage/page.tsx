import type { Metadata } from 'next';
import MypageComponent from '@/components/mypage/page';

export const metadata: Metadata = {
  title: '마이페이지',
  description: '내 정보를 확인하고 관리하세요',
  openGraph: {
    title: '마이페이지 - TripTalk',
    description: '내 정보를 확인하고 관리하세요',
    type: 'website',
    siteName: 'TripTalk',
  },
};

export default function MypagePage() {
  return <MypageComponent />;
}
