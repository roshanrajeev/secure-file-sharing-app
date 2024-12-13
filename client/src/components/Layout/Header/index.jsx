import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { useAuth } from '../../../hooks/useAuth';
import { getMenuItems } from './utils';
import logo from '../../../assets/logo.png';
import NavItem from './NavItem';
import DropdownMenu from './DropdownMenu';

const Header = () => {
    const { user, isAuthenticated, logoutUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [openDropdown, setOpenDropdown] = useState(null);

    const handleLogout = () => {
        logoutUser();
        navigate('/');
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
                        {getMenuItems(isAuthenticated, user?.email).map((item) => (
                            item.children ? (
                                <DropdownMenu
                                    key={item.key}
                                    item={item}
                                    isActive={location.pathname === item.url}
                                    isOpen={openDropdown === item.key}
                                    onToggle={setOpenDropdown}
                                    onLogout={handleLogout}
                                />
                            ) : (
                                <NavItem
                                    key={item.key}
                                    item={item}
                                    isActive={location.pathname === item.url}
                                />
                            )
                        ))}
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header; 