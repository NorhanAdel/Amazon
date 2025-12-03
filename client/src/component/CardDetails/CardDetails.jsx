import React from "react";
import "./CardDetails.scss";
import productCard from "../../productCard.json";

function CardDetails() {
  return (
    <div className="product_card_page">
      {productCard.card.map((item) => {
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

export default CardDetails;
