import React from 'react';
import { Routes, Route } from "react-router"

import Layout from "./Layout"
import ShareFiles from "./ShareFiles"
import Login from "./Login"
import DownloadFiles from './DownloadFiles';

const Main = () => {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<ShareFiles />} />
                <Route path="/shared/:folder_uid" element={<DownloadFiles />} />
            </Route>
        </Routes>
    )
}

export default Main;
