import React from 'react';
import styles from './page.module.css';

export default function BoardsPage() {
  return (
    <div className="container">
      {/* 헤더 */}
      <div className="post-header">
        <div className="left-group">
          <span>번호</span>
          <span>제목</span>
        </div>
        <div className="right-group">
          <span>작성자</span>
          <span>날짜</span>
        </div>
      </div>

      {/* 게시물 리스트 */}
      <div className="post-header">
        <div className="left-group">
          <span>1111</span>
          <span>짱구의일기</span>
        </div>
        <div className="right-group">
          <span>작성자</span>
          <span>날짜</span>
        </div>
      </div>
    </div>
  );
}
