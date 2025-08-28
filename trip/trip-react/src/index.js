import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // css 불러오기
import './App.css';
import App from './App'; // App 컴포넌트 불러오기
import reportWebVitals from './reportWebVitals';

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import BoardsNew from './routes/boards/new/BoardsNew.js'
import BoardsDetail from './routes/boards/new/BoardsDetail.js'

const 트립토크페이지 =  createBrowserRouter([
    { path: "/", element: <App /> },
    { path: "/boards/new", element: <BoardsNew /> },
    { path: "/boards/detail", element: <BoardsDetail /> }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={트립토크페이지} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
