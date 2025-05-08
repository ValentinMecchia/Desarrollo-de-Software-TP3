import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchView from "./views/SearchView";
import ArtistDetailView from "./views/ArtistDetailView";
import AlbumView from "./views/AlbumView";
import AboutView from "./views/AboutView";
import FavoritesView from "./views/FavoritesView"; // Import the updated view
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
    return (
        <Router className="app">
            <Navbar className="navbar" />
            <div className="app__content">
                <Routes>
                    <Route path="/" element={<SearchView />} />
                    <Route path="/artist/:id" element={<ArtistDetailView />} />
                    <Route path="/album/:albumId" element={<AlbumView />} />
                    <Route path="/favorites" element={<FavoritesView />} />
                    <Route path="/about" element={<AboutView />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
