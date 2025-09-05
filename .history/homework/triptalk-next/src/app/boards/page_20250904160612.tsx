import React from 'react';
import styles from './page.module.css';

export default function BoardsPage() {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>날짜</th>
          </tr>
        </thead>
      </table>
    </div>
  );
}
