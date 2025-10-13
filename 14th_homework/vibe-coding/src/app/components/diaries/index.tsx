import styles from './styles.module.css';

export default function Diaries() {
  return (
    <div className={styles.container}>
      <div className={styles.gap32}></div>
      <div className={styles.search}></div>
      <div className={styles.gap42}></div>
      <div className={styles.main}></div>
      <div className={styles.gap40}></div>
      <div className={styles.pagination}></div>
      <div className={styles.gap40}></div>
    </div>
  );
}
