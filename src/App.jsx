import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages Imports Start
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import Product from "./pages/productList/ProductList";
import Cart from "./pages/cart/Cart";
import Login from "./admin/Login"; // Ensure this points to your updated Login component
import Category from "./pages/categories/Categories";
import SearchResults from "./pages/searchResults/SearchResults";
import About from "./components/about/About";
import Footer from "./components/footer/Footer";
import ProductDetails from "./components/productDetails/ProductDetails";
// Pages Imports End
import { CartProvider } from "./components/cartComponents/cartComponents";

const App = () => {
  return (
    <CartProvider>
      <Router>
        <div>
          {/* Navbar */}
          <Navbar />

          {/* Routes */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ProductList" element={<Product />} />
            <Route path="/product/:productId" element={<ProductDetails />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/Category" element={<Category />} />
            <Route path="/Search" element={<SearchResults />} />
            {/* Admin Login Route. This points to your Firebase login page */}
            <Route path="/Login" element={<Login />} /> {/* Login End */}
          </Routes>

          {/* Footer Section Start */}
          <About />
          <Footer />
          {/* Footer Section End */}
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;
