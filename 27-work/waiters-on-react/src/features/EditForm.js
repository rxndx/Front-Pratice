import React, { useState } from 'react';

export function EditWaiterForm({ onWaiterSubmit }) {
    const [firstName, setFirstName] = useState('');
    const [phone, setPhone] = useState('');

    const onSubmit = (event) => {
        event.preventDefault();

        const newWaiter = {
            firstName,
            phone,
        };

        onWaiterSubmit(newWaiter);

        setFirstName('');
        setPhone('');
    };

    return (
        <form onSubmit={onSubmit}>
            <label htmlFor="firstName">First Name</label>
            <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
            />

            <label htmlFor="phone">Phone</label>
            <input
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
            />

            <button type="submit">Add Waiter</button>
        </form>
    );
}