'use client';

import useCatApi from './hook';
import styles from './styles.module.css';
import InfinityScroll from 'react-infinite-scroll-component';

export default function ApiPage() {
  const { cats, loading, hasMore, loadMore, refresh } = useCatApi();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>무한고양이 페이지</h1>
        {/* <button className={styles.refreshBtn} onClick={refresh} disabled={loading}>
          {loading ? '로딩 중...' : '새로고침'}
        </button> */}
      </header>

      <InfinityScroll
        dataLength={cats.length}
        next={loadMore}
        hasMore={hasMore}
        loader={
          <div className={styles.loader} key="loader">
            Loading ...
          </div>
        }
      >
        <div className={styles.grid}>
          {cats.map((cat) => (
            <article key={cat.id} className={styles.card}>
              <img src={cat.url} alt={`cat-${cat.id}`} className={styles.image} loading="lazy" />
            </article>
          ))}
        </div>
      </InfinityScroll>
    </div>
  );
}
