import React from 'react';
import Layout from "./Layout";
import { Button, Card, Form, Input, Typography } from 'antd';
import { login } from '../apis/users/login';

const Login = () => {
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        try {
            const response = await login(values);
            if (response.ok) {
                const data = await response.json();
                console.log(data);
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

