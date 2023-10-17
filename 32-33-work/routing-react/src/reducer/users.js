import { GET_USERS } from '../store/types';

const initialState = [];

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USERS:
            return action.payload;
        default:
            return state;
    }
};

export default usersReducer;