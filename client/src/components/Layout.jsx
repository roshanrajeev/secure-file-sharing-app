import React from 'react';
import { Layout as AntLayout, Menu } from 'antd';
import { ShareAltOutlined, LoginOutlined } from '@ant-design/icons';
import { Outlet } from 'react-router';

const MenuItems = [
    {
        key: '1',
        icon: <ShareAltOutlined />,
        label: 'Share Files',
    },
    {
        key: '2',
        icon: <LoginOutlined />,
        label: 'Login',
    },
]

const Layout = () => {
    const { Header, Footer, Content } = AntLayout;

    return (
        <AntLayout className="layout">
            <Header>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    items={MenuItems}
                />
            </Header>
            <Content style={{ padding: '50px', minHeight: 'calc(100vh - 134px)' }}>
                <div className="site-layout-content">
                    <Outlet />
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                File Sharing App ©{new Date().getFullYear()} Created with Ant Design
            </Footer>
        </AntLayout>
    )
}

export default Layout;
