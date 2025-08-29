import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import logo from './logo_area.png';
import profile from './profile_basic.png';
import BoardsNew from './routes/boards/new/BoardsNew';
import BoardsDetail from './routes/boards/detail/BoardsDetail';

// Header 컴포넌트
const Header = () => {
  return (
    <header className="header">
      <div className="header-logo-and-nav">
        <img src={logo} alt="Triptalk Logo" className="header-logo" />
        <nav className="header-nav">
          <a href="#">트립토크</a>
          <a href="#">숙박권 구매</a>
          <a href="#">마이 페이지</a>
        </nav>
      </div>
      <div className="user-profile">
        <img src={profile} alt="User Profile" />
      </div>
    </header>
  );
};

// 메인 앱 컴포넌트
function App() {
  return (
    <div className="main-container">
      <Router>
        <Header />
        <Routes>
          <Route path="/boards/new" element={<BoardsNew />} />
          <Route path="/boards/detail" element={<BoardsDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
