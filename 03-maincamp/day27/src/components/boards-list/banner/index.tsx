"use client"

import styles from './styles.module.css'
import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SimpleSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <div className={styles.slider__container}>

    <Slider {...settings}>
      <div>
        <img src="/images/banner1.png" alt="배너1" />
      </div>
      <div>
        <img src="/images/banner2.png" alt="배너2" />
      </div>
      <div>
        <img src="/images/banner3.png" alt="배너3" />
      </div>
      
    </Slider>

    </div>
  );
}