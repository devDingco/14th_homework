'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './styles.module.css';
import { useLayoutRouting } from './hooks/index.link.routing.hook';
import URLS from '@/commons/constants/url';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { isActive } = useLayoutRouting();

  return (
    <div className={styles.container}>
      <header className={styles.header} data-testid="layout-header">
        <Link href={URLS.DIARIES.path} className={styles.logo} data-testid="layout-logo">
          민지의 다이어리
        </Link>
      </header>
      <div className={styles.gap}></div>
      <div className={styles.banner}>
        <Image src="/images/banner.png" alt="배너" fill style={{ objectFit: 'cover' }} />
      </div>
      <div className={styles.gap}></div>
      <nav className={styles.navigation}>
        <Link
          href={URLS.DIARIES.path}
          className={`${styles.tab} ${isActive(URLS.DIARIES.path) ? styles.tabActive : ''}`}
          data-testid="nav-tab-diaries"
        >
          일기보관함
        </Link>
        <Link
          href={URLS.PICTURES.path}
          className={`${styles.tab} ${isActive(URLS.PICTURES.path) ? styles.tabActive : ''}`}
          data-testid="nav-tab-pictures"
        >
          사진보관함
        </Link>
      </nav>
      <div className={styles.gap}></div>
      <main className={styles.children}>{children}</main>
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerLogo}>민지의 다이어리</div>
          <div className={styles.footerInfo}>대표 : {'{name}'}</div>
          <div className={styles.footerCopyright}>Copyright © 2024. {'{name}'} Co., Ltd.</div>
        </div>
      </footer>
    </div>
  );
}
