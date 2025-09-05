import React from 'react';
import styles from './page.module.css';

export default function BoardsPage() {
  return (
    <div className="container">
      <div>
        <div>
          <span>번호</span>
          <div>제목</div>
        </div>
        <div>
          <div>작성자</div>
          <div>날짜</div>
        </div>
      </div>

      <div>
        <div>1</div>
        <div>안녕하세요</div>
        <div>철수</div>
        <div>2020-01-01</div>
      </div>
    </div>
  );
}
