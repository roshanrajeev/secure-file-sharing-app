import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { usersApi } from '../apis/users';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const setDataAndRedirect = ({user = null, authenticated = false, to = null}) => {
        setUser(user);
        setIsAuthenticated(authenticated);
        if(to !== null) navigate(to);
    }

    const loginUser = (userData) => {
        setDataAndRedirect({user: userData, authenticated: true});
    };

    const logoutUser = async () => {
        await usersApi.logout();
        setDataAndRedirect({ to: "/login" });
    };

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const { data } = await usersApi.myAccount();
                loginUser(data);
            } catch (error) {
                setDataAndRedirect({});
            } finally {
                setIsLoading(false);
            }
        };

        initializeAuth();
    }, []);

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
