import React from "react";
import Rating from "../RatingIcon/RatingIcon";
import "./ProductDetails.scss";
import { Divider } from "@mui/material";

const ProductDetails = ({ product }) => {
  if (!product) return null;

  const width = product?.dimensions?.width || "N/A";
  const height = product?.dimensions?.height || "N/A";
  const depth = product?.dimensions?.depth || "N/A";
  const weight = product?.weight || "N/A";
  const language = product?.language || "Not available";
  const sku = product?.sku || "Not available";
  const stock = product?.stock || "N/A";
  const category = product?.category || "N/A";
  const origin = product?.origin || "Not available";
  const returnPolicy = product?.returnPolicy || "Not available";
  const reviews = product?.reviews || [];

  return (
    <div className="product-details">
    
      
      <div className="technical-details">
        <h3>Technical Details</h3>
        <table>
          <tbody>
            <tr>
              <td>Manufacturer</td>
              <td>Eucerin</td>
            </tr>
            <tr>
              <td>Language</td>
              <td>{language}</td>
            </tr>
            <tr>
              <td>Item model number</td>
              <td>{weight} g</td>
            </tr>
            <tr>
              <td>Product Dimensions</td>
              <td>
                {width} x {height} x {depth} cm; {weight} g
              </td>
            </tr>
            <tr>
              <td>ASIN</td>
              <td>{sku}</td>
            </tr>
          </tbody>
        </table>
      </div>

  
      <div className="additional-info">
        <h3>Additional Information</h3>
        <table>
          <tbody>
            <tr>
              <td>Best Sellers Rank</td>
              <td>
                #{stock} in {category}
              </td>
            </tr>
            <tr>
              <td>Customer Reviews</td>
              <td>
                <Rating reviews={reviews} />
              </td>
            </tr>
            <tr>
              <td>Date First Available</td>
              <td>2 August 2021</td>
            </tr>
          </tbody>
        </table>
      </div>

  
      <div className="product-details-section">
        <h3>Product Details</h3>
        <table>
          <tbody>
            <tr>
              <td>Language</td>
              <td>{language}</td>
            </tr>
            <tr>
              <td>Product Dimensions</td>
              <td>
                {width} x {height} x {depth} cm; {weight} g
              </td>
            </tr>
            <tr>
              <td>Return Policy</td>
              <td>{returnPolicy}</td>
            </tr>
            <tr>
              <td>Manufacturer</td>
              <td>Eucerin</td>
            </tr>
            <tr>
              <td>ASIN</td>
              <td>{sku}</td>
            </tr>
            <tr>
              <td>Item model number</td>
              <td>{weight} g</td>
            </tr>
            <tr>
              <td>Country of Origin</td>
              <td>{origin}</td>
            </tr>
            <tr>
              <td>Best Sellers Rank</td>
              <td>
                #{stock} in {category}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
   
    </div>
  );
};

export default ProductDetails;
