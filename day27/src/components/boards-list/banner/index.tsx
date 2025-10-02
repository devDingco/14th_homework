// src/components/boards-list/banner/index.tsx

"use client";

// Image 컴포넌트를 next/image에서 import 합니다.
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./styles.module.css";

import banner1 from "@/src/assets/nowadays.png";
import banner2 from "@/src/assets/banhang.png";
import banner3 from "@/src/assets/Vhvj.png";


const bannerImages = [banner1, banner2, banner3]

export default function BannerList() {
  return (
    <div className={styles.bannerBody}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        loop={true}
        className={styles.mySwiper}
      >
        {bannerImages.map((src, index) => (
          <SwiperSlide key={index}>
         
            <Image
              src={src}
              alt={`Banner ${index + 1}`}
              layout="fill"
              objectFit="cover"
              className={styles.bannerImage}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
} 