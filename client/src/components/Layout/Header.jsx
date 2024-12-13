import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { ShareAltOutlined, LoginOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router'; 

const LOGIN = 'login';
const SHARE_FILES = 'share_files';

const MenuItems = [
    {
        key: SHARE_FILES,
        icon: <ShareAltOutlined />,
        label: 'Share Files',
    },
    {
        key: LOGIN,
        icon: <LoginOutlined />,
        label: 'Login',
    },
]

const Header = () => {
    const [current, setCurrent] = useState(SHARE_FILES);

    const {Header: AntHeader} = Layout;

    const navigate = useNavigate();
    
    const handleMenuClick = (event) => {
        setCurrent(event.key);
        switch (event.key) {
            case LOGIN:
                navigate('/login');
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
                items={MenuItems}
                selectedKeys={[current]}
                onClick={(event) => handleMenuClick(event)}
            />
        </AntHeader>
    )
}

export default Header;
