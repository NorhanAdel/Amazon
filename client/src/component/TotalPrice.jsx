import React, { useState, useEffect } from "react";

function TotalPrice({item}) {
    const [price, setPrice] = useState(0);
      const totalAmount = () => {
        let price = 0;
        item.map((items) => {
          return (price += items.productId.price);
        });
        setPrice(price);
      };

    useEffect(() => {
      totalAmount();
    }, [item]);
    
  return (
      <h3 className="subTotal_title">
                      Subtotal ({item.length} item):{" "}
                      <span style={{ fontWeight: 700, color: "111" }}>
                        ${price}
                      </span>{" "}
                    </h3>
  )
}

export default TotalPrice