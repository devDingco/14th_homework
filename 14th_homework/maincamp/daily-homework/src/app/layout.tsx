import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import MainLayout from '@/commons/layout';
import ApiUploadProvider from '@/commons/providers/api-upload-provider';
import AuthProvider from '@/commons/providers/auth-provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'TripTalk - 여행 상품 및 게시판 서비스',
  description: '여행 상품을 검색하고 예약하며, 여행 관련 게시글을 공유하세요',
  openGraph: {
    title: 'TripTalk - 여행 상품 및 게시판 서비스',
    description: '여행 상품을 검색하고 예약하며, 여행 관련 게시글을 공유하세요',
    type: 'website',
    siteName: 'TripTalk',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          <ApiUploadProvider>{children}</ApiUploadProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
