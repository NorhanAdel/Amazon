import React, { useState, useEffect } from "react";

import { Divider } from "@mui/material";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";

import {
  Keyboard,
  Scrollbar,
  Navigation,
  Pagination,
  Autoplay,
} from "swiper/modules";

import "./Slider2.scss";

function Slider2({ title,products }) {
  return (
    <div className="product_page">
      <div className="product_deals">
        <h3>{title}</h3>
      </div>
      
      <Swiper
        slidesPerView={6}
        centeredSlides={false}
        slidesPerGroup={6}
        grabCursor={true}
        keyboard={{
          enabled: true,
        }}
        loop={true}
        autoplay={{
          delay: 8000,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Keyboard, Scrollbar, Navigation, Pagination, Autoplay]}
        className="mySwiper"
      >
        {products.map((item, i) => (
          <SwiperSlide key={i} className="product_items">
            <div className="product_imag">
              <img src={item} alt="" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Slider2;
