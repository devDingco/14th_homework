import { ReactNode } from 'react';

// 레이아웃 컴포넌트 Props
export interface LayoutProps {
  className?: string;
  children?: ReactNode;
}

// 사이트 설정
export interface SiteConfig {
  _id: string;
  siteName: string;
  logoUrl?: string;
  footerText?: string;
  enableBanner: boolean;
}

// 공지
export interface Notice {
  _id: string;
  title: string;
  content: string;
  isActive: boolean;
  createdAt: string;
}

// 레이아웃 상태
export interface LayoutState {
  isLoading: boolean;
  showBanner: boolean;
  siteConfig?: SiteConfig;
  notices?: Notice[];
}
