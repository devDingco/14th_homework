"use client";
// import SwiperCore, { Navigation, Pagination } from 'swiper';

import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./styles.module.css";
import "swiper/css";
import Image from "next/image";
import banner1 from "./assets/banner1.jpg";
import banner2 from "./assets/banner2.jpg";
import banner3 from "./assets/banner3.jpg";
import { Pagination } from "swiper/modules";
import "swiper/css/pagination";

const IMAGE_SRC = {
  banner1: {
    src: banner1,
    alt: "banner1",
  },

  banner2: {
    src: banner2,
    alt: "banner2",
  },

  banner3: {
    src: banner3,
    alt: "banner3",
  },
};

export default function BannerList() {
  return (
    <Swiper
      modules={[Pagination]}
      // Swiper는 필요한 기능만 모듈로 불러와야 사용 가능 / 불러온 뒤 아래처럼 pagination={...} 옵션 사용.
      pagination={{
        clickable: true, // ->페이지네이션 점(dot)을 클릭 가능하게 함.
      }}
      slidesPerView={1} // 한 화면에 보이는 슬라이드 개수.
      //   navigation
      allowSlideNext // 슬라이드를 넘길 수 있는지 여부 제어.
      allowSlidePrev
    >
      <SwiperSlide>
        <Image
          src={IMAGE_SRC.banner1.src}
          alt={IMAGE_SRC.banner1.alt}
          className={styles.SwiperSlideImg}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src={IMAGE_SRC.banner2.src}
          alt={IMAGE_SRC.banner2.alt}
          className={styles.SwiperSlideImg}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src={IMAGE_SRC.banner3.src}
          alt={IMAGE_SRC.banner3.alt}
          className={styles.SwiperSlideImg}
        />
      </SwiperSlide>
    </Swiper>
  );
}
