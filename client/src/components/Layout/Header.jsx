import React, { useState } from 'react';
import { Layout, Menu, Dropdown } from 'antd';
import { ShareAltOutlined, LoginOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router'; 
import { useAuth } from '../../hooks/useAuth';

const SHARE_FILES = 'share_files';

const getMenuItems = (isAuthenticated, userEmail) => {
    const baseItems = [
        {
            key: SHARE_FILES,
            icon: <ShareAltOutlined />,
            label: 'Share Files',
        }
    ];

    if (!isAuthenticated) {
        baseItems.push({
            key: 'login',
            icon: <LoginOutlined />,
            label: 'Login',
        });
    } else {
        baseItems.push({
            key: 'user',
            icon: <UserOutlined />,
            label: userEmail,
            children: [
                {
                    key: 'logout',
                    icon: <LogoutOutlined />,
                    label: 'Logout',
                }
            ]
        });
    }

    return baseItems;
};

const Header = () => {
    const { user, isAuthenticated, logoutUser } = useAuth();
    const [current, setCurrent] = useState(SHARE_FILES);
    const {Header: AntHeader} = Layout;
    const navigate = useNavigate();
    
    const handleMenuClick = (event) => {
        setCurrent(event.key);
        switch (event.key) {
            case 'login':
                navigate('/login');
                break;
            case 'logout':
                logoutUser();
                navigate('/');
                break;
            default:
                navigate('');
                break;
        }
    }

    return (
        <AntHeader>
            <div className="logo" />
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['1']}
                items={getMenuItems(isAuthenticated, user?.email)}
                selectedKeys={[current]}
                onClick={(event) => handleMenuClick(event)}
            />
        </AntHeader>
    )
}

export default Header;
