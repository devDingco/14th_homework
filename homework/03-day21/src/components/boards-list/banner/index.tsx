"use client"

// Swiper 컴포넌트 불러오기
import { Swiper,SwiperSlide, SwiperClass } from "swiper/react";
// Swiper 기본 스타일 불러오기
import 'swiper/css';
import 'swiper/css/pagination';

// Next.js Image 컴포넌트 불러오기
import Image from "next/image";
import carouselImage1 from "@assets/carousel1.svg"
import carouselImage2 from "@assets/carousel2.svg"
import carouselImage3 from "@assets/carousel3.svg"

// import required modules
import { Autoplay, Pagination } from 'swiper/modules';

const IMAGE_SRC = {
    carouselImage1: { src: carouselImage1, alt: "캐러셀이미지1"},
    carouselImage2: { src: carouselImage2, alt: "캐러셀이미지2"},
    carouselImage3: { src: carouselImage3, alt: "캐러셀이미지3"}
};

export default function BoardsBanner(){


    return (
        <div>
         <Swiper
            pagination={{ clickable: true}} // 페이지네이션 클릭 가능
            modules={[ Pagination, Autoplay ]}
            autoplay={{ delay: 3000, disableOnInteraction: false }} // 3초마다 자동 슬라이드
            className="customSwiper"
            spaceBetween={0}
            slidesPerView={1}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
         >    
            {/* map 배열 방식 */}
            {Object.values(IMAGE_SRC).map((img, idx) => (
                <SwiperSlide key={idx}>
                    <Image
                        src={img.src}
                        alt={img.alt}
                        width={0}
                        height={0}
                        sizes='100vw'
                        style={{ width: '100%', height: '32.25rem', objectFit: "cover", objectPosition: "bottom" }}
                    />
                </SwiperSlide>
            ))}

            {/* <SwiperSlide>
                <Image
                    src={IMAGE_SRC.carouselImage1.src}
                    alt={IMAGE_SRC.carouselImage1.alt}
                    width={0}
                    height={0}
                    sizes='100vw'
                    style={{ width: '100%', height: '32.25rem', objectFit: "cover", objectPosition: "bottom" }} 
                />
            </SwiperSlide>

            <SwiperSlide>
                <Image
                    src={IMAGE_SRC.carouselImage2.src}
                    alt={IMAGE_SRC.carouselImage2.alt}
                    width={0}
                    height={0}
                    sizes='100vw'
                    style={{ width: '100%', height: '32.25rem', objectFit: "cover", objectPosition: "bottom" }} 
                />
            </SwiperSlide>

            <SwiperSlide>
                <Image
                    src={IMAGE_SRC.carouselImage3.src}
                    alt={IMAGE_SRC.carouselImage3.alt}
                    width={0}
                    height={0}
                    sizes='100vw'
                    style={{ width: '100%', height: '32.25rem', objectFit: "cover", objectPosition: "bottom" }} 
                />
            </SwiperSlide> */}

         </Swiper>

         


        </div>
        
    )
}