import React from 'react'

function Product({ product }) {
  return (
    <div>
      product.slice(9, 14).map((p) => (
      <div className="_card">
        <Feature_box product={p} />
      </div>
    </div>
  );
}

export default Product