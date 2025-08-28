import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from 'react-router'
import App from './App'
import BoardNew from './routes/boards/new/BaordNew'
import BaordDetail from './routes/boards/detail/BoardDetail'

const pages = createBrowserRouter([
  {path: "/", element:<App/>},
  {path: "/new", element:<BoardNew/>},
  {path: "/detail", element:<BaordDetail/>}
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={pages}/>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
