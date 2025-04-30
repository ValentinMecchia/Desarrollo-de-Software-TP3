import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchView from "./views/SearchView";
import ArtistDetailView from "./views/ArtistDetailView";
import AboutView from "./views/AboutView"; // Importa la vista About

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SearchView />} />
                <Route path="/artist/:id" element={<ArtistDetailView />} />
                <Route path="/about" element={<AboutView />} /> {/* Nueva ruta */}
            </Routes>
        </Router>
    );
}

export default App;
