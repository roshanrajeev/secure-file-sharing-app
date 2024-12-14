import { useAuth } from "./useAuth";
import { useNavigate } from "react-router";
import { message } from "antd";
import { usersApi } from "../apis/users";
import { useState } from "react";

export const useLogin = ({ form }) => {
    const { loginUser } = useAuth();
    const navigate = useNavigate();
    const [isWaitingForOTP, setIsWaitingForOTP] = useState(false);

    const login = async ({ email, password, otp }) => {
        try {
            if (!isWaitingForOTP) {
                await usersApi.sendOTP({ email, password });
                setIsWaitingForOTP(true);
                message.info("Please check your email for the verification code");
                return;
            }

            await usersApi.login({ email, password, otp });
            const { data } = await usersApi.myAccount();
            navigate('/');
            loginUser(data);
            message.success("Login successful!");
            setIsWaitingForOTP(false);
        } catch (error) {
            if(error.status === 400) {
                const {response: {data: { errors }}} = error;
                form.setFields(errors.map(error => ({
                    name: error.field,
                    errors: [error.message]
                })));
            } else if(error.status === 401 || error.status === 403) {
                const {response: {data: { errors }}} = error;
                message.error(errors[0].message);
            } else {
                message.error("Login failed.");
            }
        }
    };

    return { login, isWaitingForOTP };
};
