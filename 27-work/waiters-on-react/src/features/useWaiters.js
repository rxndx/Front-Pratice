import { useState, useEffect } from 'react';
import { WaitersApi } from '../api/server';

export function useWaiters() {
    const [waitersList, setWaitersList] = useState([]);

    useEffect(() => {
        loadWaiters();
    }, []);

    const loadWaiters = () => {
        WaitersApi.getList().then((data) => setWaitersList(data));
    };

    const createWaiter = (waiter) => {
        return WaitersApi.create(waiter).then((newWaiter) => {
            setWaitersList((prevList) => [...prevList, newWaiter]);
        });
    };

    const updateWaiter = (id, data) => {
        return WaitersApi.update(id, data).then((updatedWaiter) => {
            setWaitersList((prevList) =>
                prevList.map((waiter) => (waiter.id === id ? updatedWaiter : waiter))
            );
        });
    };

    const deleteWaiter = (id) => {
        return WaitersApi.delete(id).then(() => {
            setWaitersList((prevList) =>
                prevList.filter((waiter) => waiter.id !== id)
            );
        });
    };

    return {
        waitersList,
        createWaiter,
        updateWaiter,
        deleteWaiter,
    };
}