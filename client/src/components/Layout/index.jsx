import React, { useState } from 'react';
import { Layout as AntLayout, Menu } from 'antd';
import { ShareAltOutlined, LoginOutlined } from '@ant-design/icons';
import { Outlet, useNavigate } from 'react-router';
import Header from './Header';

const Layout = () => {
    const { Footer, Content } = AntLayout;

    return (
        <AntLayout className="layout">
            <Header/>
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
