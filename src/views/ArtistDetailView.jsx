import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getAccessToken } from "../services/spotify";
import "./Styles/ArtistDetailView.css";
import { useNavigate } from "react-router-dom";

function ArtistDetailView() {
    const { id } = useParams();
    const [artist, setArtist] = useState(null);
    const [albums, setAlbums] = useState([]);
    const [error, setError] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchArtistDetails = async () => {
            try {
                setError(null);
                const token = await getAccessToken();

                const artistRes = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const artistData = await artistRes.json();
                setArtist(artistData);

                const albumsRes = await fetch(`https://api.spotify.com/v1/artists/${id}/albums`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const albumsData = await albumsRes.json();
                setAlbums(albumsData.items);

                const storedFavorites = JSON.parse(localStorage.getItem("favoriteArtists")) || [];
                setIsFavorite(storedFavorites.some((fav) => fav.id === id));
            } catch (err) {
                setError("Error al cargar los detalles del artista.");
            }
        };

        fetchArtistDetails();
    }, [id]);

    const toggleFavorite = () => {
        if (!artist) return;

        const storedFavorites = JSON.parse(localStorage.getItem("favoriteArtists")) || [];
        let updatedFavorites;

        if (isFavorite) {
            updatedFavorites = storedFavorites.filter((fav) => fav.id !== artist.id);
        } else {
            updatedFavorites = [...storedFavorites, artist];
        }

        localStorage.setItem("favoriteArtists", JSON.stringify(updatedFavorites));
        setIsFavorite(!isFavorite);
    };

    if (error) return <p className="error">{error}</p>;
    if (!artist) return <p className="loading">Cargando...</p>;

    return (
        <div className="artist-detail">
            <div className="artist-detail__top-bar">
                <button className="back-button" onClick={() => navigate(`/`)}>
                    Volver
                </button>
                <button
                    onClick={toggleFavorite}
                    className={`favorite-heart-button ${isFavorite ? "favorited" : ""}`}
                >
                    <span className="material-icons">
                        {isFavorite ? "favorite" : "favorite_border"}
                    </span>
                </button>
            </div>
            <h1 className="artist-detail__name">{artist.name}</h1>
            <img
                className="artist-detail__image"
                src={artist.images?.[0]?.url || "https://via.placeholder.com/150"}
                alt={artist.name}
                width="200"
            />
            <h2 className="artist-detail__albums-title">Álbumes</h2>
            <ul className="artist-detail__albums-list">
                {albums.map((album) => (
                    <li key={album.id} className="artist-detail__album-item">
                        <Link to={`/album/${album.id}`} className="artist-detail__album-link">
                            <img
                                className="artist-detail__album-image"
                                src={album.images?.[0]?.url || "https://via.placeholder.com/150"}
                                alt={album.name}
                                width="50"
                            />
                            <p className="artist-detail__album-name">
                                {album.name} ({new Date(album.release_date).getFullYear()})
                            </p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ArtistDetailView;
