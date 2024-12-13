import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { DownOutlined } from '@ant-design/icons';
import { useAuth } from '../../hooks/useAuth';
import { SHARE_FILES, LOGIN, LOGOUT, MY_LINKS } from './constants';
import { getMenuItems } from './utils';
import logo from '../../assets/logo.png';

const Header = () => {
    const { user, isAuthenticated, logoutUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [openDropdown, setOpenDropdown] = useState(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpenDropdown(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        logoutUser();
        navigate('/');
    };

    const handleDropdownClick = (key) => {
        setOpenDropdown(openDropdown === key ? null : key);
    };

    return (
        <header className="bg-gray-900 shadow-md fixed top-0 left-0 right-0 z-50 font-[-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,'Helvetica_Neue',Arial,'Noto_Sans',sans-serif]">
            <div className="container mx-auto px-6">
                <div className="flex justify-between h-24 items-center">
                    <div className="flex-shrink-0">
                        <Link to="/">
                            <img
                                className="h-16 w-auto"
                                src={logo}
                                alt="Logo"
                            />
                        </Link>
                    </div>

                    <nav className="flex items-center space-x-12">
                        {getMenuItems(isAuthenticated, user?.email).map((item) => {
                            const isActive = location.pathname === item.url;



                            if (item.children) {
                                return (
                                    <div key={item.key} className="relative" ref={dropdownRef}>
                                        <button
                                            onClick={() => handleDropdownClick(item.key)}
                                            className={`${isActive
                                                    ? 'text-blue-400 bg-gray-800'
                                                    : 'text-gray-300 hover:text-white'
                                                } px-6 py-3 text-xl font-normal
                                                hover:bg-gray-800 rounded-lg transition duration-150 ease-in-out
                                                inline-flex items-center`}
                                        >
                                            {item.icon && <span className="mr-2 text-xl">{item.icon}</span>}
                                            {item.label}
                                            <DownOutlined
                                                className={`ml-2 text-lg transition-transform duration-200 ${openDropdown === item.key ? 'transform rotate-180' : ''
                                                    }`}
                                            />
                                        </button>

                                        {openDropdown === item.key && (
                                            <div className="absolute right-0 mt-2 py-2 w-72 bg-gray-800 rounded-lg shadow-xl z-50 border border-gray-700">
                                                {item.children.map((child) => {
                                                    if (child.key === LOGOUT) {
                                                        return (
                                                            <button
                                                                key={child.key}
                                                                onClick={handleLogout}
                                                                className="text-gray-300 hover:text-white px-6 py-3 text-xl font-normal
                                                                    hover:bg-gray-800 rounded-lg transition duration-150 ease-in-out
                                                                    inline-flex items-center"
                                                            >
                                                                {child.icon && <span className="mr-2 text-xl">{child.icon}</span>}
                                                                {child.label}
                                                            </button>
                                                        );
                                                    }
                                                    return <Link
                                                        key={child.key}
                                                        to={child.url}
                                                        className="block px-6 py-3 text-xl text-gray-300 hover:bg-gray-700 hover:text-white first:rounded-t-lg last:rounded-b-lg font-normal
                                                            inline-flex items-center"
                                                        onClick={() => setOpenDropdown(null)}
                                                    >
                                                        {child.icon && <span className="mr-2 text-xl">{child.icon}</span>}
                                                        {child.label}
                                                    </Link>
                                                })}
                                            </div>
                                        )}
                                    </div>
                                );
                            }

                            return (
                                <Link
                                    key={item.key}
                                    to={item.url}
                                    className={`${isActive
                                            ? 'text-blue-400 bg-gray-800'
                                            : 'text-gray-300 hover:text-white'
                                        } px-6 py-3 text-xl font-normal
                                        hover:bg-gray-800 rounded-lg transition duration-150 ease-in-out
                                        inline-flex items-center`}
                                >
                                    {item.icon && <span className="mr-2 text-xl">{item.icon}</span>}
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
