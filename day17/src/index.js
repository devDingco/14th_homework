import React from "react";
//  JSX 문법 등 React의 핵심 기능을 사용하기 위해 React 라이브러리를 불러옵니다.

import ReactDOM from "react-dom/client";
// React 컴포넌트를 실제 웹페이지(HTML)에 연결하고 그려주는 역할을 하는 ReactDOM 라이브러리를 불러옵니다.
// React 18에는 서버에서도 React 컴포넌트를 미리 렌더링해서 보내주는 강력한 기능
import "./index.css"
import App from "../App"
import BoardsDetail from "."
import { createBrowserRouter, RouterProvider } from 'react-router';
import Aaa from './routes/aaa';
import Bbb from './routes/bbb';
import App from '../App';

import { createBrowserRouter, RouterProvider } from 'react-router';
const pagecontent = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/aaa", element: <Aaa /> },
  { path: "/bbb", element: <Bbb /> }
]);

function Root() {
  return <RouterProvider router={router} />;
}





reportWebVitals();
/* 웹사이트 성능지표  */
reportWebVitals(console.log);
/* 개발자 도구 콘솔에서 성능 지표를 볼 수 있습니다.*/