import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '게시글 수정',
    description: '게시글을 수정하세요',
    openGraph: {
      title: '게시글 수정 - TripTalk',
      description: '게시글을 수정하세요',
      type: 'website',
      siteName: 'TripTalk',
    },
  };
}

export default function BoardEditLayout({ children }: { children: React.ReactNode }) {
  return children;
}
