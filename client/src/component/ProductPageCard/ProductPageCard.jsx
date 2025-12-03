import React from "react";
import "./ProductPageCard.scss"
function ProductPageCard({ products }) {
  return (
    <div className="productCard">
      {products?.map((product, index) => (
        <div key={index} className="slide_imge">
          <img src={product.thumbnail} alt={product.title} />
        </div>
      ))}
    </div>
  );
}

export default ProductPageCard;
