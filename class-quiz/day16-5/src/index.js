import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router'
import Login from './routes/login';

const pageList = createBrowserRouter([
  {path: "/", element: <App />},
  {path: "/login", element: <Login />}
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={pageList}/>
);

reportWebVitals();
