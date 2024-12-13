import { Outlet } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { usersApi } from "../apis/users";
import { useEffect, useState } from "react";
import { Spin } from "antd";

const PrivateRoute = () => {
    const { loginUser } = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const { data } = await usersApi.myAccount();
                loginUser(data);
            } catch (error) {
                console.error('Authentication initialization failed:', error);
            } finally {
                setIsLoading(false);
            }
        };

        initializeAuth();
    }, []);

    if (isLoading) {
        return (
            <div className="fixed inset-0 flex justify-center items-center bg-white z-50">
                <Spin size="large" tip="Loading..." spinning={true}>
                    <div className="p-12" />
                </Spin>
            </div>
        );
    }

    return <Outlet />;
}

export default PrivateRoute;