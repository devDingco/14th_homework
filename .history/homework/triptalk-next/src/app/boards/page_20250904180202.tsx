'use client';
import React from 'react';
import styles from './page.module.css';
import { gql, useMutation, useQuery } from '@apollo/client';

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
      # youtubeUrl
      # likeCount
      # dislikeCount
      # images
      # boardAddress
      # user
      createdAt
      # updatedAt
      # deletedAt
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
  const { data } = useQuery(FETCH_BOARDS);
  const [deleteBoard] = useMutation(DELETE_BOARD);
  console.log(data?.fetchBoards);
  const onClickDelete = async (event: MouseEvent<HTMLButtonElement>) => {
    await deleteBoard({
      variables: {
        boardId: event.target.id,
      },
      refetchQueries: [{ query: FETCH_BOARDS }],
    });
  };
  return (
    <div>
      {data?.fetchBoards.map((el) => {
        return (
          <div key={el._id} className="container">
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
                  <span>{el.number}</span>
                  <span>{el.title}</span>
                </div>
                <div className={styles.rightGroup}>
                  <span>{el.writer}</span>
                  <span>{el.createdAt}</span>
                  <span>
                    <button onClick={onClickDelete}>삭제</button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
