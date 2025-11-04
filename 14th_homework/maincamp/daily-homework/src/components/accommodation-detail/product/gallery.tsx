'use client';

import Image from 'next/image';
import styles from './gallery.module.css';

interface ProductGalleryProps {
  images?: string[];
  title?: string;
}

export default function ProductGallery({
  images = ['/banner1.jpg', '/banner2.jpg', '/banner3.jpg', '/banner1.jpg', '/banner2.jpg'],
  title = '숙박권',
}: ProductGalleryProps) {
  const [mainImage, ...thumbnailImages] = images;

  return (
    <div className={styles.container}>
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
  );
}
