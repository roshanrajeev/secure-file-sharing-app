import React from 'react';
import { Button, Form, Input, Space } from 'antd';
import { useRegister } from '../../hooks/useRegister';

const RegisterForm = ({ toggleForm }) => {
    const [form] = Form.useForm();
    const register = useRegister({ form });

    const onFinish = async (values) => {
        const success = await register(values);
        if(success) {
            form.resetFields();
            toggleForm();
        }
    }

    const handleFieldChange = (e) => {
        const fieldName = e.target.name;
        form.setFields([{ name: fieldName, errors: [] }]);
    }

    return (
        <Form layout="vertical" form={form} onFinish={onFinish}>
            <Form.Item label="First Name" name="first_name">
                <Input 
                    placeholder="First Name" 
                    name="first_name" 
                    onChange={handleFieldChange}
                />
            </Form.Item>
            <Form.Item label="Last Name" name="last_name">
                <Input 
                    placeholder="Last Name" 
                    name="last_name" 
                    onChange={handleFieldChange}
                />
            </Form.Item>
            <Form.Item label="Email" name="email">
                <Input 
                    placeholder="Email" 
                    name="email" 
                    type="email" 
                    onChange={handleFieldChange}
                />
            </Form.Item>
            <Form.Item label="Password" name="password">
                <Input.Password 
                    placeholder="Password" 
                    name="password" 
                    onChange={handleFieldChange}
                />
            </Form.Item>
            <Form.Item 
                label="Confirm Password" 
                name="confirmPassword"
                dependencies={['password']}
                rules={[
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject('The passwords do not match!');
                        },
                    }),
                ]}
            >
                <Input.Password 
                    placeholder="Confirm Password" 
                    name="confirmPassword" 
                    onChange={handleFieldChange}
                />
            </Form.Item>
            <Form.Item>
                <Space direction="vertical" className="w-full">
                    <Button type="primary" htmlType="submit" className="w-full">
                        Register
                    </Button>
                    <Button type="link" onClick={toggleForm} className="w-full">
                        Already have an account? Login
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );
};

export default RegisterForm; 