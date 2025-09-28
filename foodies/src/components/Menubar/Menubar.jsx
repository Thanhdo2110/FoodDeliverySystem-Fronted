import React, { useContext } from 'react';
import './Menubar.css';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';


const Menubar = () => {
  const { foodList, quantities } = useContext(StoreContext);

  const totalItems = foodList.reduce((total, food) => total + (quantities[food.id] || 0), 0);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        {/* Logo */}
        <Link to="/">
          <img
            src={assets.logo}
            alt="Logo"
            className="logo"
            height={80}
            width={80}
          />
        </Link>
        
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Items */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/explore">Explore</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact us</Link>
            </li>
          </ul>

          {/* Cart and Authentication Buttons */}
          <div className="d-flex align-items-center gap-4">
            <Link to="/cart" className="position-relative">
              <img
                src={assets.cart}
                alt="Cart"
                height={32}
                width={32}
                className="position-relative"
              />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning">
                {totalItems}
              </span>
            </Link>

            <Link to="/login" className="btn btn-outline-primary">
              Login
            </Link>
            <Link to="/register" className="btn btn-outline-success">
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Menubar;