import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAccessToken } from "../services/spotify";
import "./Styles/ArtistDetailView.css"; // Importa los estilos

function ArtistDetailView() {
    const { id } = useParams();
    const [artist, setArtist] = useState(null);
    const [albums, setAlbums] = useState([]);
    const [error, setError] = useState(null);

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
            } catch (err) {
                setError("Error al cargar los detalles del artista.");
            }
        };

        fetchArtistDetails();
    }, [id]);

    if (error) return <p className="error">{error}</p>;
    if (!artist) return <p className="loading">Cargando...</p>;

    return (
        <div className="artist-detail">
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
                        <img
                            className="artist-detail__album-image"
                            src={album.images[0]?.url}
                            alt={album.name}
                            width="50"
                        />
                        <p className="artist-detail__album-name">
                            {album.name} ({new Date(album.release_date).getFullYear()})
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ArtistDetailView;
