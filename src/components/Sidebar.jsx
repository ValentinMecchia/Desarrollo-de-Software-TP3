import React from "react";
import { useFavorites } from "../context/FavoritesContext";
import "./Styles/Sidebar.css";

function Sidebar() {
    const {
        favoriteArtists,
        favoriteSongs,
        removeArtistFromFavorites,
        removeSongFromFavorites,
    } = useFavorites();

    return (
        <div className="sidebar">
            <h3>Artistas Favoritos</h3>
            <ul>
                {favoriteArtists.map((artist) => (
                    <li key={artist.id}>
                        <span>{artist.name}</span>
                        <button onClick={() => removeArtistFromFavorites(artist)}>Quitar</button>
                    </li>
                ))}
            </ul>
            <h3>Canciones Favoritas</h3>
            <ul>
                {favoriteSongs.map((song) => (
                    <li key={song.id}>
                        <span>{song.name}</span>
                        <button onClick={() => removeSongFromFavorites(song)}>Quitar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Sidebar;
