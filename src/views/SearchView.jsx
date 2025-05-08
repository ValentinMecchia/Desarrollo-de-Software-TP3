import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import { getAccessToken, searchArtists } from "../services/spotify";
import { Link } from "react-router-dom";
import "./Styles/SearchView.css";

function SearchView() {
    const [artists, setArtists] = useState([]);
    const [songs, setSongs] = useState([]);
    const [error, setError] = useState(null);

    const handleSearch = async (query) => {
        try {
            setError(null);
            const token = await getAccessToken();
            const results = await searchArtists(query, token);
            console.log("Artists data:", results);
            setArtists(results.filter((artist) => artist.name));

            const mockSongs = results.map((artist, index) => ({
                id: `song-${index}`,
                name: `Song ${index + 1} by ${artist.name}`,
                artist: artist.name,
            }));
            setSongs(mockSongs);

            localStorage.setItem("searchedArtists", JSON.stringify(results));
        } catch (e) {
            console.error("Error fetching artists:", e);
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
                                            src={artist.images?.[0]?.url || "https://via.placeholder.com/150"}
                                            alt={artist.name}
                                        />
                                        <p className="artist-list__name">{artist.name}</p>
                                    </Link>
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default SearchView;