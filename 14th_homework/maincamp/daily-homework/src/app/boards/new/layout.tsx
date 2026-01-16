import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '게시글 작성',
  description: '새로운 게시글을 작성하세요',
  openGraph: {
    title: '게시글 작성 - TripTalk',
    description: '새로운 게시글을 작성하세요',
    type: 'website',
    siteName: 'TripTalk',
  },
};

export default function BoardNewLayout({ children }: { children: React.ReactNode }) {
  return children;
}
