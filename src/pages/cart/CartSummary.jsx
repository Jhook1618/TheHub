import PropTypes from "prop-types";
import "./Cart.css";

const CartSummary = ({ total }) => {
  return (
    <div className="cart-summary">
      <h3>Total: ${total.toFixed(2)}</h3>
      <button className="checkout-button">Proceed to Checkout</button>
    </div>
  );
};

CartSummary.propTypes = {
  total: PropTypes.number.isRequired,
};

export default CartSummary;
