import axiosInstance from "./axios";

const myAccount = async () => {
    return await axiosInstance.get("/users/me");
}

const login = async ({ email, password }) => {
    return await axiosInstance.post("/auth/token", { email, password });
}

const logout = async () => {
    return await axiosInstance.post("/auth/logout");
}

export const usersApi = { 
    myAccount,
    login,
    logout
};
