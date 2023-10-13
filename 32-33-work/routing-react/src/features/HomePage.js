import React from 'react';
import { Menu, Layout } from 'antd';
import { Link } from 'react-router-dom';

const { Header, Content } = Layout;

function HomePage() {
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
                <h1>Добро пожаловать на Главную страницу</h1>
            </Content>
        </Layout>
    );
}

export default HomePage;