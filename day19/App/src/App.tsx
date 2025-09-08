// src/App.js

import { Routes, Route, Link } from "react-router-dom";
import BoardsNew from "./routes/boards/new/BoardsNew";
import BoardsDetail from "./routes/boards/detail/BoardsDetail";
// src/App.js

import { Routes, Route, Link } from "react-router-dom";
import BoardsNew from "./routes/boards/new/BoardsNew";
import BoardsDetail from "./routes/boards/detail/BoardsDetail";

function App() {
  return (
    <div>
      {/* 페이지 이동을 위한 임시 링크들 */}
      <nav>
        <Link to="/">홈</Link> |{" "}
        <Link to="/boards/new">게시글 등록</Link> |{" "}
        <Link to="/boards/detail">게시글 상세</Link>
      </nav>

      {/* URL 주소에 맞는 페이지를 보여주는 곳 */}
      <Routes>
        <Route path="/" element={<h2>홈 페이지입니다.</h2>} />
        <Route path="/boards/new" element={<BoardsNew />} />
        <Route path="/boards/detail" element={<BoardsDetail />} />
      </Routes>
    </div>
  );
}

export default App;
  