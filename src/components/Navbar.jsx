import React, { useState } from "react";
import SearchBar from "./SearchBar";

function Navbar() {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (query) => {
        setSearchQuery(query);
        console.log("Searching for:", query); // Aquí puedes integrar la lógica de búsqueda con la API de Spotify
    };

    return (
        <nav className="navbar">
            <div className="navbar__logo">Echofy</div>
            <ul className="navbar__links">
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li>
                    <SearchBar onSearch={handleSearch} />
                </li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    );
}

export default Navbar;