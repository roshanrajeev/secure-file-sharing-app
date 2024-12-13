import React from 'react';

const LogoutButton = ({ icon, label, onClick }) => (
    <button
        onClick={onClick}
        className="w-full text-left text-gray-300 hover:text-white px-6 py-3 text-xl font-normal
            hover:bg-gray-700 transition duration-150 ease-in-out
            inline-flex items-center"
    >
        {icon && <span className="mr-2 text-xl">{icon}</span>}
        {label}
    </button>
);

export default LogoutButton; 