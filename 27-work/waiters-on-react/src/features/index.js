import React from 'react';
import { EditWaiterForm } from './EditForm';
import { WaitersList } from './WaitersList';
import { useWaiters } from './useWaiters';

export function Waiters() {
    const { waitersList, createWaiter, updateWaiter, deleteWaiter } = useWaiters();

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