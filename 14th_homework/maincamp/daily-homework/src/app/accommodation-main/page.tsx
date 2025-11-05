'use client';

import AccommodationBest from '@/components/accommodation-list/accommodation-best';
import AccommodationBanner from '@/components/accommodation-list/banner';
import AccommodationSearch from '@/components/accommodation-list/search';
import AccommodationList from '@/components/accommodation-list/list';
import BannerCarousel from '@/commons/layout/banner';
import styles from './styles.module.css';

export default function AccommodationPage() {
  return (
    <div className={styles.pageContainer}>
      <BannerCarousel />
      <div className={styles.bodyContainer}>
        <AccommodationBest />
        <AccommodationBanner />
        <AccommodationSearch />
        <AccommodationList />
      </div>
    </div>
  );
}
