import React from 'react';
import styles from './page.module.css';

export default function BoardsPage() {
  return (
    <div className="container">
      <table>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>날짜</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>첫번째 게시글입니다.</td>
            <td>철수</td>
            <td>2024-01-01</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
