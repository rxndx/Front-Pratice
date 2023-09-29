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
