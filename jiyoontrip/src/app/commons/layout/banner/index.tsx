"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import styles from "./styles.module.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import Image from "next/image";
export default function BannerComponent() {
  return (
    <div className={styles.swiper}>
      <Swiper
        modules={[Pagination, Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        pagination={{ clickable: true }}
        spaceBetween={0}
        slidesPerView={1}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide>
          <Image
            src="/images/banner1.png"
            alt="배너1"
            width={0}
            height={0}
            sizes="100vw"
            className={styles.bannerImages}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/images/banner2.png"
            alt="배너2"
            width={0}
            height={0}
            sizes="100vw"
            className={styles.bannerImages}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/images/banner3.png"
            alt="배너3"
            width={0}
            height={0}
            sizes="100vw"
            className={styles.bannerImages}
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
