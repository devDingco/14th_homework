'use client';

import styles from './styles.module.css';
import Image from 'next/image';

export default function AccommodationBanner() {
  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        <Image
          src="/image1.jpg"
          alt="Banner"
          fill
          className={styles.backgroundImage}
          style={{ objectFit: 'cover' }}
        />
        <div className={styles.gradientOverlay} />
      </div>
      <div className={styles.content}>
        <div className={styles.badges}>
          <div className={styles.badge}>'솔로트립' 독점 숙소</div>
          <div className={styles.badge}>9.24 얼리버드 오픈 예약</div>
        </div>
        <h2 className={styles.title}>
          천만 관객이 사랑한
          <br />빌 페소 르꼬 전시회 근처 숙소 특가 예약
        </h2>
      </div>
    </div>
  );
}
