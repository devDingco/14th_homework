"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import Image from 'next/image';
import { Autoplay, Pagination } from 'swiper/modules';
import styles from './style.module.css'


export default function LayoutBanner(){
    return(
        <>
        <Swiper
            pagination={{
                clickable: true,
                bulletActiveClass: styles.swiperPaginationBulletActive,
            }} 
            modules={[Autoplay, Pagination]}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            style={{width:"100%"}}>
            <SwiperSlide>
                <Image
                    src='/images/bannerimage1.svg'
                    alt='배너이미지1'
                    width={0}
                    height={0}
                    sizes='100vw'
                    style={{width: "100%", height:"32rem", objectFit:"cover", objectPosition:"50% 90%"}}    
                />
            </SwiperSlide>
            <SwiperSlide>
                <Image
                    src='/images/bannerimage2.svg'
                    alt='배너이미지2'
                    width={0}
                    height={0}
                    sizes='100vw'
                    style={{width: "100%", height:"32rem", objectFit:"cover", objectPosition:"50% 80%"}}    
                />
            </SwiperSlide>
            <SwiperSlide>
                <Image
                    src='/images/bannerimage3.svg'
                    alt='배너이미지3'
                    width={0}
                    height={0}
                    sizes='100vw'
                    style={{width: "100%", height:"32rem", objectFit:"cover", objectPosition:"50% 55%"}}    
                />
            </SwiperSlide>
        </Swiper>
        </>
    )
}