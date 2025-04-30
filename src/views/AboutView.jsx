import React from "react";
import "./Styles/AboutView.css"; // Importa los estilos

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
        </div>
    );
}

export default AboutView;
