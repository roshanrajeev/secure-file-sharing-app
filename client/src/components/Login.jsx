import React from 'react';
import Layout from "./Layout";
import { Button, Card, Form, Input, message, Typography } from 'antd';
import { login } from '../apis/users/login';
import { getMyAccount } from '../apis/users/getUser';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router';

const Login = () => {
    const [form] = Form.useForm();
    const { loginUser } = useAuth();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            await login(values);
            const userResponse = await getMyAccount();
            if (userResponse.ok) {
                const user = await userResponse.json();
                navigate('/');
                loginUser(user);
                message.success("Login successful!");
            } else {
                message.error("Login failed.");
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <Card className="max-w-3xl mx-auto">
                <Typography.Title level={2}>Login</Typography.Title>
                <Form layout="vertical" form={form} onFinish={onFinish}>
                    <Form.Item label="Email" name="email">
                        <Input placeholder="Email" />
                    </Form.Item>
                    <Form.Item label="Password" name="password">
                        <Input placeholder="Password" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Login</Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Login;

