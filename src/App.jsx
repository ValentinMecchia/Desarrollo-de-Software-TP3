import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchView from "./views/SearchView";
import ArtistDetailView from "./views/ArtistDetailView";
import AlbumView from "./views/AlbumView";
import AboutView from "./views/AboutView";
import FavoriteSongsView from "./views/FavoriteSongsView";
import Navbar from "./components/Navbar";
import FavoriteArtistsSidebar from "./components/FavoriteArtistsSidebar"; // Nuevo componente
import "./App.css";

function App() {
    return (
        <Router className="app">
            <Navbar className="navbar" />
            <div className="app__content">
                <div className="app__main">
                    <Routes>
                        <Route path="/" element={<SearchView />} />
                        <Route path="/artist/:id" element={<ArtistDetailView />} />
                        <Route path="/album/:albumId" element={<AlbumView />} />
                        <Route path="/favorite-songs" element={<FavoriteSongsView />} />
                        <Route path="/about" element={<AboutView />} />
                    </Routes>
                </div>
                <FavoriteArtistsSidebar /> {/* Ventana de artistas favoritos */}
            </div>
        </Router>
    );
}

export default App;
