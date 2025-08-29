import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import BoardsNew from './routes/boards/new/BoardsNew'
import BoardsDetail from './routes/boards/detail/BoardsDetail'

import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from 'react-router'

const 페이지목록 = createBrowserRouter([
    // {path: "/", element : <App/>},
    {path: "/boards/new", element : <BoardsNew/>},
    {path: "/boards/detail", element : <BoardsDetail/>},
    
])

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <RouterProvider router={페이지목록}/>
);

reportWebVitals();
