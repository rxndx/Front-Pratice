import { GET_PHOTOS } from '../store/types';

const initialState = [];

const photosReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PHOTOS:
            return action.payload;
        default:
            return state;
    }
};

export default photosReducer;
