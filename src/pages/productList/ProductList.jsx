import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ProductsList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [displayLimit, setDisplayLimit] = useState(20);

  useEffect(() => {
    fetch(`http://localhost:5000/products?limit=${displayLimit}`)
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [displayLimit]);

  const handleLimitChange = (e) => {
    setDisplayLimit(Number(e.target.value));
  };

  return (
    <>
      <div className="filter-container">
        <label htmlFor="displayLimit">Show:&nbsp;</label>
        <select
          id="displayLimit"
          value={displayLimit}
          onChange={handleLimitChange}
          className="display-Limit-dropdown"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
        <span>&nbsp;Items</span>
      </div>

      <div className="grid-container">
        {products.map((product) => (
          <Link
            to={`/product/${product._id}`}
            key={product._id}
            className="product-link"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="grid-item">
              {product.cloudinary_url && (
                <img
                  src={product.cloudinary_url}
                  alt={product.name}
                  className="grid-image"
                />
              )}
            </div>
            <div className="item-info">
              <p className="category">{product.category}</p>
              <h3 className="item-name product">{product.name}</h3>
              <p className="item-price product">
                Price: <span className="price">{product.price}</span>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default ProductList;
