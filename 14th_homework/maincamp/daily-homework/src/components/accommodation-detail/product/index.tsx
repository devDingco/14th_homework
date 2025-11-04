'use client';

import Image from 'next/image';
import styles from './styles.module.css';

interface ProductProps {
  title?: string;
  description?: string;
  tags?: string[];
  images?: string[];
  bookmarkCount?: number;
}

export default function Product({
  title = '포항 : 숙박권 명이 여기에 들어갑니다',
  description = '모던한 분위기의 감도높은 숙소',
  tags = ['#6인 이하', '#건식 사우나', '#애견동반 가능'],
  images = ['/banner1.jpg', '/banner2.jpg', '/banner3.jpg', '/banner1.jpg', '/banner2.jpg'],
  bookmarkCount = 24,
}: ProductProps) {
  const [mainImage, ...thumbnailImages] = images;

  return (
    <div className={styles.container}>
      {/* 헤더 */}
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.iconGroup}>
            <button className={styles.iconButton} aria-label="삭제">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
              </svg>
            </button>
            <button className={styles.iconButton} aria-label="링크 공유">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
              </svg>
            </button>
            <button className={styles.iconButton} aria-label="위치">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </button>
            <button className={styles.bookmarkButton}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              <span>{bookmarkCount}</span>
            </button>
          </div>
        </div>
        <p className={styles.description}>{description}</p>
        <div className={styles.tags}>{tags.join(' ')}</div>
      </div>

      {/* 이미지 갤러리 */}
      <div className={styles.imageGallery}>
        <div className={styles.mainImage}>
          <Image src={mainImage || '/banner1.jpg'} alt={title} fill className={styles.image} />
        </div>
        <div className={styles.thumbnailContainer}>
          {thumbnailImages.slice(0, 4).map((image, index) => (
            <div key={index} className={styles.thumbnail}>
              <Image
                src={image || '/banner1.jpg'}
                alt={`${title} ${index + 2}`}
                fill
                className={styles.image}
              />
            </div>
          ))}
          <div className={styles.gradient} />
        </div>
      </div>
    </div>
  );
}
