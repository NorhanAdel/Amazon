import React, { useState, useEffect } from "react";

import { Divider } from "@mui/material";
import Rating from "../RatingIcon/RatingIcon";

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

import "./Slider.scss";

function Slider({ title }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);
  console.log(data);
  return (
    <div className="product_page">
      <div className="product_deals">
        <h3>{title}</h3>
        <button className="view_btn">View All</button>
      </div>
      <Divider />
      <Swiper
        slidesPerView={6} // Adjusted for better layout
        centeredSlides={false}
        slidesPerGroup={6} // Matches slidesPerView
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
        {data.products?.map((item, i) => (
          <SwiperSlide key={i} className="product_items">
            <div className="product_imag">
              <img src={item.thumbnail} alt="" />
            </div>
            <div className="product_desc">
              <p className="product_name">{item.title}</p>
              <p className="product_description">
                {item.description.slice(0, 100)}
              </p>
              <Rating reviews={item.reviews || []} />
              <p className="product_view">100+ viewed in past month</p>
              <p className="product_offer">
                <span className="descunt">-{item.discountPercentage}%</span>${item.price}
              </p>

              <p className="subtitle">Get it as soon as Monday,Nov</p>
              {/* <p className="product_explore">{item.tagline}</p> */}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Slider;
