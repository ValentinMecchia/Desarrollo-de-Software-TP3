import React from "react";
import { Link } from "react-router-dom";
import "./Styles/Navbar.css";
import logo from "../../assets/logo.png";

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar__logo">
                <Link to="/" className="navbar__logo-link">
                    <img src={logo} alt="Echofy Logo" />
                </Link>
            </div>
            <ul className="navbar__links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/favorites">Favorites</Link></li>
                <li><Link to="/about">About</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;
