import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAccessToken } from "../services/spotify";
import "./Styles/AlbumView.css";

function AlbumView() {
    const { albumId } = useParams();
    const [album, setAlbum] = useState(null);
    const [tracks, setTracks] = useState([]);
    const [favoriteSongs, setFavoriteSongs] = useState(
        JSON.parse(localStorage.getItem("favoriteSongs")) || []
    );

    useEffect(() => {
        const fetchAlbumDetails = async () => {
            try {
                const token = await getAccessToken();
                const albumRes = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!albumRes.ok) {
                    console.error("Error fetching album details:", albumRes.statusText);
                    return;
                }

                const albumData = await albumRes.json();
                console.log("Album data:", albumData);
                setAlbum(albumData);
                setTracks(albumData.tracks.items);
            } catch (error) {
                console.error("Error fetching album details:", error);
            }
        };

        fetchAlbumDetails();
    }, [albumId]);

    const toggleFavoriteSong = (song) => {
        if (!album) {
            console.error("El álbum no está cargado. No se puede guardar la canción como favorita.");
            return;
        }

        const isFavorite = favoriteSongs.some((fav) => fav.id === song.id);
        const updatedFavorites = isFavorite
            ? favoriteSongs.filter((fav) => fav.id !== song.id)
            : [...favoriteSongs, { ...song, albumId: album.id }];

        setFavoriteSongs(updatedFavorites);
        localStorage.setItem("favoriteSongs", JSON.stringify(updatedFavorites));
    };

    if (!album) return <p>Loading...</p>;

    return (
        <div className="album-view">
            <div className="album-view__header">
                <img
                    className="album-view__image"
                    src={album.images?.[0]?.url || "https://via.placeholder.com/150"}
                    alt={album.name}
                />
                <h1 className="album-view__name">{album.name}</h1>
                <p className="album-view__artist">{album.artists[0]?.name}</p>
                <button className="back-button" onClick={() => window.history.back()}>Volver</button>
            </div>
            <ul className="album-view__tracks-list">
                {tracks.map((track) => (
                    <li key={track.id} className="album-view__track-item">
                        <div className="album-view__track-info">
                            <span className="favorites-item__icon">🔊</span>
                            <p className="album-view__track-name">{track.name}</p>
                        </div>
                        <div className="left">
                        <p className="album-view__track-duration">
                            {Math.floor(track.duration_ms / 60000)}:
                            {((track.duration_ms % 60000) / 1000).toFixed(0).padStart(2, "0")}
                        </p>
                        <button
                                onClick={() =>
                                    toggleFavoriteSong({
                                        id: track.id,
                                        name: track.name,   
                                        artist: album.artists[0]?.name,
                                        albumId: album.id,
                                    })
                                }
                                className={`favorite-heart-button ${
                                    favoriteSongs.some((fav) => fav.id === track.id) ? "favorited" : ""
                                }`}
                            >
                                <span className="material-icons">
                                    {favoriteSongs.some((fav) => fav.id === track.id) ? "favorite" : "favorite_border"}
                                </span>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AlbumView;