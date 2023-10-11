import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {  useParams} from 'react-router-dom';
import { fetchPhotosByAlbumId } from "../store/actions";

import '../css/PhotoList.css';

function PhotoList() {
    const { albumId } = useParams();
    const dispatch = useDispatch();
    const albumPhotos = useSelector((state) => state.photos);

    useEffect(() => {
        dispatch(fetchPhotosByAlbumId(albumId));
    }, [dispatch, albumId]);

    return (
        <div className="photo-list-container">
            <h1 className="photo-list-title">Фотографії альбому {albumId}</h1>
            <ul className="photo-list">
                {albumPhotos && albumPhotos.length > 0 ? (
                    albumPhotos.map((photo) => (
                        <li key={photo.id}>
                            <img src={photo.thumbnailUrl} alt={photo.title} />
                            <p>{photo.title}</p>
                        </li>
                    ))
                ) : (
                    <p>Фотографії не завантажені або відсутні.</p>
                )}
            </ul>
        </div>
    );
}

export default PhotoList;