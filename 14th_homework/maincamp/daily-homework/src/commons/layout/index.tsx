'use client';

import { ReactNode } from 'react';
import Navigation from './navigation';
import BannerCarousel from './banner';
import styles from './styles.module.css';
import { LayoutProps } from './types';

interface MainLayoutProps extends LayoutProps {
  children: ReactNode;
  showBanner?: boolean;
}

export default function MainLayout({ children, showBanner = false, className }: MainLayoutProps) {
  return (
    <div className={`${styles.layout} ${className || ''}`}>
      <Navigation />

      {showBanner && (
        <section className={styles.banner_section}>
          <BannerCarousel />
        </section>
      )}

      <main className={styles.main_content}>
        <div className={styles.content_container}>{children}</div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footer_container}>{/* <p></p> */}</div>
      </footer>
    </div>
  );
}
