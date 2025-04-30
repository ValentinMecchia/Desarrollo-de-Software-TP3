import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchView from "./views/SearchView";
import ArtistDetailView from "./views/ArtistDetailView";
import AboutView from "./views/AboutView";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
    return (
        <Router className="app">
            <Navbar className="navbar"/>
            <Routes>
                <Route path="/" element={<SearchView />} />
                <Route path="/artist/:id" element={<ArtistDetailView />} />
                <Route path="/about" element={<AboutView />} />
            </Routes>
        </Router>
    );
}

export default App;
