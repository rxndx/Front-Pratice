import { GET_ALBUMS, GET_PHOTOS, GET_USERS } from './types';
import { getAlbumsByUserId, getPhotosByAlbumId, getUsers } from '../api/api';

export const fetchUsers = () => async (dispatch) => {
    try {
        const data = await getUsers();
        dispatch({ type: GET_USERS, payload: data });
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};

export const fetchAlbumsByUserId = (userId) => async (dispatch) => {
    try {
        const data = await getAlbumsByUserId(userId);
        dispatch({ type: GET_ALBUMS, payload: data });
    } catch (error) {
        console.error('Error fetching albums:', error);
    }
};

export const fetchPhotosByAlbumId = (albumId) => async (dispatch) => {
    try {
        const data = await getPhotosByAlbumId(albumId);
        dispatch({ type: GET_PHOTOS, payload: data });
    } catch (error) {
        console.error('Error fetching photos:', error);
    }
};

