import { getUsers, getAlbumsByUserId, getPhotosByAlbumId } from '../api/api';
import { setUsers } from '../reducer/users';
import { setAlbums } from '../reducer/albums';
import { setPhotos } from '../reducer/photos';

export const fetchUsers = () => async (dispatch) => {
    try {
        const data = await getUsers();
        dispatch(setUsers(data));
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};

export const fetchAlbumsByUserId = (userId) => async (dispatch) => {
    try {
        const data = await getAlbumsByUserId(userId);
        dispatch(setAlbums(data));
    } catch (error) {
        console.error('Error fetching albums:', error);
    }
};

export const fetchPhotosByAlbumId = (albumId) => async (dispatch) => {
    try {
        const data = await getPhotosByAlbumId(albumId);
        dispatch(setPhotos(data));
    } catch (error) {
        console.error('Error fetching photos:', error);
    }
};