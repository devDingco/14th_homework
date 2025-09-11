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
    <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
      <SwiperSlide>
        <Image
          src="/icons/banner1.png"
          alt="배너사진"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '100%', height: 'auto' }}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src="/icons/banner2.png"
          alt="배너사진"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '100%', height: 'auto' }}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src="/icons/banner3.png"
          alt="배너사진"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '100%', height: 'auto' }}
        />
      </SwiperSlide>
    </Swiper>
  );
}
