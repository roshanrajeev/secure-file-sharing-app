import axios from "axios";
import { routes } from "../constants/routes";
import { matchPath } from "react-router";

const API_BASE_URL = "http://localhost:8000/api/v1";

export const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.response.use(
    response => response, 
    async error => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {  
            originalRequest._retry = true;
            console.log(originalRequest._retry)
            try {
                await axios.post(`${API_BASE_URL}/auth/token/refresh`, {}, { withCredentials: true });
                return axiosInstance(originalRequest);
            } catch (error) {
                const routesWithAnonymousAccess = [routes.HOME_PATH, routes.SHARED_FILES_PATH];

                const isAnonymousAccessAllowed = routesWithAnonymousAccess.some(route => {
                    return matchPath(route, window.location.pathname);
                });

                if (!isAnonymousAccessAllowed) {
                    window.location.href = routes.LOGIN_PATH;
                }
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
