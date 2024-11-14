// Import necessary libraries and components
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../../hooks/useCart"; // Import useCart hook to access cart functions
import "./ProductDetails.css";

// Define the ProductDetails component
function ProductDetails() {
  // Retrieve the product ID from the URL parameters
  const { productId } = useParams();

  // State to store the product details and quantity selected by the user
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); // Default quantity is set to 1

  // Access the addToCart function from CartContext to manage cart operations
  const { addToCart } = useCart();

  // Fetch product details when the component mounts or when productId changes
  useEffect(() => {
    async function fetchProductDetails() {
      try {
        // Fetch product details by ID from the backend API
        const response = await fetch(`/api/products/${productId}`);
        const data = await response.json();
        setProduct(data); // Store the product details in state
      } catch (error) {
        console.error("Error fetching product details:", error); // Handle any fetch errors
      }
    }

    fetchProductDetails();
  }, [productId]); // Dependency array ensures effect runs when productId changes

  // Handlers to increase or decrease the quantity value
  const handleIncrement = () => setQuantity((prev) => prev + 1); // Increase quantity by 1
  const handleDecrement = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1)); // Decrease quantity by 1 but not below 1

  // Handler for adding the product to the cart
  const handleAddToCart = () => {
    addToCart(product, quantity); // Add the product and selected quantity to the cart
    console.log(`Added ${quantity} of ${product.name} to cart`); // Log for debugging
  };

  // Render loading message if product details have not been fetched yet
  if (!product) return <p>Loading...</p>;

  // Render the product details once available
  return (
    <div className="details-container">
      <div className="img-item">
        {/* Display product image if available */}
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
        <p className="item-price">Price: Ksh.{product.price}</p>
        <p className="description">{product.description}</p>

        {/* Quantity controls for adjusting the selected quantity */}
        <div className="quantity-controls">
          <button className="decrement" onClick={handleDecrement}>
            -
          </button>
          <span className="quantity">{quantity}</span>
          <button className="increment" onClick={handleIncrement}>
            +
          </button>
        </div>

        {/* Add to Cart button triggers the handleAddToCart function */}
        <button className="add-to-cart" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;
