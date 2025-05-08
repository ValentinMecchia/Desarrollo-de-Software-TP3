import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchView from "./views/SearchView";
import ArtistDetailView from "./views/ArtistDetailView";
import AlbumView from "./views/AlbumView";
import AboutView from "./views/AboutView";
import FavoritesView from "./views/FavoritesView";
import Navbar from "./components/Navbar";
import { getAccessToken } from "./services/spotify";
import "./App.css";

function App() {
    const [token, setToken] = useState(null);

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const fetchedToken = await getAccessToken();
                setToken(fetchedToken);
            } catch (error) {
                console.error("Error al obtener el token:", error);
            }
        };
        fetchToken();
    }, []);

    if (!token) {
        return <div>Loading...</div>;
    }

    return (
        <Router className="app">
            <Navbar className="navbar" />
            <div className="app__content">
                <Routes>
                    <Route path="/" element={<SearchView token={token} />} />
                    <Route path="/artist/:id" element={<ArtistDetailView token={token} />} />
                    <Route path="/album/:albumId" element={<AlbumView token={token} />} />
                    <Route path="/favorites" element={<FavoritesView token={token} />} />
                    <Route path="/about" element={<AboutView />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
