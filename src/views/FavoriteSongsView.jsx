import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const FavoriteSongsView = () => {
    const [favoriteSongs, setFavoriteSongs] = useState([]);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem("favoriteSongs")) || [];
        setFavoriteSongs(storedFavorites);
    }, []);

    return (
        <div className="favorite-songs">
            <h1>Canciones Favoritas</h1>
            <ul>
                {favoriteSongs.map((song, index) => (
                    <li key={index}>
                        <p>{song.name}</p>
                        <p>Artista: {song.artistName}</p>
                        <p>Álbum: {song.albumName}</p>
                        <Link to={`/album/${song.albumId}`}>Ver Álbum</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FavoriteSongsView;
