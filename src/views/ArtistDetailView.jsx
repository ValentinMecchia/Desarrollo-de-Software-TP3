import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getAccessToken } from "../services/spotify";
import "./Styles/ArtistDetailView.css"; // Importa los estilos
import BackButton from "../components/BackButton"; 

function ArtistDetailView() {
    const { id } = useParams();
    const [artist, setArtist] = useState(null);
    const [albums, setAlbums] = useState([]);
    const [error, setError] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const fetchArtistDetails = async () => {
            try {
                setError(null);
                const token = await getAccessToken();

                // Fetch artist details
                const artistRes = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const artistData = await artistRes.json();
                setArtist(artistData);

                // Fetch artist albums
                const albumsRes = await fetch(`https://api.spotify.com/v1/artists/${id}/albums`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const albumsData = await albumsRes.json();
                setAlbums(albumsData.items);

                // Check if artist is already a favorite
                const storedFavorites = JSON.parse(localStorage.getItem("favoriteArtists")) || [];
                setIsFavorite(storedFavorites.some((fav) => fav.id === id));
            } catch (err) {
                setError("Error al cargar los detalles del artista.");
            }
        };

        fetchArtistDetails();
    }, [id]);

    const toggleFavorite = () => {
        const storedFavorites = JSON.parse(localStorage.getItem("favoriteArtists")) || [];
        let updatedFavorites;

        if (isFavorite) {
            updatedFavorites = storedFavorites.filter((fav) => fav.id !== id);
        } else {
            updatedFavorites = [...storedFavorites, { id, name: artist.name }];
        }

        localStorage.setItem("favoriteArtists", JSON.stringify(updatedFavorites));
        setIsFavorite(!isFavorite);
    };

    if (error) return <p className="error">{error}</p>;
    if (!artist) return <p className="loading">Cargando...</p>;

    return (
        <div className="artist-detail">
            <BackButton onBack={() => window.history.back()} />
            <button onClick={toggleFavorite} className="favorite-button">
                {isFavorite ? "Quitar de Favoritos" : "Agregar a Favoritos"}
            </button>
            <h1 className="artist-detail__name">{artist.name}</h1>
            <img
                className="artist-detail__image"
                src={artist.images[0]?.url}
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
                                src={album.images[0]?.url}
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
