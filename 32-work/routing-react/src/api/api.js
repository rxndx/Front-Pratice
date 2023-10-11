export const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const getUsers = () => {
    return fetch(`${API_BASE_URL}/users`).then((response) => response.json());
};

export const getAlbumsByUserId = (userId) => {
    return fetch(`${API_BASE_URL}/albums?userId=${userId}`).then((response) =>
        response.json()
    );
};

export const getPhotosByAlbumId = (albumId) => {
    return fetch(`${API_BASE_URL}/photos?albumId=${albumId}`).then((response) =>
        response.json()
    );
};