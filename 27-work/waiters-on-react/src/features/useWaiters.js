import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { WaitersApi } from '../api/server';
import { addWaiter, editWaiter, removeWaiter } from '../store/waitersAction';

export function useWaiters() {
    const dispatch = useDispatch();
    const waitersList = useSelector((state) => state.waitersList);

    useEffect(() => {
        const loadWaiters = () => {
            WaitersApi.getList().then((data) => {
                data.forEach((waiter) => dispatch(addWaiter(waiter)));
            });
        };

        loadWaiters();
    }, [dispatch]);

    const createWaiter = (waiter) => {
        return WaitersApi.create(waiter).then((newWaiter) => {
            dispatch(addWaiter(newWaiter));
        });
    };

    const updateWaiter = (id, data) => {
        return WaitersApi.update(id, data).then((updatedWaiter) => {
            dispatch(editWaiter(id, updatedWaiter));
        });
    };

    const deleteWaiter = (id) => {
        return WaitersApi.delete(id).then(() => {
            dispatch(removeWaiter(id));
        });
    };

    return {
        waitersList,
        createWaiter,
        updateWaiter,
        deleteWaiter,
    };
}