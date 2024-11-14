// Import PropTypes for type-checking
import PropTypes from "prop-types";
import "../../pages/cart/Cart.css";

// Define the CartItem component, which represents an individual item in the cart
const CartItem = ({ item, onQuantityChange, onRemove }) => {
  return (
    <div className="cart-item">
      {/* Display the product image */}
      <img
        src={item.cloudinary_url}
        alt={item.name}
        className="cart-item-image"
      />
      <div className="cart-item-details">
        {/* Display the product name and price */}
        <h3>{item.name}</h3>
        <p>Price: Ksh.{item.price}</p>

        {/* Quantity controls to increase or decrease the quantity of the product */}
        <div className="quantity-controls">
          {/* Decrease quantity button */}
          <button onClick={() => onQuantityChange(item.id, item.quantity - 1)}>
            -
          </button>
          {/* Display the current quantity */}
          <span>{item.quantity}</span>
          {/* Increase quantity button */}
          <button onClick={() => onQuantityChange(item.id, item.quantity + 1)}>
            +
          </button>
        </div>

        {/* Button to remove the item from the cart */}
        <button onClick={() => onRemove(item.id)} className="remove-button">
          Remove
        </button>
      </div>
    </div>
  );
};

// Define prop types for CartItem to ensure correct data types are passed
CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired, // ID of the product, must be a number
    name: PropTypes.string.isRequired, // Name of the product, must be a string
    price: PropTypes.number.isRequired, // Price of the product, must be a number
    quantity: PropTypes.number.isRequired, // Quantity of the product, must be a number
    cloudinary_url: PropTypes.string.isRequired, // URL of the product image, must be a string
  }).isRequired,
  onQuantityChange: PropTypes.func.isRequired, // Function to handle quantity changes
  onRemove: PropTypes.func.isRequired, // Function to handle removal of item from the cart
};

// Export the CartItem component
export default CartItem;
