import React from 'react';
import { Routes, Route } from "react-router"

import Layout from "./Layout"
import ShareFiles from "./ShareFiles"
import Login from "./Login"
import DownloadFiles from './DownloadFiles';
import MyLinks from './MyLinks';
import PrivateRoute from './PrivateRoute';

const Main = () => {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/login" element={<Login />} />
                <Route element={<PrivateRoute />}>
                    <Route path="/" element={<ShareFiles />} />
                    <Route path="/shared/:folder_uid" element={<DownloadFiles />} />
                    <Route path="/my-links" element={<MyLinks />} />
                </Route>
            </Route>
        </Routes>
    )
}

export default Main;
