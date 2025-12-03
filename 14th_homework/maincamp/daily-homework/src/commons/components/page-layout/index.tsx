'use client';

import { ReactNode } from 'react';
import Navigation from '@/commons/layout/navigation';
import BannerCarousel from '@/commons/layout/banner';
import styles from './styles.module.css';

interface PageLayoutProps {
  children: ReactNode;
  showBanner?: boolean;
}

export default function PageLayout({ children, showBanner = true }: PageLayoutProps) {
  return (
    <div className={styles.pageContainer}>
      <Navigation />
      {showBanner && (
        <section className={styles.bannerSection}>
          <BannerCarousel />
        </section>
      )}
      <main className={styles.mainContent}>
        <div className={styles.bodyContainer}>{children}</div>
      </main>
    </div>
  );
}
