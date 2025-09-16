"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import styles from "./banner.module.css";

const bannerImages = ["/images/1.png", "/images/2.png", "/images/3.png"];

export default function BoardsListBanner() {
  return (
    <div className={styles.bannerContainer}>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className={styles.mySwiper}
      >
        {bannerImages.map((src, index) => (
          <SwiperSlide key={index}>
            <img
              src={src}
              alt={`Banner Slide ${index + 1}`}
              className={styles.bannerImage}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
