'use client';

import Image from 'next/image';
import styles from './gallery.module.css';

interface ProductGalleryProps {
  images?: string[] | null;
  title?: string;
}

// 이미지 URL 처리 헬퍼 함수
const getImageUrl = (imageUrl: string): string => {
  if (!imageUrl) return '';

  // 이미 완전한 URL인 경우 그대로 반환
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }

  // 상대 경로인 경우 storage.googleapis.com 도메인 추가
  if (imageUrl.startsWith('/')) {
    return `https://storage.googleapis.com${imageUrl}`;
  }

  // 그 외의 경우 storage.googleapis.com 도메인 추가
  return `https://storage.googleapis.com/${imageUrl}`;
};

export default function ProductGallery({ images, title = '숙박권' }: ProductGalleryProps) {
  // 이미지가 없거나 빈 배열인 경우 처리
  if (!images || images.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.mainImage}>
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#f0f0f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span>이미지가 없습니다</span>
          </div>
        </div>
      </div>
    );
  }

  const [mainImage, ...thumbnailImages] = images;
  const mainImageUrl = getImageUrl(mainImage);

  return (
    <div className={styles.container}>
      <div className={styles.mainImage}>
        {mainImageUrl ? (
          <Image src={mainImageUrl} alt={title} fill className={styles.image} />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#f0f0f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span>이미지를 불러올 수 없습니다</span>
          </div>
        )}
      </div>
      {thumbnailImages.length > 0 && (
        <div className={styles.thumbnailContainer}>
          {thumbnailImages.slice(0, 4).map((image, index) => {
            const imageUrl = getImageUrl(image);
            return (
              <div key={index} className={styles.thumbnail}>
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={`${title} ${index + 2}`}
                    fill
                    className={styles.image}
                  />
                ) : (
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      backgroundColor: '#f0f0f0',
                    }}
                  />
                )}
              </div>
            );
          })}
          <div className={styles.gradient} />
        </div>
      )}
    </div>
  );
}
