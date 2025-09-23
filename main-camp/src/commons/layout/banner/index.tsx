"use client"

import Slider from 'react-slick'
import "slick-carousel/slick/slick-theme.css"
import "slick-carousel/slick/slick.css"
import styles from './styles.module.css'

const LayoutBanner = () => {

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true
    }
    
    return (
        <div className={`${styles.banner_frame}`}>
            <Slider {...settings}>
                <div>
                    <img className={`${styles.banner_img}`} src="/image/Tranquil Beachfront with White Loungers and Orange Umbrellas 1 (1).png" alt="bannerImage01" />
                </div>
                <div>
                    <img className={`${styles.banner_img}`} src="/image/Tranquil Beachfront with White Loungers and Orange Umbrellas 1 (2).png" alt="bannerImage02" />
                </div>
                <div>
                    <img className={`${styles.banner_img}`} src="/image/Tranquil Beachfront with White Loungers and Orange Umbrellas 1.png" alt="bannerImage03" />
                </div>
            </Slider>
        </div>
    )
}

export default LayoutBanner