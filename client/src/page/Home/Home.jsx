import React, { useState, useEffect } from "react";
import Banner from "../../component/Banner/Banner";
import Card from "../../component/Card/Card";
import CardDetails from "../../component/CardDetails/CardDetails";
import Deals from "../../component/Deals/Deals";
import HomeDetails from "../../component/HomeDetails/HomeDetails";
import Slider from "../../component/Slider/Slider";
import Slider2 from "../../component/Slider2/Slider2";

import {
  slideFive,
  slideFour,
  slideOne,
  slideSix,
  slideTree,
  slidetwo,
} from "../../constant/slideOne";

import "./Home.scss";
function Home() {
  const [categories, setCategories] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState({});

  useEffect(() => {
    fetch("https://dummyjson.com/products/category-list")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  console.log(categories);

  useEffect(() => {
   
    const fetchProducts = async () => {
      const products = {};
      for (const category of categories) {
        const res = await fetch(
          `https://dummyjson.com/products/category/${category}`
        );
        const data = await res.json();
        products[category] = data.products;
      }
      setProductsByCategory(products);
    };

    if (categories.length) {
      fetchProducts();
    }
  }, [categories]);

  console.log(productsByCategory);
  return (
    <div className="home">
      <div className="banner_part">
        <Banner />
        <Card />
      </div>
      <Deals products={slidetwo} className="dark" />
      {categories.slice(3, 4).map((category) => (
        <div key={category}>
          <HomeDetails
            products={productsByCategory[category]}
            title="More items to consider"
          />
        </div>
      ))}

      <CardDetails />
      {categories.slice(10, 11).map((category) => (
        <div key={category}>
          <HomeDetails
            products={productsByCategory[category]}
            title="Modern Electronics"
          />
        </div>
      ))}
      <Deals products={slidetwo} className="white" />
      <CardDetails />
      {categories.slice(0, 1).map((category) => (
        <div key={category}>
          <HomeDetails
            products={productsByCategory[category]}
            title="Large Appliances"
          />
        </div>
      ))}
      <Slider2 products={slideOne} title="Your Amazon go-to guide" />
      {categories.slice(5, 6).map((category) => (
        <div key={category}>
          <HomeDetails
            products={productsByCategory[category]}
            title="Large Appliances"
          />
        </div>
      ))}
      <Slider title="upto 80% off" />
    </div>
  );
}

export default Home;
