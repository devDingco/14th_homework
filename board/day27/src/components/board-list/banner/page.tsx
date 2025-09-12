"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import  Style  from './style.module.css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/mousewheel';
import 'swiper/css/autoplay'; 

import { Pagination, Scrollbar, Mousewheel, Autoplay } from 'swiper/modules';



export default function BoardListBannerPage(){

// Import Swiper React components

// Import Swiper styles


  return (
    <Swiper
      modules={[Pagination, Scrollbar,Mousewheel, Autoplay ]}
      spaceBetween={8}
      slidesPerView={1}
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      mousewheel={true}
      autoplay={{
        delay: 3000,   // ⭐ 3초마다 자동 이동 (밀리초 단위)
        disableOnInteraction: false, // ⭐ 유저가 조작해도 자동재생 유지
      }}
    //   onSlideChange={() => console.log('slide change')}
    //   onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide><img className={Style.banner} src="/assets/images/Tranquil.png" alt="" /></SwiperSlide>
      <SwiperSlide><img className={Style.banner} src="/assets/images/Tranquil1.png" alt="" /></SwiperSlide>
      <SwiperSlide><img className={Style.banner} src="/assets/images/Tranquil2.png" alt="" /></SwiperSlide>

    
    </Swiper>
  );


}