import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchPhotosByAlbumId } from "../store/actions";

import '../css/PhotoList.css';

function PhotoList() {
    const dispatch = useDispatch();
    const photos = useSelector((state) => state.photos);
    const { albumId } = useParams();

    useEffect(() => {
        dispatch(fetchPhotosByAlbumId(albumId));
    }, [dispatch, albumId]);

    return (
        <div className="photo-list-container">
            <h1 className="photo-list-title">Список фотографій альбому {albumId}</h1>
            <ul className="photo-list">
                {photos.map((photo) => (
                    <li key={photo.id}>
                        <img src={photo.thumbnailUrl} alt={photo.title} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PhotoList;