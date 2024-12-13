import { useAuth } from "./useAuth";
import { useNavigate } from "react-router";
import { message } from "antd";
import { usersApi } from "../apis/users";

export const useLogin = ({ form }) => {
    const { loginUser } = useAuth();
    const navigate = useNavigate();

    return async ({ email, password }) => {
        try {
            await usersApi.login({ email, password });
            const { data } = await usersApi.myAccount();
            navigate('/');
            loginUser(data);
            message.success("Login successful!");
        } catch (error) {
            if(error.status === 400) {
                const {response: {data: { errors }}} = error;
                form.setFields(errors.map(error => ({
                    name: error.field,
                    errors: [error.message]
                })));
            } else if(error.status === 401) {
                message.error("Invalid email or password.");
            } else {
                message.error("Login failed.");
            }
        }
    }
}
