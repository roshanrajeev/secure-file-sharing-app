import React, { useState } from 'react';
import { Button, Form, Input, Space, Typography } from 'antd';
import { useLogin } from '../../hooks/useLogin';

const LoginForm = ({ toggleForm }) => {
    const [form] = Form.useForm();
    const { login, isWaitingForOTP } = useLogin({ form });
    const [email, setEmail] = useState('');

    const onFinish = async (values) => {
        setEmail(values.email);
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
            {isWaitingForOTP && (
                <>
                    <Typography.Text type="secondary">
                        A verification code has been sent to {email}
                    </Typography.Text>
                    <Form.Item label="Verification Code" name="otp">
                        <Input 
                            placeholder="Enter verification code" 
                            name="otp" 
                            onChange={handleFieldChange}
                        />
                    </Form.Item>
                </>
            )}
            <Form.Item>
                <Space direction="vertical" className="w-full">
                    <Button type="primary" htmlType="submit" className="w-full">
                        {isWaitingForOTP ? 'Verify' : 'Login'}
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