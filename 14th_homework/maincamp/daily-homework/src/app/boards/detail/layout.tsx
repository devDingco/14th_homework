import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '게시글 상세',
  description: '게시글 상세 내용을 확인하세요',
  openGraph: {
    title: '게시글 상세 - TripTalk',
    description: '게시글 상세 내용을 확인하세요',
    type: 'website',
    siteName: 'TripTalk',
  },
};

export default function BoardDetailLayout({ children }: { children: React.ReactNode }) {
  return children;
}
