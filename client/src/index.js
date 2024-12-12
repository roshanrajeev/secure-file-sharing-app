import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/reset.css';
import './index.css';

const root = createRoot(document.getElementById('root'));
root.render(
    <App />
);

reportWebVitals();
