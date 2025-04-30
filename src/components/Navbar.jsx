import React from "react";
import { Link } from "react-router-dom";
import "./Styles/Navbar.css"; // Importa los estilos

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar__logo">
                <Link to="/">
                    <img src="../../public/assets/logo.png" alt="Echofy Logo" />
                </Link>
            </div>
            <ul className="navbar__links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;
