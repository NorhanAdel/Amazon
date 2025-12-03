import React, { useState, useEffect } from "react";
import "./SearchBox.scss";
import { IoSearch } from "react-icons/io5";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { NavLink } from "react-router-dom";

function SearchBox() {
    const [category, setCategory] = useState([]);
 const [text, setText] = useState("");
 const [liopen, setLiopen] = useState(true);
  const [indata, setIndata] = useState([]);

    useEffect(() => {
        fetch("https://dummyjson.com/products/categories")
            .then((res) => res.json())
            .then((data) => setCategory(data));
    }, []);

 const getindata = async () => {
   try {
     console.log("Fetching all product");
     const res = await fetch("/allproducts", {
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
    
   } catch (err) {
     console.error("Error fetching product data:", err);
   }
 };
 useEffect(() => {
   
     getindata();
   
 }, [text]);






    console.log(category);
    const getText = (items) => {
        setText(items)
        setLiopen(false);
        console.log(text)
    }
    return (
      <div className="searchbar">
        <div className="search_box">
          <select>
            {category.map((item, i) => {
              return <option key={i}>{item.name}</option>;
            })}
          </select>
          <input
            type="text"
            placeholder="Search Amazon.eg"
            onChange={(e) => getText(e.target.value)}
          />
          <div className="searchicon">
            <IoSearch />
          </div>
        </div>
        {text && (
          <List className="extrasearch" hidden={liopen}>
            {indata
              .filter((product) =>
                product.title.toLowerCase().includes(text.toLowerCase())
              )
              .map((products) => (
                <ListItem>
                  <NavLink
                    to={`/product/${products.id}`}
                    onClick={() => setLiopen(true)}
                  >
                    {products.title}
                  </NavLink>
                </ListItem>
              ))}
          </List>
        )}
      </div>
    );
}
export default SearchBox;