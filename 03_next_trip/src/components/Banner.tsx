'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import Image from 'next/image';
import { img01, img02, img03 } from '@/assets/images/images';
const images = [img01, img02, img03];

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Banner() {
  return (
    <div className='relative mb-6 h-[200px] min-w-[360px] tablet:w-full'>
      <Swiper
        className='h-full w-[360px] tablet:w-full'
        spaceBetween={50}
        slidesPerView={1}
        loop={true}
        // modules
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{
          clickable: true,
          renderBullet: (index, className) =>
            `<span class="${className} !bg-white w-3 h-3 rounded-full"></span>`,
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className='relative h-full w-[360px]'>
            <Image
              src={image}
              alt={`Slide ${index + 1}`}
              fill
              className='object-cover'
              priority={index === 0} // 첫 번째 이미지를 우선 로드
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
