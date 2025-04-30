import React from "react";  
import "./Styles/BackButton.css"; 
function BackButton({ onBack }) {
    return (
        <button className="back-button" onClick={onBack}>
            Volver
        </button>
    );
}
export default BackButton;