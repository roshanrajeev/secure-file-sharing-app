import axiosInstance from '../apis/axios';
import { message } from 'antd';

export const useRegister = ({ form }) => {
    return async (values) => {
        try {
            await axiosInstance.post('/auth/register', values);
            message.success("Registration successful");
            return true;
        } catch (error) {
            if (error.response.status === 400) {
                const { response: { data: { errors } } } = error;
                form.setFields(errors.map(error => ({
                    name: error.field,
                    errors: [error.message]
                })));
            } else {
                message.error("Registration failed");
            }
            return false;
        };
    };
};
