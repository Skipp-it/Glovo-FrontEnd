import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../logo2.png';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link className="navbar-brand" to="/">
        <img className="img-logo" src={logo} />
      </Link>
      <NavLink className="navbar-brand" to="/favorites">
        my favorites
      </NavLink>
      <NavLink className="navbar-brand" to="/login">
        login
      </NavLink>
      <NavLink className="navbar-brand" to="/register">
        register
      </NavLink>
      <Link className="navbar-brand" to="/logout">
        logout
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
