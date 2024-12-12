import React from 'react';
import { Routes, Route } from "react-router"

import Layout from "./Layout"
import ShareFiles from "./ShareFiles"
import Login from "./Login"

const Main = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<Layout />}>
                <Route path="/" element={<ShareFiles />} />
            </Route>
        </Routes>
    )
}

export default Main;
