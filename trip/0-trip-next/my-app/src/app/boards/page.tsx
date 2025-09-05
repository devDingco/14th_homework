"use client"

import React from 'react';
import styles from "./styles.module.css";
import { gql, useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';

const FETCH_BOARDS = gql`
  query {
    fetchBoards {
      _id
      writer
      title
      createdAt
    }
  }
`;

const DELETE_BOARD = gql`
  mutation deleteBoard($boardId: ID!) {
    deleteBoard(boardId: $boardId)
  }
`;

const BoardsList = () => {

    const { data } = useQuery(FETCH_BOARDS);
    const router = useRouter();

    const [deleteBoard] = useMutation(DELETE_BOARD);

    const onClickDelete = async (boardId: string) => {
      try {
        await deleteBoard({
          variables: { boardId },
          refetchQueries: [{ query: FETCH_BOARDS }],
        });
      } catch (error) {
        console.error(error);
        alert("삭제 중 문제가 발생했습니다.");
      }
    };

    const onClickRouter = (boardId: string) => {
      router.push(`/boards/${boardId}`); // 클릭한 게시글의 id로 이동
    };

    return (
        <div className={styles.main}>
            <div className={styles.table}>
                <div className={`${styles.table_text} ${styles.textNumber}`}>번호</div>
                <div className={`${styles.table_text} ${styles.text_start}`}>제목</div>
                <div className={`${styles.table_text} ${styles.text_center}`}>작성자</div>
                <div className={`${styles.table_text} ${styles.text_center}`}>날짜</div>
            </div>
            <div className={styles.listP}>
                {data?.fetchBoards.map((el: { _id: string; writer: string; title: string; createdAt: string }, index: number) => (
                    <div key={el._id} className={`${styles.table} ${styles.contents}`} onClick={() => onClickRouter(el._id)}>
                        <div className={`${styles.contentNumber} ${styles.textNumber}`}>{index + 1}</div>
                        <div className={`${styles.contentTitle} ${styles.text_start}`}>{el.title}</div>
                        <div className={`${styles.contentWriter} ${styles.text_center}`}>{el.writer}</div>
                        <div className={`${styles.contentNumber} ${styles.text_center}`}>{new Date(el.createdAt).toLocaleDateString()}</div>
                        <button className={styles.delete}
                                onClick={(e) => {e.stopPropagation(); onClickDelete(el._id);}}></button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default BoardsList;