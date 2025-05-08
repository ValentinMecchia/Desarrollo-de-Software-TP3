import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Styles/FavoritesView.css";

function FavoritesView() {
    const [favoriteArtists, setFavoriteArtists] = useState(
        JSON.parse(localStorage.getItem("favoriteArtists")) || []
    );
    const [favoriteSongs, setFavoriteSongs] = useState(
        JSON.parse(localStorage.getItem("favoriteSongs")) || []
    );
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Canciones favoritas:", favoriteSongs); // Línea de depuración para inspeccionar canciones favoritas
    }, [favoriteSongs]);

    const removeFavoriteArtist = (artistId) => {
        const updatedFavorites = favoriteArtists.filter((artist) => artist.id !== artistId);
        setFavoriteArtists(updatedFavorites);
        localStorage.setItem("favoriteArtists", JSON.stringify(updatedFavorites));
    };

    const removeFavoriteSong = (songId) => {
        const updatedFavorites = favoriteSongs.filter((song) => song.id !== songId);
        setFavoriteSongs(updatedFavorites);
        localStorage.setItem("favoriteSongs", JSON.stringify(updatedFavorites));
    };

    const handleSongClick = (albumId) => {
        if (!albumId) {
            console.error("El albumId es undefined. No se puede navegar al álbum.");
            alert("No se puede navegar al álbum porque falta el ID del álbum.");
            return;
        }
        console.log("Navegando al álbum con albumId:", albumId); // Línea de depuración
        navigate(`/album/${albumId}`);
    };

    return (
        <>
            <h2 className="title">Favoritos</h2>
            <div className="favorites-view">
                <div className="favorites-box">
                    <h2>Artistas Favoritos</h2>
                    {favoriteArtists.length === 0 ? (
                        <p>No favorite artists.</p>
                    ) : (
                        <div className="favorites-grid">
                            {favoriteArtists.map((artist) => (
                                <div key={artist.id} className="favorites-item favorites-item-artist">
                                    <Link to={`/artist/${artist.id}`} className="favorites-item__link">
                                        <img
                                            src={artist.images?.[0]?.url || "https://via.placeholder.com/150"}
                                            alt={artist.name || "Unknown Artist"}
                                            className="favorites-item__image"
                                        />
                                        <p className="favorites-item__name">{artist.name || "Unknown Artist"}</p>
                                    </Link>
                                    <button
                                        className="remove-button"
                                        onClick={() => removeFavoriteArtist(artist.id)}
                                    >
                                        🗑️
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="favorites-box">
                    <h2>Canciones Favoritas</h2>
                    {favoriteSongs.length === 0 ? (
                        <p>No favorite songs.</p>
                    ) : (
                        <div className="favorites-grid favorites-grid-songs">
                            {favoriteSongs.map((song) => (
                                <div
                                    key={song.id}
                                    className="favorites-item favorite-item-song"
                                    onClick={() => handleSongClick(song.albumId)} // Redirigir al álbum correspondiente
                                    style={{ cursor: "pointer" }}
                                >
                                    <div className="favorites-item__content">
                                        <span className="favorites-item__icon">🔊</span>
                                        <p className="favorites-item__name">{song.name}</p>
                                    </div>
                                    <div className="left">
                                        <p className="favorites-item__artist">{song.artist}</p>
                                        <button
                                            className="remove-button"
                                            onClick={(e) => {
                                                e.stopPropagation(); // Evitar la navegación al eliminar
                                                removeFavoriteSong(song.id);
                                            }}
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default FavoritesView;
