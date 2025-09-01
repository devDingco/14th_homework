import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'
import './styles/root.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

import { createBrowserRouter, RouterProvider } from 'react-router'
import BoardsNew from './routes/boards/new/BoardsNew'
import BoardsDetail from './routes/boards/new/BoardsDetail'
const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/boards/new', element: <BoardsNew /> },
  { path: '/boards/detail/:id', element: <BoardsDetail /> },
  {
    path: '*',
    element: <div>404 Not Found</div>,
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<RouterProvider router={router} />)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
