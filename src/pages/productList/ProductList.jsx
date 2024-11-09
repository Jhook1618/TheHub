import { useEffect, useState } from "react";
import "./ProductsList.css";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [displayLimit, setDisplayLimit] = useState(20);

  useEffect(() => {
    // Fetch products with a limit based on displayLimit
    fetch("http://localhost:5000/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [displayLimit]); // Refresh if display limit changes

  // Handle for changing the number of items to display
  const handleLimitChange = (e) => {
    setDisplayLimit(Number(e.target.value));
  };

  return (
    <>
      {/* Dropdown to select the number of items to load */}
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
          <div key={product._id} className="grid-item">
            {product.cloudinary_url && (
              <img
                src={product.cloudinary_url}
                alt={product.name}
                className="grid-image"
              />
            )}
            <div className="item-info">
              <h3 className="item-name">{product.name}</h3>
              <p className="item-price">Price: Ksh.{product.price}</p>
              {/* <p>{product.product_block}</p> */}
              {/* <p className="item-availability">{item-availability}</p> */}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Product;
