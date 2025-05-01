import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout successfully");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg dashing-navbar">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="/categories"
                  data-bs-toggle="dropdown"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  {/* <li>
                    <Link className="dropdown-item" to="/categories">
                      All Categories
                    </Link>
                  </li> */}
                  {categories?.map((c) => (
                    <li key={c.slug}>
                      <Link
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      role="button"
                      data-bs-toggle="dropdown"
                    >
                      {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className="dropdown-item"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="dropdown-item"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
              <li className="nav-item">
                <Badge count={cart?.length} showZero className="cart-badge">
                  <NavLink to="/cart" className="nav-link">
                    🛍 Cart
                  </NavLink>
                </Badge>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Styles */}
      <style>
        {`
/* ✨ Clean & Minimalist Navbar */
.dashing-navbar {
  background: #100c0c; /* No background */
  box-shadow: none; /* Removed any shadows */
  padding: 10px 20px;
  height: auto;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Orbitron', sans-serif;
  border-bottom: none; /* Removed border */
}

/* ✨ Enlarged Navbar Items */
.navbar-nav {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 40px; /* More spacing between items */
}

/* ✨ Enlarged Navbar Links */
.navbar-nav .nav-link {
  font-size: 1.4rem; /* Increased size */
  font-weight: 700; /* Bolder text */
  padding: 12px 20px; /* More padding */
  color:rgb(5, 5, 5) !important;
  text-transform: uppercase;
  transition: all 0.3s ease-in-out;
  border-radius: 10px;
  text-shadow: #000000
  
  border: none !important; /* Removed any borders */
}

.navbar-nav .nav-link:hover {
  color: #FFBE0B !important;
  text-shadow: #ffffff
  transform: scale(1.15);
}

/* ✨ Enlarged & Stylish Brand Logo */
.navbar-brand {
  font-size: 1.8rem;
  font-weight: bold;
  text-transform: uppercase;
  background: linear-gradient(to right, #00ffff, #ff00ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0px 0px 10px rgba(0, 255, 255, 0.8);
  letter-spacing: 2px;
  position: absolute;
  left: 20px;
}

/* ✨ Glowing Search Input (No Border) */
.search-container {
  width: 270px;
  height: 40px;
  font-size: 1.1rem;
  font-family: 'Orbitron', sans-serif;
  border: none !important; /* Removed border */
  border-radius: 20px;
  background: rgba(0, 0, 0, 0.6);
  color: #00ffff;
  outline: none;
  padding: 8px 18px;
  text-transform: uppercase;
  text-shadow: 0px 0px 8px rgba(0, 255, 255, 0.7);
  transition: all 0.3s ease-in-out;
}

.search-input:focus {
  box-shadow: 0px 0px 14px rgba(255, 0, 255, 0.8);
  border: none !important;
}

/* ✨ Remove Unnecessary Spacing */
.navbar-nav .nav-item {
  display: flex;
  justify-content: center;
  align-items: center;
  border: none !important;
  border-radius: 21px;
  padding: 0.01rem 1.5rem;
    background-color: white;
}



`}
      </style>
    </>
  );
};

export default Header;
