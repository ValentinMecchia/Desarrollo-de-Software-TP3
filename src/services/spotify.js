const API_BASE = "/api";

export async function getAccessToken() {
    try {
        const res = await fetch(`${API_BASE}/token`);
        if (!res.ok) {
            console.error("Error al obtener el token:", res.status, res.statusText);
            throw new Error("No se pudo obtener el token de acceso.");
        }
        const data = await res.json();
        console.log("Access token obtained:", data.access_token); // Debugging line
        return data.access_token;
    } catch (err) {
        console.error("Error en getAccessToken:", err.message);
        throw err;
    }
}

export const searchArtists = async (query, token) => {
    const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=artist`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await response.json();
    console.log("API Response:", data);
    return data.artists?.items || [];
};

export const fetchAlbumTracks = async (albumId, token) => {
    try {
        const response = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            console.error("Error fetching album tracks:", response.statusText);
            return null;
        }

        const data = await response.json();
        console.log("Album tracks data:", data);
        return data.tracks.items;
    } catch (error) {
        console.error("Error in fetchAlbumTracks:", error);
        return null;
    }
};
