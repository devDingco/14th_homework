import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './routes/boards/new/BoardsNew.css'
import BoardsNewForm from './routes/boards/new/BoardsNew';
import BoardsDetail from './routes/boards/new/BoardsDetail';
import BoardsList from './routes/boards/new/BoardsList'
import { createBrowserRouter, RouterProvider } from 'react-router'


const BoardPageList = createBrowserRouter([
    {path: "/", element:<BoardsList />},
    {path: "/boards/new", element:<BoardsNewForm />},
    {path: "/boards/detail", element:<BoardsDetail />}
])

const root = ReactDOM.createRoot(
    document.getElementById("root") as ReactDOM.Container
);
root.render(
    <RouterProvider router={BoardPageList} />
);