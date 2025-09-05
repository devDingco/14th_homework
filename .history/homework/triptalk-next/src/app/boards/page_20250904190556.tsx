'use client';
import Image from 'next/image';
import React, { MouseEvent } from 'react';
import styles from './page.module.css';
import { gql, useQuery, useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';

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
    deleteBoard(boardId: $boardId)
  }
`;

export default function BoardsPage() {
  const { data } = useQuery<FetchBoardsData>(FETCH_BOARDS);
  const [deleteBoard] = useMutation(DELETE_BOARD);
  const router = useRouter();
  console.log(data?.fetchBoards);

  const onClickTitle = (boardId: string) => {
    router.push(`/boards/detail/${boardId}`);
  };

  const onClickDelete = async (event: MouseEvent<HTMLButtonElement>) => {
    const target = event.target as HTMLButtonElement;
    try {
      await deleteBoard({
        variables: {
          boardId: target.id,
        },
        refetchQueries: [{ query: FETCH_BOARDS }],
      });
      alert('게시글이 삭제되었습니다.');
    } catch (error) {
      console.error('삭제 실패:', error);
      alert('삭제에 실패했습니다. 작성자만 삭제할 수 있습니다.');
    }
  };
  return (
    <div className={styles.container}>
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
          return (
            <div key={el._id} className={styles.postItem}>
              <div className={styles.leftGroup}>
                <span>{index + 1}</span>
                <span
                  style={{ cursor: 'pointer', textDecoration: 'underline' }}
                  onClick={() => onClickTitle(el._id)}
                >
                  {el.title}
                </span>
              </div>
              <div className={styles.rightGroup}>
                <span>{el.writer}</span>
                <span>{new Date(el.createdAt).toLocaleDateString()}</span>
                <button id={el._id} onClick={onClickDelete}>
                  <Image
                    src="../../assets/icons/delete.png"
                    alt="delete"
                    width={20}
                    height={20}
                  />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
