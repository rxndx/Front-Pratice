import React, { useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchAlbumsByUserId } from "../store/actions";

import '../css/AlbumList.css';

function AlbumList() {
    const dispatch = useDispatch();
    const albums = useSelector((state) => state.albums);
    const { userId } = useParams();
    const location = useLocation();
    const selectedAlbum = new URLSearchParams(location.search).get('albumId');

    useEffect(() => {
        dispatch(fetchAlbumsByUserId(userId));
    }, [dispatch, userId]);

    return (
        <div className="album-list-container">
            <h1 className="album-list-title">Список альбомів користувача {userId}</h1>
            {selectedAlbum && (
                <h2>Вибраний альбом: {selectedAlbum}</h2>
            )}
            <ul className="album-list">
                {albums && albums.length > 0 ? (
                    albums.map((album) => (
                        <li key={album.id}>
                            {album.title}{' '}
                            <Link
                                to={`/albums/${userId}/${album.id}?albumId=${album.id}`}
                                className="album-link"
                            >
                                Photos
                            </Link>
                        </li>
                    ))
                ) : (
                    <p>Альбоми не завантажені або відсутні.</p>
                )}
            </ul>
        </div>
    );
}

export default AlbumList;