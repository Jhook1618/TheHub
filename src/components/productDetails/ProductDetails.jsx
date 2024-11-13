import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./ProductDetails.css";

function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); // State to manage product quantity

  useEffect(() => {
    // Fetch product by ID
    async function fetchProductDetails() {
      try {
        const response = await fetch(`/api/products/${productId}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    }

    fetchProductDetails();
  }, [productId]);

  // Increment and decrement handlers
  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  // Add to cart handler
  const handleAddToCart = () => {
    // Add your logic to add the product to the cart with the specified quantity
    console.log(`Added ${quantity} of ${product.name} to cart`);
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="details-container">
      <div className="img-item">
        {product.cloudinary_url && (
          <img
            src={product.cloudinary_url}
            alt={product.name}
            className="img-detail"
          />
        )}
      </div>
      <div className="info-item">
        <h3 className="item-name">{product.name}</h3>
        <p className="item-price">Price: {product.price}</p>
        <p className="description">{product.description}</p>

        <div className="quantity-controls">
          <button className="decrement" onClick={handleDecrement}>
            -
          </button>
          <span className="quantity">{quantity}</span>
          <button className="increment" onClick={handleIncrement}>
            +
          </button>
        </div>

        <button className="add-to-cart" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;
