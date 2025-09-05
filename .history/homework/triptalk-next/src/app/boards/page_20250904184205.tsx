'use client';
import React, { MouseEvent } from 'react';
import styles from './page.module.css';
import { gql, useMutation, useQuery } from '@apollo/client';

interface Board {
  _id: string;
  writer: string;
  title: string;
  contents: string;
  createdAt: string;
}

interface FetchBoardsData {
  fetchBoards: Board[];
}

const FETCH_BOARDS = gql`
  query fetchBoards(
    $endDate: DateTime
    $startDate: DateTime
    $search: String
    $page: Int
  ) {
    fetchBoards(
      endDate: $endDate
      startDate: $startDate
      search: $search
      page: $page
    ) {
      _id
      writer
      title
      contents
      createdAt
    }
  }
`;

const DELETE_BOARD = gql`
  mutation deleteBoard($boardId: ID!) {
    deleteBoard(boardId: $boardId) {
      _id
    }
  }
`;

export default function BoardsPage() {
  const { data } = useQuery<FetchBoardsData>(FETCH_BOARDS);
  const [deleteBoard] = useMutation(DELETE_BOARD);
  console.log(data?.fetchBoards);
  const onClickDelete = async (event: MouseEvent<HTMLButtonElement>) => {
    const target = event.target as HTMLButtonElement;
    try {
      await deleteBoard({
        variables: {
          boardId: target.id,
        },
        refetchQueries: [{ query: FETCH_BOARDS }],
      });
    } catch (error) {
      console.error('삭제 실패:', error);
      alert('삭제에 실패했습니다. 작성자만 삭제할 수 있습니다.');
    }
  };
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
        {data?.fetchBoards?.map((el: Board, index: number) => {
아          return (
            <div key={el._id} className={styles.postItem}>
              <div className={styles.leftGroup}>
                <span>{index + 1}</span>
                <span>{el.title}</span>
              </div>
              <div className={styles.rightGroup}>
                <span>{el.writer}</span>
                <span>{new Date(el.createdAt).toLocaleDateString()}</span>
                <span>
                  <button id={el._id} onClick={onClickDelete}>
                    삭제
                  </button>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
