import React, { createContext, useContext, useState } from "react";

export const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  
  const fetchCart = async (userId) => {
    setLoading(true);
    try {
      const res = await fetch(`/getcart/${userId}`, {
        credentials: "include",  
      });
      const data = await res.json();
      setCart(data.carts || []);
    } catch (err) {
      console.error("Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  };

  
  const addToCart = async (productId, userId) => {
    try {
      const res = await fetch(`/addtocart/${productId}`, {
        method: "POST",
        credentials: "include", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userID: userId }),
      });
      const data = await res.json();
      setCart(data.carts || []);
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

 
  const removeFromCart = async (productId, userId) => {
    try {
      const res = await fetch(`/removecart/${productId}`, {
        method: "DELETE",
        credentials: "include", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userID: userId }),
      });
      const data = await res.json();
      setCart(data.carts || []);
    } catch (err) {
      console.error("Error removing from cart:", err);
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, loading, fetchCart, addToCart, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
