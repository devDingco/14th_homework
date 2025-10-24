"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import Image from "next/image";
// import styles from "./styles.module.css";

export default function Banner() {
  return (
    <Swiper
      modules={[Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
      autoplay={{ delay: 3000, disableOnInteraction: false }} // 3초마다 자동
      loop={true} // 반복
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
      style={{ height: "516px" }}
    >
      <SwiperSlide className="relative w-full h-full">
        <Image
          src="/images/캐러셀1.png"
          alt="캐러셀1"
          width={1920}
          height={516}
          style={{ width: "100%", height: "516px", objectFit: "cover" }}
        />
      </SwiperSlide>
      <SwiperSlide className="relative w-full h-full">
        <Image
          src="/images/캐러셀2.png"
          alt="캐러셀2"
          width={1920}
          height={516}
          style={{ width: "100%", height: "516px", objectFit: "cover" }}
        />
      </SwiperSlide>
      <SwiperSlide className="relative w-full h-full">
        <Image
          src="/images/캐러셀3.png"
          alt="캐러셀3"
          width={1920}
          height={516}
          style={{ width: "100%", height: "516px", objectFit: "cover" }}
        />
      </SwiperSlide>
    </Swiper>
  );
}
