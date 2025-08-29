import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router';
import './index.css';
import App from './routes/boards/new/BoardsNew';
import Detail from './routes/boards/new/BoardsDetail'

const 페이지목록 = createBrowserRouter([
  { path: "/boards/new", element: <App /> },
  { path: "/boards/detail", element: <Detail /> }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={페이지목록} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
