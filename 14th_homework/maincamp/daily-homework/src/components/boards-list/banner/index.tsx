'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import styles from './styles.module.css';

export default function CarouselPage() {
  return (
    <div className={styles.banner_container}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={true}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        className={styles.swiper}
      >
        <SwiperSlide>
          <Image
            src="/banner1.jpg"
            alt="배너이미지1"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'bottom' }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/banner2.jpg"
            alt="배너이미지2"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'bottom' }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/banner3.jpg"
            alt="배너이미지3"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'bottom' }}
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
