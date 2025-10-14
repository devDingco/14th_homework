import Image from 'next/image';
import Link from 'next/link';
import styles from './styles.module.css';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>민지의 다이어리</div>
      </header>
      <div className={styles.gap}></div>
      <div className={styles.banner}>
        <Image src="/images/banner.png" alt="배너" fill style={{ objectFit: 'cover' }} />
      </div>
      <div className={styles.gap}></div>
      <nav className={styles.navigation}>
        <Link href="/" className={`${styles.tab} ${styles.tabActive}`}>
          일기보관함
        </Link>
        <Link href="/" className={styles.tab}>
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
