import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchPhotosByAlbumId } from "../store/actions";
import {Card, Col, Image, Layout, Menu, Row, Typography} from "antd";

import '../css/PhotoList.css';

const { Title } = Typography;
const { Header, Content } = Layout;

function PhotoList() {
    const { albumId } = useParams();
    const dispatch = useDispatch();
    const albumPhotos = useSelector((state) => state.photos);

    useEffect(() => {
        dispatch(fetchPhotosByAlbumId(albumId));
    }, [dispatch, albumId]);

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
                <div className="photo-list-container">
                    <Title level={2}>Фотографії альбому {albumId}</Title>
                    <Row gutter={[16, 16]}>
                        {albumPhotos.map((photo) => (
                            <Col key={photo.id} xs={24} sm={12} md={8} lg={6}>
                                <Card
                                    hoverable
                                    cover={<Image src={photo.thumbnailUrl} alt={photo.title} />}
                                >
                                    <Card.Meta title={photo.title} />
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
                );
            </Content>
        </Layout>
    );
}

export default PhotoList;