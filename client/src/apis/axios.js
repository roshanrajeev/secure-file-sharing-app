import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api/v1";

export const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
