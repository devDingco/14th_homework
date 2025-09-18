"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "./banner.css";
import "../../global.css";

export default function Banner() {
  const bannerImages = [
    "/images/desktop/banner-1.png",
    "/images/desktop/banner-2.png", 
    "/images/desktop/banner-3.png"
  ];

  return (
    <div className="banner_container">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="swiper"
      >
        {bannerImages.map((image, index) => (
          <SwiperSlide key={index} className="swiper-slide">
            <Image 
              src={image}
              alt={`banner ${index + 1}`} 
              fill
              className="banner_image" 
              priority={index === 0}
              sizes="100%"
              style={{
                objectFit: 'cover',
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}