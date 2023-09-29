import React, { useState, useEffect } from 'react';
import { EditWaiterForm } from './EditForm';
import { WaitersList } from './WaitersList';
import { WaitersApi } from '../api/server';

export function Waiters() {
    const [waitersList, setWaitersList] = useState([]);

    useEffect(() => {
        WaitersApi.getList().then((data) => setWaitersList(data));
    }, []);

    const onWaiterSubmit = (waiter) => {
        WaitersApi.create(waiter).then((newWaiter) => {
            setWaitersList([...waitersList, newWaiter]);
        });
    };

    return (
        <>
            <EditWaiterForm onWaiterSubmit={onWaiterSubmit} />
            <WaitersList waiters={waitersList} />
        </>
    );
}