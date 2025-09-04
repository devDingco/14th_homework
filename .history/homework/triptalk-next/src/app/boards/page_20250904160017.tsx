import React from 'react';
import styles from './page.module.css';

export default function BoardsPage() {
  return (
    <div className="container">
      <div className={styles.번호제목작성자날짜}>
        <div>
          <span>번호</span>
          <span>제목</span>
        </div>
        <div>
          <span>작성자</span>
          <span>날짜</span>
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
