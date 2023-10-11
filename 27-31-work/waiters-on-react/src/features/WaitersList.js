import React from 'react';
import { WaitersItem } from './WaitersItem';

export function WaitersList({ waiters, onDelete, onEdit }) {
    return (
        <table>
            <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {waiters.map((waiter) => (
                <WaitersItem
                    key={waiter.id}
                    waiter={waiter}
                    onDelete={onDelete}
                    onEdit={onEdit}
                />
            ))}
            </tbody>
        </table>
    );
}