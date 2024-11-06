import React, { useState, useEffect } from 'react';
import './Navbar.css';
import logo from "../../assets/banner/logo.webp";
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../admin/firebase'; // Import Firebase auth

const Navbar = () => {
  const [activeTab, setActiveTab] = useState("");
  const [user, setUser] = useState(null); // To store user details
  const history = useNavigate();

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Set user if logged in
      } else {
        setUser(null); // Clear user if logged out
      }
    });

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Handle logout
  const handleLogout = () => {
    auth.signOut().then(() => {
      setUser(null); // Clear user state after logging out
      history.push('/'); // Redirect to homepage after logout
    });
  };

  return (
    <>
      {/* Navbar1 Start */}
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
          {/* Conditionally render Login/Register or Welcome message */}
          {user ? (
            <span className="nav-link">
              Welcome, {user.displayName || user.email.split('@')[0]}{' '}
              <button onClick={handleLogout} style={{ background: 'transparent', border: 'none', color: 'blue' }}>
                Logout
              </button>
            </span>
          ) : (
            <Link
              className={`nav-link ${activeTab === "" ? "active" : ""}`}
              to="/Login"
              onClick={() => handleTabClick("Login")}
            >
              Login/Register
            </Link>
          )}
        </div>
        <div className="item">
          <Link
            className={`nav-link ${activeTab === "Cart" ? "active" : ""}`}
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
            className={`nav-link ${activeTab === "electronics" ? "active" : ""}`}
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
      </ul>
      {/* Navbar2 End */}
    </>
  );
};

export default Navbar;
