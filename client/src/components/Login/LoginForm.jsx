import React from 'react';
import { Button, Form, Input, Space } from 'antd';
import { useLogin } from '../../hooks/useLogin';

const LoginForm = ({ toggleForm }) => {
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
                <Space direction="vertical" className="w-full">
                    <Button type="primary" htmlType="submit" className="w-full">
                        Login
                    </Button>
                    <Button type="link" onClick={toggleForm} className="w-full">
                        Not registered? Create an account
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );
};

export default LoginForm; 