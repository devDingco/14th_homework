import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router'

import App from './App';
import BoardsNew from './routes/boards/new/BoardsNew';
import BoardsDetail from './routes/boards/new/BoardsDetail';

import './styles/index.css'
import './styles/typography.css'
import './styles/board.css'

const pages = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        path: "/boards/new",
        element: <BoardsNew />
    },
    {
        path: "/boards/detail",
        element: <BoardsDetail />
    }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={pages}/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
