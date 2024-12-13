import React, { useState } from 'react';
import { Layout, Menu, Dropdown } from 'antd';
import { ShareAltOutlined, LoginOutlined, LogoutOutlined, UserOutlined, LinkOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router'; 
import { useAuth } from '../../hooks/useAuth';

const SHARE_FILES = 'share_files';
const MY_LINKS = 'my_links';
const LOGIN = 'login';
const LOGOUT = 'logout';
const USER = 'user';

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
            key: LOGIN,
            icon: <LoginOutlined />,
            label: 'Login',
        });
    } else {
        baseItems.push({
            key: MY_LINKS,
            icon: <LinkOutlined />,
            label: 'My Links',
        });
        baseItems.push({
            key: USER,
            icon: <UserOutlined />,
            label: userEmail,
            children: [
                {
                    key: LOGOUT,
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
            case LOGIN:
                navigate('/login');
                break;
            case LOGOUT:
                logoutUser();
                navigate('/');
                break;
            case MY_LINKS:
                navigate('/my-links');
                break;
            default:
                navigate('/');
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
