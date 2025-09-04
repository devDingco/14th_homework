'use client';
import React from 'react';
import styles from './page.module.css';
import { gql } from '@apollo/client';

const FETCH_BOARDS = gql`
  query {
    fetchBoards {
      endDate
      startDate
      search
      page
    }
  }
`;

export default function BoardsPage() {
  return (
    <div className="container">
      <div className={styles.boardsContainer}>
        {/* 헤더 */}
        <div className={styles.postHeader}>
          <div className={styles.leftGroup}>
            <span>번호</span>
            <span>제목</span>
          </div>
          <div className={styles.rightGroup}>
            <span>작성자</span>
            <span>날짜</span>
          </div>
        </div>

        {/* 게시물 리스트 */}
        <div className={styles.postItem}>
          <div className={styles.leftGroup}>
            <span>1111</span>
            <span>짱구의일기</span>
          </div>
          <div className={styles.rightGroup}>
            <span>짱구</span>
            <span>20250801</span>
          </div>
        </div>
      </div>
    </div>
  );
}
