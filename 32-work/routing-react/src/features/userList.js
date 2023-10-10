import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../store/actions';
import { Link } from 'react-router-dom';

import '../css/UserList.css'

function UserList() {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    return (
        <div className="user-list-container">
            <h1 className="user-list-title">Список користувачів</h1>
            <ul className="user-list">
                {users.map((user) => (
                    <li key={user.id}>
                        {user.name}{' '}
                        <Link to={`/albums/${user.id}`} className="button">
                            Album
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UserList;
