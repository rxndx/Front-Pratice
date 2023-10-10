import { GET_ALBUMS } from '../store/types';

const initialState = [];

const albumsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALBUMS:
            return action.payload;
        default:
            return state;
    }
};

export default albumsReducer;