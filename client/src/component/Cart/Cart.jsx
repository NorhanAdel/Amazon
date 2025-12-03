import { useEffect, useState, useContext } from "react";
import ReactImageMagnify from "react-image-magnify";
import "./Cart.scss";
import { Divider } from "@mui/material";
import { LoginContext } from "../../Context/ContextProvider.js";
import { slideOne, slidetwo } from "../../constant/slideOne";
import HomeDetails from "../HomeDetails/HomeDetails";
import { CiLocationOn } from "react-icons/ci";
import Slider from "../Slider/Slider";

import Ratings from "../Rating/Rating";
import { useParams, useNavigate } from "react-router";
import IMG from "../../assets/download.jpg";
import SimilarItem from "../SimilarItem/SimilarItem";
import ProductDetails from "../ProductDetails/ProductDetails";
import Rating from "../RatingIcon/RatingIcon";

function Cart() {
  const { account, setAccount } = useContext(LoginContext);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [indata, setIndata] = useState({});
  const { id } = useParams();
  const history = useNavigate();

  const getindata = async () => {
    try {
      const res = await fetch(`/getproduct/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      } else {
        setIndata(data);
      }
      getSimilarProducts(data.category, data.id);
    } catch (err) {
      console.error("Error fetching product data:", err);
    }
  };

  const getSimilarProducts = async (category, currentId) => {
    try {
      const res = await fetch(`/allproducts`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

      const data = await res.json();
      const filteredProducts = data
        .filter(
          (product) => product.category === category && product.id !== currentId
        )
        .slice(0, 6);

      setSimilarProducts(filteredProducts);
    } catch (err) {
      console.error("Error fetching similar products:", err);
    }
  };

  useEffect(() => {
    if (id) {
      getindata();
    }
  }, [id]);

  const addtocart = async (id) => {
    const userID = localStorage.getItem("userID");

    if (!userID) {
      alert("User not authenticated!");
      return;
    }

    const checkresponse = await fetch(`/addcart/${id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userID, indata }),
      credentials: "include",
    });

    const data1 = await checkresponse.json();

    if (checkresponse.status === 201) {
      alert("Data added to cart");
      setAccount((prev) => ({
        ...prev,
        users: {
          ...prev.users,
          carts: [...(prev?.users?.carts || []), indata],
        },
      }));
      history("/buynow");
    } else {
      alert("Invalid user");
    }
  };

  

  return (
    <div className="cart_page">
      <div className="cart_conatiner">
        <div className="cart_left">
          {indata?.thumbnail && (
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: indata.title || "Product Image",
                  isFluidWidth: true,
                  src: indata.thumbnail,
                },
                largeImage: {
                  src: indata.thumbnail,
                  width: window.innerWidth * 0.5,
                  height: window.innerHeight * 0.7,
                },
                enlargedImageContainerStyle: {
                  backgroundColor: "#fff",
                  zIndex: 9999,
                  width: "50vw",
                  height: "70vh",
                  border: "1px solid #ddd",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  cursor: "pointer",
                },
                lensStyle: {
                  backgroundColor: "rgba(0,0,0,0.1)",
                  width: "80px",
                  height: "80px",
                  cursor: "pointer",
                },
                isHintEnabled: true,
                shouldUsePositiveSpaceLens: true,
              }}
            />
          )}
        </div>
        <div className="Middel_cart">
          <h3 style={{ color: "#007185" }}> {indata.title}</h3>
          <h4>{indata.description}</h4>
          <Rating reviews={indata.reviews || []} />
          <Divider />
          <p className="mrp">M.R.P. : ${indata.price}</p>
          <p>
            Deal of the Day : <span style={{ color: "#b12704" }}>$145</span>
          </p>
          <p>
            You Save :{" "}
            <span style={{ color: "#b12704" }}>
              ${indata.price}({indata.discountPercentage}%)
            </span>
          </p>
          <div className="discount_box">
            <h5>
              Discount :{" "}
              <span style={{ color: "#111" }}>
                Extra off {indata.discountPercentage}%
              </span>
            </h5>
            <h4>
              Free Delivery :{" "}
              <span style={{ color: "#111", fontWeight: 600 }}>
                {indata.shippingInformation}
              </span>{" "}
              Deatails
            </h4>
            <p>
              Fastest delivery:{" "}
              <span style={{ color: "#111", fontWeight: 600 }}>
                Tomorrow 11 AM
              </span>
            </p>
          </div>
          <p className="description">
            About The Item{" "}
            <span
              style={{
                color: "#565959",
                fontSize: 14,
                fontWeight: 500,
                letterSpacing: ".4px",
              }}
            >
              {indata.description}
            </span>
          </p>
        </div>

        <div className="buyItem">
          <p className="price">
            <sup>EGP</sup>
            {indata.price}
            <sup>00</sup>
          </p>
          <p>Free delivery</p>
          <p>
            returnPolicy:<span>{indata.returnPolicy}</span>{" "}
          </p>
          <p>
            minimumOrderQuantity : <span>{indata.minimumOrderQuantity}</span>
          </p>
          <p className="delivery">
            Or fastest delivery Tomorrow, 23 March. Order within 1 hr 59 mins
          </p>
          <p className="location">
            <CiLocationOn /> <span>Deliver to Egypt</span>
          </p>

          <p className="inStock">InStock</p>
          <div className="cart_btn">
            <button
              className="cart_btn1"
              onClick={() => addtocart(indata?._id)}
            >
              Add To Cart
            </button>
            <button className="cart_btn2" >
              
              Buy Now
            </button>
          </div>
        </div>
      </div>
      
      <SimilarItem
        products={similarProducts}
        title="Products related to this item"
      />

      <ProductDetails product={indata} />
      <Slider title="upto 80% off" />
      <div className="reviews">
        <div className="left">
          <Ratings reviews={indata.reviews} />
        </div>
        <div className="right">
          <h1>Top reviews from Egypt</h1>
          {indata.reviews &&
          Array.isArray(indata.reviews) &&
          indata.reviews.length > 0 ? (
            indata.reviews.map((item, i) => (
              <div key={i} className="reviewbox">
                <div className="reviewImge">
                  <img src={IMG} alt="" />
                  <span>{item.reviewerName}</span>
                </div>
                <p className="date">Reviewed in Egypt{item.date}</p>
                <p className="verfied">Verified Purchase</p>
                <p className="desc">{item.comment}</p>
              </div>
            ))
          ) : (
            <p>No reviews available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
