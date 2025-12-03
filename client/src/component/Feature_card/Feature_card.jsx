import React from "react";
import "./Featured_card.scss";
import { BiSolidStar } from "react-icons/bi";
import { BiHeart } from "react-icons/bi";
function Feature_card() {
    const [categories, setCategories] = useState([]);
    const [productsByCategory, setProductsByCategory] = useState({});

    useEffect(() => {
      fetch("https://dummyjson.com/products/category-list")
        .then((res) => res.json())
        .then((data) => setCategories(data));
    }, []);

    console.log(categories);

    useEffect(() => {
      // Fetch products for each category
      const fetchProducts = async () => {
        const products = {};
        for (const category of categories) {
          const res = await fetch(
            `https://dummyjson.com/products/category/${category}`
          );
          const data = await res.json();
          products[category] = data.products;
        }
        setProductsByCategory(products);
      };

      if (categories.length) {
        fetchProducts();
      }
    }, [categories]);
  return (
    <div className="feature-card">
     
    </div>
  );
}

export default Feature_card;
