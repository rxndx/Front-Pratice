import { ADD_WAITER, EDIT_WAITER, REMOVE_WAITER } from '../store/waitersAction';

const initialState = {
    waitersList: [],
};

const waitersReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_WAITER:
            return {
                ...state,
                waitersList: [...state.waitersList, action.payload],
            };
        case EDIT_WAITER:
            return {
                ...state,
                waitersList: state.waitersList.map((waiter) =>
                    waiter.id === action.payload.id ? { ...waiter, ...action.payload.data } : waiter
                ),
            };
        case REMOVE_WAITER:
            return {
                ...state,
                waitersList: state.waitersList.filter((waiter) => waiter.id !== action.payload),
            };
        default:
            return state;
    }
};

export default waitersReducer;