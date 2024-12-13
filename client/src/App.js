import React from 'react';
import './App.scss';
import Main from './components/Main';
import { BrowserRouter } from 'react-router';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Main />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
