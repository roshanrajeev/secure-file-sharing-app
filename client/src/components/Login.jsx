import React from 'react';
import { Button, Card, Form, Input, Typography } from 'antd';
import { useLogin } from '../hooks/useLogin';

const Login = () => {
    const [form] = Form.useForm();
    const login = useLogin({ form });

    const onFinish = async (values) => {
        await login(values);
    }

    const handleFieldChange = (e) => {
        const fieldName = e.target.name;
        form.setFields([{ name: fieldName, errors: [] }]);
    }

    return (
        <div>
            <Card className="max-w-3xl mx-auto">
                <Typography.Title level={2}>Login</Typography.Title>
                <Form layout="vertical" form={form} onFinish={onFinish}>
                    <Form.Item label="Email" name="email">
                        <Input 
                            placeholder="Email" 
                            name="email" 
                            type="email" 
                            onChange={handleFieldChange}
                        />
                    </Form.Item>
                    <Form.Item label="Password" name="password">
                        <Input 
                            placeholder="Password" 
                            name="password" 
                            type="password" 
                            onChange={handleFieldChange}
                        />
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

