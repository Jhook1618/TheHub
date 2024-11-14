// Import necessary components and hooks
import CartItem from "../../components/cartComponents/CartItems";
import CartSummary from "../../components/cartComponents/CartSummary";
import { useCart } from "../../components/cartComponents/cartComponents"; // Import the cart context
import "./Cart.css";

// Define the Cart component
const Cart = () => {
  // Access cart items from CartContext
  const { cartItems, setCartItems } = useCart();

  // Define the handleQuantityChange function to update the quantity of items
  const handleQuantityChange = (id, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  // Function to handle removing an item from the cart
  const handleRemove = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Calculate the total cost of all items in the cart
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="cart">
      <h2 className="my-cart">My Cart</h2>
      {/* Display each item in the cart or a message if empty */}
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onQuantityChange={handleQuantityChange} // Pass the quantity change handler to CartItem
            onRemove={handleRemove} // Pass the remove handler to CartItem
          />
        ))
      ) : (
        <p>Your cart is empty</p>
      )}
      {/* Display the cart summary with the total amount */}
      <CartSummary total={totalAmount} />
    </div>
  );
};

export default Cart;
