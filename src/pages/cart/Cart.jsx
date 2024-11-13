import { useState } from "react";
import CartItem from "./CartItems";
import CartSummary from "./CartSummary";
import "./Cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Product A",
      price: 100,
      quantity: 1,
      imageUrl: "image-url-a",
    },
    {
      id: 2,
      name: "Product B",
      price: 150,
      quantity: 2,
      imageUrl: "image-url-b",
    },
  ]);

  const handleQuantityChange = (id, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const handleRemove = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onQuantityChange={handleQuantityChange}
            onRemove={handleRemove}
          />
        ))
      ) : (
        <p>Your cart is empty</p>
      )}
      <CartSummary total={totalAmount} />
    </div>
  );
};

export default Cart;
