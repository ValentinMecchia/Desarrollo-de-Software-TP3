import React, { useState } from "react";
import "./Styles/SearchBar.css";

function SearchBar({ onSearch }) {
    const [query, setQuery] = useState("");

    const handleSearchClick = () => {
        if (query.trim()) {
            onSearch(query);
        }
    };

    return (
        <div className="search-bar">
            <input
                className="search-bar__input"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar artista"
            />
            <button className="search-bar__button" onClick={handleSearchClick}>
                Buscar
            </button>
        </div>
    );
}

export default SearchBar;
