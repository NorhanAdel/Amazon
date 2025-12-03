import React, { useEffect, useState, useContext, useRef } from "react";
import "./Navbar.scss";
import IMG from "../../assets/amazon_PNG25.png";
import IMG2 from "../../assets/india.png";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineShoppingCart, MdDelete } from "react-icons/md";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import { CiLocationOn } from "react-icons/ci";
import { ToastContainer, toast } from "react-toastify";
import { LoginContext } from "../../Context/ContextProvider.js";
import { useCart } from "../../Context/CartContext";
import SearchBox from "../SearchBox/SearchBox";

function Navbar() {
  const { account, setAccount } = useContext(LoginContext);
  const { cart, removeFromCart, fetchCart } = useCart();
  const history = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);
  const cartRef = useRef(null);

  const getValidUser = async () => {
    try {
      const res = await fetch("/profile", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!res.ok) throw new Error("Not logged in");

      const data = await res.json();
      console.log("dataaccount",data);
      setAccount(data);
      fetchCart(data._id);
    } catch {
      setAccount(null);
    }
  };

  const logoutUser = async () => {
    try {
      const res = await fetch("/logout", {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Logout failed");

      setAccount(null);
      toast.warn("Logged out successfully", { position: "top-center" });
      history("/login");
    } catch (err) {
      console.error(err);
      toast.error("Logout error", { position: "top-center" });
    }
  };

  useEffect(() => {
    getValidUser();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setCartDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const totalQty = cart.reduce(
    (total, item) => total + (item.quantity || 0),
    0
  );
console.log("account JSON:", account);

 
  return (
    <header>
      <nav className="navbar">
        <div className="left">
          <Link to="/">
            <div className="navlogo">
              <img src={IMG} alt="logo" />
            </div>
          </Link>

          <div className="navlocation">
            <div className="navbarlocationimg">
              <CiLocationOn />
            </div>
            <div className="navbarlocationplace">
              <div className="navbarlocationtop">Delivery To</div>
              <div className="navbarlocationbottom">Update Location</div>
            </div>
          </div>

          <div className="searchbx">
            <SearchBox />
          </div>
        </div>

        <div className="right">
          <div className="indiaCode">
            <img src={IMG2} alt="flag" />
            <span>EN</span>
          </div>

          <Link to="/order">Orders</Link>

          {account ? (
            <div className="user_dropdown" ref={dropdownRef}>
              <Avatar
                sx={{
                  bgcolor: "#f0c14b",
                  color: "#111",
                  width: 32,
                  height: 32,
                  fontSize: "16px",
                  cursor: "pointer",
                }}
                onClick={() => setDropdownOpen((prev) => !prev)}
              >
                {account?.name?.charAt(0).toUpperCase()}
              </Avatar>

              {dropdownOpen && (
                <div className="dropdown_content">
                  <p onClick={() => history("/account")}>Profile</p>
                  <p onClick={logoutUser}>Logout</p>
                </div>
              )}
            </div>
          ) : (
            <div className="navbtn">
              <Link to="/login">Signin</Link>
            </div>
          )}

          <div className="cart_container" ref={cartRef}>
            <div
              className="cart_btn"
              onClick={() => setCartDropdownOpen((prev) => !prev)}
            >
              <Badge badgeContent={totalQty} color="primary">
                <MdOutlineShoppingCart />
              </Badge>
              <p>Cart</p>
            </div>

            {cartDropdownOpen && (
              <div className="cart_dropdown">
                {cart.length === 0 ? (
                  <p className="empty_cart">Your cart is empty</p>
                ) : (
                  cart.map((item) => (
                    <div key={item._id} className="cart_item">
                      <img
                        src={item.productId?.thumbnail}
                        alt={item.productId?.title}
                      />
                      <div className="cart_item_info">
                        <p className="cart_item_name">
                          {item.productId?.title}
                        </p>
                        <p className="cart_item_qty">Qty: {item.quantity}</p>
                      </div>
                      <MdDelete
                        className="delete_icon"
                        onClick={() => removeFromCart(item._id, account._id)}
                      />
                    </div>
                  ))
                )}
                {cart.length > 0 && (
                  <Link to="/buynow" className="go_to_cart">
                    Go to Cart
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
      <ToastContainer />
    </header>
  );
}

export default Navbar;
