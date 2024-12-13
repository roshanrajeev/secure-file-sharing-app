import React, { useRef, useEffect } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { LOGOUT } from './constants';
import NavItem from './NavItem';
import LogoutButton from './LogoutButton';

const DropdownMenu = ({ item, isActive, isOpen, onToggle, onLogout }) => {
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                onToggle(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onToggle]);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => onToggle(item.key)}
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
                    className={`ml-2 text-lg transition-transform duration-200 
                        ${isOpen ? 'transform rotate-180' : ''}`}
                />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 py-2 w-72 bg-gray-800 rounded-lg shadow-xl z-50 border border-gray-700">
                    {item.children.map((child) => (
                        child.key === LOGOUT ? (
                            <LogoutButton
                                key={child.key}
                                icon={child.icon}
                                label={child.label}
                                onClick={onLogout}
                            />
                        ) : (
                            <NavItem
                                key={child.key}
                                item={child}
                                isActive={false}
                                onClick={() => onToggle(null)}
                            />
                        )
                    ))}
                </div>
            )}
        </div>
    );
};

export default DropdownMenu; 