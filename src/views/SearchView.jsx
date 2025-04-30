import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import Navbar from "../components/Navbar";
import { getAccessToken, searchArtists } from "../services/spotify";
import { Link } from "react-router-dom";
import "./Styles/SearchView.css";

function SearchView() {
    const [artists, setArtists] = useState([]);
    const [error, setError] = useState(null);

    const handleSearch = async (query) => {
        try {
            setError(null);
            const token = await getAccessToken();
            const results = await searchArtists(query, token);
            setArtists(results);
        } catch (e) {
            setError("Error al buscar artistas.");
        }
    };

    return (
        <div className="search-view">
            <div className="search-view__content">
                <img
                    className="search-view__logo"
                    src="../assets/logo.png"
                    alt="Echofy Logo"
                />
                <h1 className="search-view__title">Echofy</h1>
                <SearchBar onSearch={handleSearch} />
                {error && <p className="search-view__error">{error}</p>}
                <ul className="artist-list">
                    {artists.map((artist) => (
                        <li key={artist.id} className="artist-list__item">
                            <Link to={`/artist/${artist.id}`} className="artist-list__link">
                                <img
                                    className="artist-list__image"
                                    src={artist.images[0]?.url}
                                    alt={artist.name}
                                />
                                <p className="artist-list__name">{artist.name}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default SearchView;
