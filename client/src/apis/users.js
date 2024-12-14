import axios from "axios";
import axiosInstance, { axiosBaseInstance } from "./axios";

const sendOTP = async ({ email, password }) => {
    return await axiosBaseInstance.post("/auth/send-otp", {
        email,
        password
    });
}

const login = async ({ email, password, otp }) => {
    return await axiosBaseInstance.post("/auth/token", {
        email,
        password,
        otp
    });
}

const myAccount = async () => {
    return await axiosInstance.get("/users/me");
}

const logout = async () => {
    return await axiosInstance.post("/auth/logout");
}

export const usersApi = {
    sendOTP,
    login,
    myAccount,
    logout
}
