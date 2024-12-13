import React from 'react';
import { Link } from 'react-router';

const NavItem = ({ item, isActive, children }) => (
    <Link
        to={item.url}
        className={`${isActive
            ? 'text-blue-400 bg-gray-800'
            : 'text-gray-300 hover:text-white'
        } px-6 py-3 text-xl font-normal
        hover:bg-gray-800 rounded-lg transition duration-150 ease-in-out
        inline-flex items-center`}
    >
        {item.icon && <span className="mr-2 text-xl">{item.icon}</span>}
        {children || item.label}
    </Link>
);

export default NavItem; 