import { ShareAltOutlined, LoginOutlined, LogoutOutlined, UserOutlined, LinkOutlined } from '@ant-design/icons';
import { SHARE_FILES, LOGIN, LOGOUT, USER, MY_LINKS } from './constants';

export const allMenuItems = {
    [SHARE_FILES]: {
        key: SHARE_FILES,
        icon: <ShareAltOutlined />,
        label: 'Share Files',
        url: '/',
    },
    [MY_LINKS]: {
        key: MY_LINKS,
        icon: <LinkOutlined />,
        label: 'My Links',
        url: '/my-links',
    },
    [LOGIN]: {
        key: LOGIN,
        icon: <LoginOutlined />,
        label: 'Login',
        url: '/login',
    },
    [USER]: {
        key: USER,
        icon: <UserOutlined />,
        label: 'User',
        url: '/user',
        children: [
            {
                key: LOGOUT,
                icon: <LogoutOutlined />,
                label: 'Logout',
            }
        ]
    }
}

export const getMenuItems = (isAuthenticated, userEmail) => {
    const baseItems = [
        allMenuItems[SHARE_FILES],
    ];

    if (!isAuthenticated) {
        baseItems.push(allMenuItems[LOGIN]);
    } else {
        baseItems.push(allMenuItems[MY_LINKS]);
        baseItems.push({ ...allMenuItems[USER], label: userEmail });
    }

    return baseItems;
};
