import React, { useState } from 'react';
import { Card, Form, Typography } from 'antd';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);

    const toggleForm = () => {
        setIsLogin(!isLogin);
    }

    return (
        <div>
            <Card className="max-w-3xl mx-auto">
                <Typography.Title level={2}>
                    {isLogin ? 'Login' : 'Register'}
                </Typography.Title>
                {isLogin ? (
                    <LoginForm toggleForm={toggleForm} />
                ) : (
                    <RegisterForm toggleForm={toggleForm} />
                )}
            </Card>
        </div>
    )
}

export default Login; 