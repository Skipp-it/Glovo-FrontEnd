import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ auth }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        Team-Team <strong>Delivery</strong>
      </Link>
      <Link className="navbar-brand" to="/favorites">
        my favorites
      </Link>
      <Link className="navbar-brand" to="/login">
        login
      </Link>
      <Link className="navbar-brand" to="/register">
        register
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
    </nav>
  );
};

export default Navbar;