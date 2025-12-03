import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '게시판',
  description: '여행 관련 게시글을 작성하고 공유하세요',
  openGraph: {
    title: '게시판 - TripTalk',
    description: '여행 관련 게시글을 작성하고 공유하세요',
    type: 'website',
    siteName: 'TripTalk',
  },
};

export default function BoardsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
