// spotify.js
const client_id = "91c292a75cb841cf90fc6fcedf781783";
const client_secret = "267c075923c84f70bb2ef8bb2b868500";

// Función para obtener el token de acceso
export async function getAccessToken() {
    const credentials = btoa(`${client_id}:${client_secret}`);
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${credentials}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'grant_type=client_credentials',
    });

    if (!response.ok) {
        console.error('Error al obtener el token:', response.status, response.statusText);
        throw new Error('No se pudo obtener el token de acceso.');
    }

    const data = await response.json();
    console.log('Access token obtenido:', data.access_token);
    return data.access_token;
}

// Función para buscar artistas
export const searchArtists = async (query, token) => {
    const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=artist`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await response.json();
    console.log('Respuesta de la API:', data);
    return data.artists?.items || [];
};

// Función para obtener los detalles de un álbum
export const fetchAlbumTracks = async (albumId, token) => {
    const response = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        console.error('Error al obtener los detalles del álbum:', response.statusText);
        return null;
    }

    const data = await response.json();
    console.log('Datos del álbum:', data);
    return data.tracks.items;
};
