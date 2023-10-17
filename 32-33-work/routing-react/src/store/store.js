import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import usersReducer from '../reducer/users';
import albumsReducer from '../reducer/albums';
import photosReducer from '../reducer/photos';

const rootReducer = combineReducers({
    users: usersReducer,
    albums: albumsReducer,
    photos: photosReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;