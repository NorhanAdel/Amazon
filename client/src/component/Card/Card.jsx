import React from "react";
 
import "./Card.scss";
import homProduct from "../../homProduct.json";
function Card() {
  return (
    <div className="card_page">
      {homProduct.product.map((item) => {
        return (
          <div className="cards">
            <h1>{item.itemTitle}</h1>
            <div className="card">
              {item.imgs.map((item, i) => {
                return (
                  <div className="imge_Card">
                    <img src={item} />
                    <p>Discover more</p>
                  </div>
                );
              })}
            </div>
            <a href="#">See More</a>
          </div>
        );
      })}
     
    </div>
  );
}

export default Card;
