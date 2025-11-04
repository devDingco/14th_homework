"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import styles from "./styles.module.css";

export default function CarouselPage() {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>
        <Image
          className={styles.캐러셀}
          src="/images/캐러셀1.png"
          alt="캐러셀1"
          width={0}
          height={0}
          sizes="100vw"
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          className={styles.캐러셀}
          src="/images/캐러셀2.png"
          alt="캐러셀2"
          width={0}
          height={0}
          sizes="100vw"
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          className={styles.캐러셀}
          src="/images/캐러셀3.png"
          alt="캐러셀3"
          width={0}
          height={0}
          sizes="100vw"
        />
      </SwiperSlide>
    </Swiper>
  );
}
