import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import usersReducer from '../reducer/users';
import albumsReducer from '../reducer/albums';
import photosReducer from '../reducer/photos';

const store = configureStore({
    reducer: {
        users: usersReducer,
        albums: albumsReducer,
        photos: photosReducer,
    },
    middleware: [thunk],
});

export default store;