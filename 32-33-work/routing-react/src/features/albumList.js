import React, { useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchAlbumsByUserId } from "../store/actions";
import { List, Button, Typography, Layout, Menu } from 'antd';

import '../css/AlbumList.css';

const { Title } = Typography;
const { Header, Content } = Layout;

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
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark">
                    <Menu.Item key="users">
                        <Link to="/users">Пользователи</Link>
                    </Menu.Item>
                </Menu>
            </Header>
            <Content style={{ padding: '50px' }}>
                <div className="album-list-container">
                    <Title level={2}>Список альбомов користувача {userId}</Title>
                    {selectedAlbum && (
                        <h2>Вибраний альбом: {selectedAlbum}</h2>
                    )}
                    <List
                        dataSource={albums}
                        renderItem={(album) => (
                            <List.Item>
                                <div className="album-item">
                                    <Title level={4}>{album.title}</Title>
                                    <Link
                                        to={`/albums/${userId}/${album.id}?albumId=${album.id}`}
                                        className="album-link"
                                    >
                                        <Button type="primary">Фотографии</Button>
                                    </Link>
                                </div>
                            </List.Item>
                        )}
                    />
                </div>
            </Content>
        </Layout>
    );
}

export default AlbumList;