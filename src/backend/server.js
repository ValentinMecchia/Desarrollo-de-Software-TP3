import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import { Buffer } from "buffer";

const app = express();
app.use(cors()); // Permitir solicitudes desde cualquier origen

const client_id = "91c292a75cb841cf90fc6fcedf781783"; // Proporcionado por Spotify
const client_secret = "267c075923c84f70bb2ef8bb2b868500"; // Proporcionado por Spotify

app.get("/api/token", async (req, res) => {
    console.log("Solicitud recibida en /api/token");
    try {
        const credentials = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
        console.log("Enviando solicitud a Spotify para obtener el token...");
        console.log("Credenciales codificadas en base64:", credentials);

        const response = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                "Authorization": `Basic ${credentials}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: "grant_type=client_credentials",
        });

        console.log(`Estado de la respuesta de Spotify: ${response.status}`);
        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error en la respuesta de Spotify:", errorData);
            throw new Error("Error al obtener el token de Spotify");
        }

        const data = await response.json();
        console.log("Token recibido correctamente:", data.access_token);

        if (!data.access_token) {
            throw new Error("Token no recibido en la respuesta de Spotify");
        }

        res.json(data);
    } catch (err) {
        console.error("Error al procesar la solicitud:", err.message);
        console.error("Detalles del error:", err);
        res.status(500).json({ error: "Error al obtener el token de Spotify", details: err.message });
    }
});

app.listen(3001, () => {
    console.log("Servidor corriendo en http://localhost:3001");
});
