
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BoardsNew from "./routes/boards/new/BoardsNew";
import BoardsDetail from "./routes/boards/detail/BoardsDetail";

function App() {
  return (
    // 1. 가장 바깥을 <BrowserRouter>로 감싸줍니다. (하나의 부모)
    <BrowserRouter>
      {/* 2. 내비게이션 등 다른 요소가 추가될 것을 대비해 <div>로 한번 더 감싸줍니다. */}
      <div>
        {/* 라우트 설정은 Routes 안에! */}
        <Routes>
          <Route path="/" element={<h2>홈 페이지입니다.</h2>} />
          <Route path="/boards/new" element={<BoardsNew />} />
          <Route path="/boards/detail" element={<BoardsDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;