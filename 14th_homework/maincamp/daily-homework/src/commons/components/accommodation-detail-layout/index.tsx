import { ReactNode } from 'react';
import styles from './styles.module.css';

interface AccommodationDetailLayoutProps {
  header: ReactNode;
  gallery: ReactNode;
  purchase: ReactNode;
  contents: ReactNode;
  location: ReactNode;
  comments: ReactNode;
}

export default function AccommodationDetailLayout({
  header,
  gallery,
  purchase,
  contents,
  location,
  comments,
}: AccommodationDetailLayoutProps) {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentContainer}>
        {/* 제품 헤더 */}
        {header}

        {/* 이미지 갤러리와 Purchase를 같은 행에 배치 */}
        <div className={styles.topSection}>
          <div className={styles.productSection}>{gallery}</div>
          <div className={styles.sidebar}>{purchase}</div>
        </div>

        <div className={styles.mainContent}>
          <div className={styles.divider} />
          {contents}
          <div className={styles.divider} />
          {location}
          {comments}
        </div>
      </div>
    </div>
  );
}
