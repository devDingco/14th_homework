'use client';

import styles from './styles.module.css';

interface LocationProps {
  address?: string;
}

export default function Location({ address }: LocationProps) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>상세 위치</h2>
      <div className={styles.mapContainer}>
        <div className={styles.mapPlaceholder}>
          <svg
            width="100"
            height="100"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <p>지도가 여기에 표시됩니다</p>
        </div>
      </div>
    </div>
  );
}
