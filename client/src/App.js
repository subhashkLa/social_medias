import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MainRouter from './MainRouter';
import './index.css';

const App = () => (
    <div>
        <BrowserRouter>
            <MainRouter />
        </BrowserRouter>
    </div>
);

export default App;
