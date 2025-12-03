import React from "react";
import "./HomeDetails.scss";
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
import { Link } from "react-router-dom";

function HomeDetails({ products,title }) {
  return (
    <div className="homeDetails">
      <div className="title">
        <h1>{ title}</h1>
      </div>
       <Swiper
      slidesPerView={6}
      centeredSlides={false}
      slidesPerGroup={4}
      grabCursor={true}
      keyboard={{ enabled: true }}
      loop={true}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      navigation={true}
      modules={[Keyboard, Scrollbar, Navigation, Autoplay]}
      className="mySwiper homedetailscard"
    >
      {products?.map((product, index) => (
        <SwiperSlide key={index} className="slide_imge">
          <Link to={`/product/${product.id}`} state={{ product }}>
            <img src={product.thumbnail} alt={product.title} />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
    </div>
  );
}

export default HomeDetails;
