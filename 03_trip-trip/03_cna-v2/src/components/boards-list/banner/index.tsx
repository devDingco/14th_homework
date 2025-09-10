'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import bannerImage1 from '@assets/banner1.png'
import bannerImage2 from '@assets/banner2.png'
import bannerImage3 from '@assets/banner3.png'
import Image from 'next/image'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import styles from './styles.module.css'
const IMAGE_SRC = [
  { src: bannerImage1, alt: '배너이미지1' },
  { src: bannerImage2, alt: '배너이미지2' },
  { src: bannerImage3, alt: '배너이미지3' },
] as const

export default function BannerComponent() {
  return (
    <div className={styles.wrapper}>
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
        // navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {IMAGE_SRC.map((slide, idx) => {
          return (
            <SwiperSlide key={idx}>
              <Image src={slide.src} alt={slide.alt} className={styles.image_swiper} />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}
