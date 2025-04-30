import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Styles/AlbumView.css"; // Importa los estilos

const AlbumView = () => {
    const { albumId } = useParams();
    const navigate = useNavigate();
    const [albumDetails, setAlbumDetails] = useState(null);
    const [error, setError] = useState(null);
    const [favoriteSongs, setFavoriteSongs] = useState([]);

    const toggleFavorite = (track) => {
        const updatedFavorites = favoriteSongs.includes(track)
            ? favoriteSongs.filter((fav) => fav !== track)
            : [...favoriteSongs, track];
        setFavoriteSongs(updatedFavorites);
        localStorage.setItem("favoriteSongs", JSON.stringify(updatedFavorites));
    };

    useEffect(() => {
        const fetchAlbumDetails = async () => {
            try {
                setError(null);
                const response = await fetch(`http://localhost:3001/api/albums/${albumId}`);
                if (!response.ok) {
                    throw new Error("Error al obtener los detalles del álbum");
                }
                const data = await response.json();
                setAlbumDetails(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchAlbumDetails();
    }, [albumId]);

    if (error) return <p className="error">{error}</p>;
    if (!albumDetails) return <p className="loading">Cargando...</p>;

    return (
        <div className="album-view">
            <button onClick={() => navigate(`/artist/${albumDetails.artistId}`)} className="back-button">
                Volver al Artista
            </button>
            <div className="album-view__left">
                <img
                    src={albumDetails.imageUrl || "https://via.placeholder.com/300"}
                    alt={albumDetails.albumName}
                    className="album-view__image"
                />
                <h1 className="album-view__name">{albumDetails.albumName}</h1>
                <h2 className="album-view__artist">{albumDetails.artistName}</h2>
            </div>
            <div className="album-view__right">
                <h3 className="album-view__tracks-title">Canciones</h3>
                <ul className="album-view__tracks-list">
                    {albumDetails.tracks.map((track, index) => (
                        <li key={index} className="album-view__track-item">
                            <div className="album-view__track-info">
                                <p className="album-view__track-name">{track.name}</p>
                                <p className="album-view__track-duration">
                                    Duración: {(track.duration / 60000).toFixed(2)} minutos
                                </p>
                                <button
                                    onClick={() => toggleFavorite(track)}
                                    className={`favorite-button ${
                                        favoriteSongs.includes(track) ? "favorited" : ""
                                    }`}
                                >
                                    {favoriteSongs.includes(track) ? "Quitar de Favoritos" : "Agregar a Favoritos"}
                                </button>
                            </div>
                            {track.previewUrl && (
                                <audio controls className="album-view__track-audio">
                                    <source src={track.previewUrl} type="audio/mpeg" />
                                    Tu navegador no soporta el elemento de audio.
                                </audio>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AlbumView;