import { useContext } from "react";
import CartContext from "../components/cartComponents/cartComponents"; // Adjust the path as needed

// Custom hook to use the CartContext
const useCart = () => useContext(CartContext);

export default useCart;
