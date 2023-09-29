import React from 'react';
import { WaitersItem } from './WaitersItem';

export function WaitersList({ waiters }) {
    return (
        <table>
            <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Phone</th>
            </tr>
            </thead>
            <tbody>
            {waiters.map((waiter) => (
                <WaitersItem key={waiter.id} waiter={waiter} />
            ))}
            </tbody>
        </table>
    );
}