import React, { createContext, useState, useContext, useEffect } from 'react';
import { usersApi } from '../apis/users';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const loginUser = (userData) => {
        setUser(userData);
        setIsAuthenticated(true);
    };

    const logoutUser = async () => {
        setUser(null);
        setIsAuthenticated(false);
        await usersApi.logout();
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            isAuthenticated,
            loginUser, 
            logoutUser 
        }}>
            {children}
        </AuthContext.Provider>
    );
};
