import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Styles/FavoriteArtistsSidebar.css"; // Importa el archivo CSS

const FavoriteArtistsSidebar = () => {
    const [favoriteArtists, setFavoriteArtists] = useState([]);
    const [isOpen, setIsOpen] = useState(false); // Estado para controlar si el sidebar está visible

    useEffect(() => {
        const updateFavorites = () => {
            const storedFavorites = JSON.parse(localStorage.getItem("favoriteArtists")) || [];
            setFavoriteArtists(storedFavorites);
        };

        // Actualiza la lista de favoritos al cargar y cuando cambie el localStorage
        updateFavorites();
        window.addEventListener("storage", updateFavorites);

        return () => {
            window.removeEventListener("storage", updateFavorites);
        };
    }, []);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <button className="toggle-button" onClick={toggleSidebar}>
                {isOpen ? "➖" : "➕"}
            </button>
            <div className={`favorite-artists-sidebar ${isOpen ? "open" : "closed"}`}>
                <div className="favorite-artists-content">
                    <h3>Artistas Favoritos</h3>
                    <ul>
                        {favoriteArtists.length > 0 ? (
                            favoriteArtists.map((artist) => (
                                <li key={artist.id}>
                                    <Link to={`/artist/${artist.id}`}>{artist.name}</Link>
                                </li>
                            ))
                        ) : (
                            <p className="no-favorites">No tienes artistas favoritos.</p>
                        )}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default FavoriteArtistsSidebar;
