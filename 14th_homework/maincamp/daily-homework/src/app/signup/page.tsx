import type { Metadata } from 'next';
import SignupComponent from '@/components/signup/page';

export const metadata: Metadata = {
  title: '회원가입',
  description: 'TripTalk에 회원가입하여 여행 상품과 게시판을 이용하세요',
  openGraph: {
    title: '회원가입 - TripTalk',
    description: 'TripTalk에 회원가입하여 여행 상품과 게시판을 이용하세요',
    type: 'website',
    siteName: 'TripTalk',
  },
};

export default function SignupPage() {
  return <SignupComponent />;
}
