const API_BASE = "/api";

export async function getAccessToken() {
    try {
        const res = await fetch(`${API_BASE}/token`);
        if (!res.ok) {
            console.error("Error al obtener el token:", res.status, res.statusText);
            throw new Error("No se pudo obtener el token de acceso.");
        }
        const data = await res.json();
        return data.access_token;
    } catch (err) {
        console.error("Error en getAccessToken:", err.message);
        throw err;
    }
}

export async function searchArtists(query, token) {
    try {
        const res = await fetch(
            `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=artist`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        if (!res.ok) {
            console.error("Error al buscar artistas:", res.status, res.statusText);
            throw new Error("No se pudo buscar artistas.");
        }
        const data = await res.json();
        return data.artists?.items || [];
    } catch (err) {
        console.error("Error en searchArtists:", err.message);
        throw err;
    }
}
