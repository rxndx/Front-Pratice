import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchAlbumsByUserId } from "../store/actions";

import '../css/AlbumList.css';

function AlbumList() {
    const dispatch = useDispatch();
    const albums = useSelector((state) => state.albums);
    const { userId } = useParams();

    useEffect(() => {
        dispatch(fetchAlbumsByUserId(userId));
    }, [dispatch, userId]);

    return (
        <div className="album-list-container">
            <h1 className="album-list-title">Список альбомів користувача {userId}</h1>
            <ul className="album-list">
                {albums.map((album) => (
                    <li key={album.id}>
                        {album.title}{' '}
                        <Link to={`/photos/${album.id}`} className="album-link">
                            Photos
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AlbumList;