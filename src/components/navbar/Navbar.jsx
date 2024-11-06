import "./Navbar.css";
import logo from "../../assets/banner/logo.webp";
import { useState } from "react";
import { Link } from "react-router-dom";

// Components Imports Start
// import Login from "../../admin/Login";
// import Cart from "../../pages/cart/Cart";
// import Product from "../../pages/product/Product";
//  Components Imports End

const Navbar = () => {
  // Track the active tab
  const [activeTab, setActiveTab] = useState(""); // default active tab

  // Function to hundle tab click
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      {/* Navbar1 Start*/}
      <div className="nav-bar container">
        <div className="logo">
          <img src={logo} alt="HubTronics" className="image logo" />
        </div>

        {/* Search Form */}
        <form className="search-form" action="/search" method="GET">
          <input
            type="text"
            name="query"
            className="search-input"
            placeholder="Search..."
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>

        <div className="item">
          <Link
            className={`nav-link ${activeTab === "" ? "active" : ""}`}
            to="/Login"
            onClick={() => handleTabClick("Login")}
          >
            Login/Register
          </Link>
        </div>
        <div className="item">
          <Link
            className={`nav-link ${activeTab === "" ? "active" : ""}`}
            to="/Cart"
            onClick={() => handleTabClick("Cart")}
          >
            Cart
          </Link>
        </div>
      </div>
      {/* Navbar1 End */}

      {/* Navbar2 Start */}
      <ul className="nav nav-tabs">
        <li className="nav-item1">
          <Link className={"nav-link active"} aria-current="page" to="/">
            <span className="hub">Hub</span>
            <span className="tronics">TRONICS</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={`nav-link ${activeTab === "categories" ? "active" : ""}`}
            to="/Categories"
            onClick={() => handleTabClick("categories")}
          >
            <span className="cat">Categories</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={`nav-link ${activeTab === "shop" ? "active" : ""}`}
            to="/Product"
            onClick={() => handleTabClick("shop")}
          >
            <span className="cat2">Shop</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={`nav-link ${
              activeTab === "electronics" ? "active" : ""
            }`}
            to="#"
            onClick={() => handleTabClick("electronics")}
          >
            <span className="cat2">Electronics</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={`nav-link ${activeTab === "diy" ? "active" : ""}`}
            to="#"
            onClick={() => handleTabClick("diy")}
          >
            <span className="cat2">DIY Modules</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={`nav-link ${activeTab === "hot-items" ? "active" : ""}`}
            to="#"
            onClick={() => handleTabClick("hot-items")}
          >
            <span className="cat2">Hot Items</span>
          </Link>
        </li>
        {/* <li className="nav-item">
          <a
            className="nav-link disabled"
            href="#"
            tabindex="-1"
            aria-disabled="true"
          >
            Disabled
          </a>
        </li> */}
      </ul>
      {/* Navbar2 End */}
    </>
  );
};

export default Navbar;
