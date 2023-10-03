import { WaitersApi } from "../api/server";

export const ADD_WAITER = 'ADD_WAITER';
export const EDIT_WAITER = 'EDIT_WAITER';
export const REMOVE_WAITER = 'REMOVE_WAITER';

export const addWaiter = (waiter) => ({
    type: ADD_WAITER,
    payload: waiter,
});

export const editWaiter = (id, data) => ({
    type: EDIT_WAITER,
    payload: { id, data },
});

export const removeWaiter = (id) => ({
    type: REMOVE_WAITER,
    payload: id,
});

export const createWaiterAsync = (waiter) => {
    return async (dispatch) => {
        const newWaiter = await WaitersApi.create(waiter);
        dispatch(addWaiter(newWaiter));
    };
};

export const updateWaiterAsync = (id, data) => {
    return async (dispatch) => {
        const updatedWaiter = await WaitersApi.update(id, data);
        dispatch(editWaiter(id, updatedWaiter));
    };
};

export const deleteWaiterAsync = (id) => {
    return async (dispatch) => {
        await WaitersApi.delete(id);
        dispatch(removeWaiter(id));
    };
};
