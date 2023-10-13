import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../store/actions';
import { Link } from 'react-router-dom';
import { Card, Layout, List, Menu } from "antd";

import '../css/UserList.css'

const { Header, Content } = Layout;

function UserList() {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    return (
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark">
                    <Menu.Item key="home">
                        <Link to="/">На главную</Link>
                    </Menu.Item>
                </Menu>
            </Header>
            <Content style={{ padding: '50px' }}>
                <h1>Список пользователей</h1>
                <div className="user-list-container">
                    <List
                        grid={{ gutter: 16, column: 3 }}
                        dataSource={users}
                        renderItem={(user) => (
                            <List.Item>
                                <Card title={user.name} extra={<Link to={`/albums/${user.id}`}>Albums</Link>}>
                                </Card>
                            </List.Item>
                        )}
                    />
                </div>
            </Content>
        </Layout>
    );
}

export default UserList;
