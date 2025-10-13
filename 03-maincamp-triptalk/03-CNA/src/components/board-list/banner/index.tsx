"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative, Autoplay } from "swiper/modules";
import "swiper/css";
import Image from "next/image";
import styles from "./styles.module.css";
import banner1 from "@/assets/images/banner1.png";
import banner2 from "@/assets/images/banner2.png";
import banner3 from "@/assets/images/banner3.png";

export default function BoardBanner() {
  return (
    <Swiper
      modules={[EffectCreative, Autoplay]}
      effect="creative"
      creativeEffect={{
        prev: {
          shadow: true,
          translate: ["-120%", 0, -500],
        },
        next: {
          shadow: true,
          translate: ["120%", 0, -500],
        },
      }}
      speed={1000}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      loop
      className={styles.swiper}
    >
      <SwiperSlide>
        <Image
          className={styles.banner}
          src={banner1}
          alt="배너 이미지 1"
        ></Image>
      </SwiperSlide>
      <SwiperSlide>
        <Image
          className={styles.banner}
          src={banner2}
          alt="배너 이미지 2"
        ></Image>
      </SwiperSlide>
      <SwiperSlide>
        <Image
          className={styles.banner}
          src={banner3}
          alt="배너 이미지 3"
        ></Image>
      </SwiperSlide>
    </Swiper>
  );
}
