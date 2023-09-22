import React from 'react';

export function WaitersItem({ waiter }) {
    return (
        <tr>
            <td>{waiter.id}</td>
            <td>{waiter.firstName}</td>
            <td>{waiter.phone}</td>
        </tr>
    );
}