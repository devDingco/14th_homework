'use client';

import Image from 'next/image';
import styles from './styles.module.css';

interface PurchaseProps {
  price?: number;
  sellerName?: string;
  sellerImage?: string;
}

export default function Purchase({
  price = 32500,
  sellerName = '김상훈',
  sellerImage = '/profile.svg',
}: PurchaseProps) {
  return (
    <div className={styles.container}>
      {/* 가격 및 구매 */}
      <div className={styles.priceSection}>
        <div className={styles.priceInfo}>
          <div className={styles.priceGroup}>
            <span className={styles.price}>{price.toLocaleString()}</span>
            <span className={styles.unit}>원</span>
          </div>
          <div className={styles.noticeGroup}>
            <p className={styles.notice}>
              숙박권은 트립트립에서 포인트 충전 후 구매하실 수 있습니다.
            </p>
            <p className={styles.noticeSmall}>상세 설명에 숙박권 사용기한을 꼭 확인해 주세요.</p>
          </div>
        </div>
        <button className={styles.purchaseButton}>구매하기</button>
      </div>

      {/* 판매자 정보 */}
      <div className={styles.sellerSection}>
        <h3 className={styles.sellerTitle}>판매자</h3>
        <div className={styles.sellerProfile}>
          <div className={styles.sellerImage}>
            <Image src={sellerImage} alt={sellerName} fill className={styles.profileImg} />
          </div>
          <span className={styles.sellerName}>{sellerName}</span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </div>
    </div>
  );
}
