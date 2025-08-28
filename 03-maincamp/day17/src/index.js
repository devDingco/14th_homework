import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import BoardsNew from './BoardsNew'
import BoardsDetail from './BoardsDetail'

import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from 'react-router'

const 페이지목록 = createBrowserRouter([
    // {path: "/", element : <App/>},
    {path: "/boards/new", element : <BoardsNew/>},
    {path: "/boards/detail", element : <BoardsDetail/>},
    
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={페이지목록}/>
);

reportWebVitals();
