import React, { useState, useEffect } from "react";

 

import { feature } from "../../constant/feature";
import { Link } from "react-router-dom";

import "./Feature.scss";
import Feature_card from "../../component/Feature_card/Feature_card";
import Sidebar from "../../component/Sidebar/Sidebar";
function Feature() {
  const [product, setproduct] = useState([]);
  const apiUrl = "http://localhost:3001/products";
  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((product) => setproduct(product));
  }, []);
  return (
    <div className="feature_page">
      <div className="feature_top_banner">
        <div className="feature_items">Electronics</div>

        {feature.map((item) => {
          return (
            <div className="productTopSetMenu">
              <Link>{item}</Link>
            </div>
          );
        })}
      </div>
      <div className="feature_main_page">
        <Sidebar setproduct={setproduct} />
        <Feature_card product={product} />
      </div>
    </div>
  );
}

export default Feature;
