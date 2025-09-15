'use client';
// 배너에 들어가는 타입 지정
export interface BannerImage {
  src: string;
  alt: string;
  link?: string;
}

export interface BannerProps {
  images?: BannerImage[];
  autoplay?: boolean;
  delay?: number;
}
