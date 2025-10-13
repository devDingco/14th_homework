import styles from "./styles.module.css";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.container}>
      <header className={styles.header}></header>
      <div className={styles.gap}></div>
      <div className={styles.banner}></div>
      <div className={styles.gap}></div>
      <nav className={styles.navigation}></nav>
      <main className={styles.children}>{children}</main>
      <footer className={styles.footer}></footer>
    </div>
  );
}

