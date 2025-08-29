import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import App from "./routes/boards/new/BoardsNew";
import Detail from "./routes/boards/new/BoardsDetail";


const router = createBrowserRouter([
  { path: "/", element: <App />},
  { path: "/boards/new", element: <App /> },
  { path: "/boards/detail", element: <Detail /> },
]);

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root element (#root) not found");
}

const root = ReactDOM.createRoot(container as HTMLElement);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
