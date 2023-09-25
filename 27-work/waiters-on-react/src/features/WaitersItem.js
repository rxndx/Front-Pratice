import React, { useState } from 'react';

export function WaitersItem({ waiter, onEdit, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedWaiter, setEditedWaiter] = useState(waiter);
    const [error, setError] = useState('');

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setError('');
    };

    const handleSaveClick = () => {
        if (!editedWaiter.firstName || !editedWaiter.phone) {
            setError('Please fill in all fields.');
            return;
        }

        onEdit(editedWaiter.id, editedWaiter);
        setIsEditing(false);
        setError('');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedWaiter({
            ...editedWaiter,
            [name]: value,
        });
    };

    return (
        <tr>
            <td>{waiter.id}</td>
            <td>
                {isEditing ? (
                    <input
                        type="text"
                        name="firstName"
                        value={editedWaiter.firstName}
                        onChange={handleInputChange}
                    />
                ) : (
                    waiter.firstName
                )}
            </td>
            <td>
                {isEditing ? (
                    <input
                        type="text"
                        name="phone"
                        value={editedWaiter.phone}
                        onChange={handleInputChange}
                    />
                ) : (
                    waiter.phone
                )}
            </td>
            <td>
                {error && <div className="error">{error}</div>}
                {isEditing ? (
                    <>
                        <button onClick={handleSaveClick}>Save</button>
                        <button onClick={handleCancelClick}>Cancel</button>
                    </>
                ) : (
                    <>
                        <button onClick={handleEditClick}>Edit</button>
                        <button onClick={() => onDelete(waiter.id)}>Delete</button>
                    </>
                )}
            </td>
        </tr>
    );
}