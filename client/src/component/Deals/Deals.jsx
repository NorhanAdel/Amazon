import React from "react";
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

import "./Deals.scss";

function Deals({products,className}) {
  return (
    <div className={`Deals_page ${className}`}>
      <div className="deals_title">
        <h3>UNBEATABLE RAMADAN SAVINGS!</h3>
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
              <img src={item.thumbnail} alt="" />
            </div>
            <div className="offer">
              <span>{item.discountPercentage}% off</span>
              <p>Limeted time deal</p>
            </div>
            <div className="price">
              <p className="new_price">EG{item.price}</p>
              <p className="old_price">
                Was: <span>EGP{item.discountPercentage}</span>
              </p>
            </div>
            <p>{item.title}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Deals;
