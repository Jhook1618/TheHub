import { useContext } from "react";
import CartContext from "../components/cartComponents/CartContext";

// Hook to use the cart context in components
export const useCart = () => useContext(CartContext);
