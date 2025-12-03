import type { Metadata } from 'next';
import LoginComponent from '@/components/login/page';

export const metadata: Metadata = {
  title: '로그인',
  description: 'TripTalk에 로그인하여 여행 상품과 게시판을 이용하세요',
  openGraph: {
    title: '로그인 - TripTalk',
    description: 'TripTalk에 로그인하여 여행 상품과 게시판을 이용하세요',
    type: 'website',
    siteName: 'TripTalk',
  },
};

export default function LoginPage() {
  return <LoginComponent />;
}
