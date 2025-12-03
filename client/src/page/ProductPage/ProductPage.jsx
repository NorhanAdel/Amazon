import React, { useState, useEffect } from "react";
import ProductPageCard from "../../component/ProductPageCard/ProductPageCard";
import Sidebar from "../../component/Sidebar/Sidebar";

import "./ProductPage.scss";
function ProductPage() {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategory(data));
  }, []);
  const [categories, setCategories] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState({});

  useEffect(() => {
    fetch("https://dummyjson.com/products/category-list")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  console.log(categories);

  useEffect(() => {
    // Fetch products for each category
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

  return (
    <div className="productPage">
      <div className="top">
        Electronic
        {category.slice(0, 12).map((item, i) => {
          return (
            <div className="topProductsubMenue" key={i}>
              {item.name}
            </div>
          );
        })}
      </div>
      <div className="productMain">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="rightProduct">
          <div className="rightPoductsTop">
            1-5 of 5 results <span className="resultProduct">Beuty</span>
          </div>
          <div className="itemproductpage">
            {categories.slice(0, 1).map((category) => (
              <div key={category}>
                <ProductPageCard products={productsByCategory[category]} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
