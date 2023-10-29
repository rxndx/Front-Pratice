import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

const { Header } = Layout;

const Navigation = () => {
    return (
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark">
                    <Menu.Item key="tables">
                        <Link to="/tables">Столы</Link>
                    </Menu.Item>
                    <Menu.Item key="waiters">
                        <Link to="/waiters">Официанты</Link>
                    </Menu.Item>
                    <Menu.Item key="dishes">
                        <Link to="/dishes">Блюда</Link>
                    </Menu.Item>
                    <Menu.Item key="orders">
                        <Link to="/orders">Заказы</Link>
                    </Menu.Item>
                </Menu>
            </Header>
        </Layout>
    );
};

export default Navigation;