import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";

import "./Sidebar.scss";
function Sidebar() {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategory(data));
  }, []);
  return (
    <div className="productMain">
      <div className="productMainCateogry">
        <div className="title">Categories</div>
        <div className="productMainCategoryContent">
          {category.slice(0, 4).map((item, i) => {
            return (
              <div className="productMainTitleContent" key={i}>
                {item.name}
              </div>
            );
          })}
          <div className="ratingBox">
            {[0, 1, 2, 3].map(() => {
              return <FaStar />;
            })}
            {[0].map(() => {
              return <AiOutlineStar />;
            })}
            <div className="andup">&Up</div>
          </div>
          <div className="ratingBox">
            {[0, 1, 2].map(() => {
              return <FaStar />;
            })}
            {[0, 1].map(() => {
              return <AiOutlineStar />;
            })}
            <div className="andup">&Up</div>
          </div>
          <div className="ratingBox">
            {[0, 1].map(() => {
              return <FaStar />;
            })}
            {[0, 1, 2].map(() => {
              return <AiOutlineStar />;
            })}
            <div className="andup">&Up</div>
          </div>

          <div className="ratingBox">
            {[0].map(() => {
              return <FaStar />;
            })}
            {[0, 1, 2, 3].map(() => {
              return <AiOutlineStar />;
            })}
            <div className="andup">&Up</div>
          </div>
          <div className="productMainCategorySubContent">Amazone Prime</div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
