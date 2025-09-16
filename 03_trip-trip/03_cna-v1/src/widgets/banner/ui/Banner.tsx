'use client'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import styles from './styles.module.css'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const IMAGE_SRC = [
  { src: '/images/banner1.webp', alt: '배너이미지1' },
  { src: '/images/banner2.webp', alt: '배너이미지2' },
  { src: '/images/banner3.webp', alt: '배너이미지3' },
] as const

export default function Banner() {
  return (
    <div className={styles.bannerRoot}>
      <Swiper
        slidesPerView={1}
        loop
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className={styles.mySwiper}
      >
        {IMAGE_SRC.map((slide, idx) => {
          return (
            <SwiperSlide key={idx}>
              <Image
                src={slide.src}
                alt={slide.alt}
                width={1920}
                height={515}
                className={styles.image_swiper}
              />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}
