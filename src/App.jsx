import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages Imports Start
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import Product from "./pages/productList/ProductList";
import Cart from "./pages/cart/Cart";
import Login from "./admin/Login";  // Ensure this points to your updated Login component
import Category from "./pages/categories/Categories";
import SearchResults from "./pages/searchResults/SearchResults";
import About from "./components/about/About";
import Footer from "./components/footer/Footer";
// Pages Imports End

const App = () => {
  return (
    <Router>
      <div>
        {/* Navbar */}
        <Navbar />

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ProductList" element={<Product />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Category" element={<Category />} />
          <Route path="/Search" element={<SearchResults />} />

          {/* Admin Login Route */}
          <Route path="/Login" element={<Login />} />  {/* This points to your Firebase login page */}

        </Routes>

        {/* Footer Section */}
        <About />
        <Footer />
      </div>
    </Router>
  );
};

export default App;
