import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import Navbar from "../components/Navbar";
import { getAccessToken, searchArtists } from "../services/spotify";
import { Link } from "react-router-dom";
import "./Styles/SearchView.css";

function SearchView() {
    const [artists, setArtists] = useState([]);
    const [error, setError] = useState(null);
    const [favoriteArtists, setFavoriteArtists] = useState([]);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem("favoriteArtists")) || [];
        setFavoriteArtists(storedFavorites);
    }, []);

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
            <div className="search-view__main">
                <div className="search-view__content">
                    <img
                        className="search-view__logo"
                        src="../assets/logo.png"
                        alt="Echofy Logo"
                    />
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
            <div className="search-view__favorites">
                <h3>Artistas Favoritos</h3>
                <ul>
                    {favoriteArtists.map((artist) => (
                        <li key={artist.id}>
                            <Link to={`/artist/${artist.id}`}>{artist.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default SearchView;
