// Import necessary libraries
import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

// Create a context for cart data
const CartContext = createContext();

// Define the CartProvider component to manage and provide cart data
export const CartProvider = ({ children }) => {
  // State to store the items in the cart
  const [cartItems, setCartItems] = useState([]);

  // Function to add items to the cart
  const addToCart = (product, quantity) => {
    // Update the cart items by adding or updating the product
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        // If the item already exists, update its quantity
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // If the item is new, add it to the cart
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  // Provide cartItems and addToCart to any component that needs it
  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Prop validation for children
CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Hook to use the cart context in components
export const useCart = () => useContext(CartContext);
