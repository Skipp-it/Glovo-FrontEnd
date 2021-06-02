import React, {useContext} from 'react';
import {Link, NavLink} from 'react-router-dom';
import logo from '../../logo2.png';
import Cookies from 'js-cookie';
import {AuthContext} from "../authentication/AuthContext";

const Navbar = () => {
    const {auth} = useContext(AuthContext);
    const loggedUser = Cookies.get('name');

    return (
        <nav className="navbar">
            <Link className="navbar-brand" to="/">
                <img className="img-logo" src={logo} alt="site logo"/>
            </Link>

            <NavLink className="navbar-brand" to="/recipes/all">
                recipes
            </NavLink>

            {!auth ? (
                <div>
                    <NavLink className="navbar-brand" to="/register">
                        register/login
                    </NavLink>
                </div>
            ) : (
                <div>
                    <NavLink className="navbar-brand" to="/favorites">
                        my favorites
                    </NavLink>
                    <NavLink className="navbar-brand" to="/cart">
                        cart
                    </NavLink>
                    <Link className="navbar-brand" to="/logout">
                        logout
                    </Link>
                    <div className="navbar-brand name">
                        {' '}
                        logged as {loggedUser}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
