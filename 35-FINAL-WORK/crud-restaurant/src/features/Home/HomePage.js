import React from 'react';
import { Layout } from 'antd';
import Navigation from "../../components/Navigation";

const { Content } = Layout;

function HomePage() {
    return (
        <Layout>
            <Navigation />
            <Content style={{ padding: '50px' }}>
                <h1>Добро пожаловать на Главную страницу</h1>
            </Content>
        </Layout>
    );
}

export default HomePage;