import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// 필요한 파일들을 한 곳에서 깔끔하게 가져옵니다.
import "./index.css";
import App from "./App.js";
import BoardsNew from "./routes/boards/new/BoardsNew.js";
import BoardsDetail from "./routes/boards/detail/BoardsDetail.js"; // 👈 이 줄을 추가해주세요!
import reportWebVitals from "./reportWebVitals";

// 페이지 주소록(라우터)을 만듭니다.
const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/boards/new", element: <BoardsNew /> },
  { path: "/boards/detail", element: <BoardsDetail /> }, // 이제 BoardsDetail을 정상적으로 사용할 수 있어요.
]);

// id가 'root'인 HTML 요소를 찾습니다.
const root = ReactDOM.createRoot(document.getElementById("root"));

// 찾은 'root' 요소에 우리가 만든 페이지 주소록(router)을 적용하여 화면 전체를 그려줍니다.
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// 웹사이트 성능 측정을 시작합니다.
reportWebVitals();