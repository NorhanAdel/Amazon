import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./AllPage.scss";

function AllPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState(5000);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [sortBy, setSortBy] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/allproducts");
      const data = await res.json();
      setProducts(data);
      setFilteredProducts(data);
      const cats = ["All", ...new Set(data.map((p) => p.category))];
      setCategories(cats);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let temp = [...products];

    if (selectedCategory !== "All")
      temp = temp.filter((p) => p.category === selectedCategory);

    temp = temp.filter((p) => p.price <= priceRange);

    if (ratingFilter > 0)
      temp = temp.filter((p) => Math.floor(p.rating) >= ratingFilter);

    if (search)
      temp = temp.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );

    if (sortBy === "low") temp.sort((a, b) => a.price - b.price);
    if (sortBy === "high") temp.sort((a, b) => b.price - a.price);
    if (sortBy === "rate") temp.sort((a, b) => b.rating - a.rating);

    setFilteredProducts(temp);
    setCurrentPage(1);
  }, [selectedCategory, priceRange, ratingFilter, sortBy, search, products]);

  const last = currentPage * productsPerPage;
  const first = last - productsPerPage;
  const current = filteredProducts.slice(first, last);
  const pages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="amazon_page">
      <div className="top_filter_bar">
        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select onChange={(e) => setSortBy(e.target.value)}>
          <option value="">Sort By</option>
          <option value="low">Price: Low → High</option>
          <option value="high">Price: High → Low</option>
          <option value="rate">Rating</option>
        </select>
      </div>

      <div className="content">
        <aside className="sidebar">
          <h3>Category</h3>
          {categories.map((cat) => (
            <p
              key={cat}
              className={cat === selectedCategory ? "active" : ""}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </p>
          ))}

          <h3>Price</h3>
          <input
            type="range"
            min="0"
            max="5000"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value) }
          />
          <span>Up to ${priceRange}</span>

          <h3>Rating</h3>
          {[5, 4, 3, 2, 1].map((r) => (
            <p
              key={r}
              className={ratingFilter === r ? "active" : ""}
              onClick={() => setRatingFilter(r)}
            >
              {"★".repeat(r)}
            </p>
          ))}
          <p className="clear" onClick={() => setRatingFilter(0)}>
            Clear Rating
          </p>
        </aside>

        <main className="products">
          <div className="grid">
            {current.map((product) => (
              <div key={product._id} className="card">
                <Link to={`/product/${product._id}`}>
                  <img src={product.thumbnail} alt="" />
                  <h4>{product.title}</h4>
                </Link>
                <p className="price">${product.price}</p>
                <p className="stars">
                  {"★".repeat(Math.floor(product.rating))}
                  {"☆".repeat(5 - Math.floor(product.rating))}
                </p>
              </div>
            ))}
          </div>

          <div className="pagination">
            {[...Array(pages)].map((_, i) => (
              <button
                key={i}
                className={currentPage === i + 1 ? "active" : ""}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default AllPage;
