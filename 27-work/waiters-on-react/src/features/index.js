import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { WaitersApi } from '../api/server';
import {
    createWaiterAsync,
    updateWaiterAsync,
    deleteWaiterAsync, addWaiter,
} from '../store/waitersAction';
import { EditWaiterForm } from './EditForm';
import { WaitersList } from './WaitersList';

export function Waiters() {
    const dispatch = useDispatch();
    const waitersList = useSelector((state) => state.waiters.waitersList);

    useEffect(() => {
        const loadWaiters = () => {
            WaitersApi.getList().then((data) => {
                data.forEach((waiter) => dispatch(addWaiter(waiter)));
            });
        };

        loadWaiters();
    }, [dispatch]);

    const createWaiter = (waiter) => {
        dispatch(createWaiterAsync(waiter));
    };

    const updateWaiter = (id, data) => {
        dispatch(updateWaiterAsync(id, data));
    };

    const deleteWaiter = (id) => {
        dispatch(deleteWaiterAsync(id));
    };

    return (
        <>
            <EditWaiterForm onWaiterSubmit={createWaiter} />
            <WaitersList
                waiters={waitersList}
                onDelete={deleteWaiter}
                onEdit={updateWaiter}
            />
        </>
    );
}