'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import Image from 'next/image';
import styles from './Banner.module.css';

import 'swiper/css';
import 'swiper/css/pagination';

export default function Banner() {
  return (
    <Swiper
      pagination={true}
      modules={[Pagination]}
      className={styles.mySwiper}
    >
      <SwiperSlide>
        <Image
          src="/icons/banner1.svg"
          alt="배너사진"
          width={1920}
          height={516}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src="/icons/banner2.svg"
          alt="배너사진"
          width={1920}
          height={516}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src="/icons/banner3.svg"
          alt="배너사진"
          width={1920}
          height={516}
        />
      </SwiperSlide>
    </Swiper>
  );
}
