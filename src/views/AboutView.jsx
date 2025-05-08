import React from "react";
import "./Styles/AboutView.css";

function AboutView() {
    return (
        <div className="about-view">
            <h1>About Echofy</h1>
            <p>
                Echofy es una aplicación que te permite buscar tus artistas favoritos y explorar sus álbumes.
                Utilizamos la API de Spotify para ofrecerte información actualizada y precisa.
            </p>
            <p>
                Este proyecto fue desarrollado como parte de un trabajo práctico para la materia
                Desarrollo de Software. ¡Esperamos que lo disfrutes!
            </p>
            <div className="about-buttons">
                <a href="/">Ir a la búsqueda</a>
                <a href="https://developer.spotify.com/documentation/web-api/" target="_blank" rel="noopener noreferrer">
                    Conoce más sobre la API de Spotify
                </a>
            </div>
        </div>
    );
}

export default AboutView;
