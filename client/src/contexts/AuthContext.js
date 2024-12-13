import React, { createContext, useState, useContext, useEffect } from 'react';
import { getMyAccount } from '../apis/users/getUser';
import { logout } from '../apis/users/logout';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const userResponse = await getMyAccount();
                if (userResponse.ok) {
                    const userData = await userResponse.json();
                    setUser(userData);
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.error('Authentication initialization failed:', error);
            } finally {
                setIsLoading(false);
            }
        };

        initializeAuth();
    }, []);
    
    const loginUser = (userData) => {
        setUser(userData);
        setIsAuthenticated(true);
    };

    const logoutUser = () => {
        setUser(null);
        setIsAuthenticated(false);
        logout();
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            isAuthenticated, 
            isLoading,
            loginUser, 
            logoutUser 
        }}>
            {children}
        </AuthContext.Provider>
    );
};
