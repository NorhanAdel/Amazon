import React from "react";
import Carousel from "react-material-ui-carousel";
import "./Banner.scss";
const data = [
  "https://m.media-amazon.com/images/I/71qjAo9D-LL._SX3000_.jpg",
  " https://m.media-amazon.com/images/I/61I9jQX1YmL._SX3000_.jpg",
  "https://m.media-amazon.com/images/I/71m5s4DCkfL._SX3000_.jpg",
  "https://m.media-amazon.com/images/I/61Hli1jABKL._SX3000_.jpg",
  "https://m.media-amazon.com/images/I/61JJhixcqkL._SX3000_.jpg",
  "https://m.media-amazon.com/images/I/61SZFIlHkTL._SX3000_.jpg",
  "https://m.media-amazon.com/images/I/71DQMiLiGZL._SX3000_.jpg",
  "https://m.media-amazon.com/images/I/619on3kXKbL._SX3000_.jpg",
];
function Banner() {
  return (
    <Carousel
      className="carousel"
      autoPlay={true}
      animation="slide"
      indicators={false}
      navButtonsAlwaysVisible={true}
      cycleNavigation={true}
      navButtonsProps={{
        style: {
          backgroundColor: "#fff",
          color: "#494949",
          borderRadius: 0,
              marginTop: -300,
          height:"90px"
        },
      }}
    >
      {data.map((item, i) => {
        return (
          <>
            <img src={item} alt="" key={i} className="banner_img" />
          </>
        );
      })}
    </Carousel>
  );
}

export default Banner;
