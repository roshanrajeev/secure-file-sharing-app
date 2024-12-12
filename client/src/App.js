import React from 'react';
import './App.scss';
import Main from './components/Main';
import { BrowserRouter } from 'react-router';

function App() {
  return (
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  );
}

export default App;
