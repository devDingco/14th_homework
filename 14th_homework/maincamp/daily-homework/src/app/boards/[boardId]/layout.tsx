import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '게시글 상세',
    description: '게시글 상세 내용을 확인하세요',
    openGraph: {
      title: '게시글 상세 - TripTalk',
      description: '게시글 상세 내용을 확인하세요',
      type: 'website',
      siteName: 'TripTalk',
    },
  };
}

export default function BoardDetailIdLayout({ children }: { children: React.ReactNode }) {
  return children;
}
