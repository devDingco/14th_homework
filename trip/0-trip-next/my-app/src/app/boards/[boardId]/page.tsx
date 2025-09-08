"use client";

import React from 'react';
import styles from "./styles.module.css"; // 스타일 다 바꿔주기 - 형식 맞게
import { useParams, useRouter } from 'next/navigation';
import { gql, useQuery } from '@apollo/client';

const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      writer
      title
      contents
      youtubeUrl
      likeCount
      dislikeCount
      createdAt
      updatedAt
    }
  }
`;

const BoardsDetail = () => {
    const router = useRouter();

    const params = useParams(); // { boardId: "..." }
    console.log(params)

    const { data } = useQuery(FETCH_BOARD, {
      variables: {
        boardId: params.boardId,
      },
      skip: !params.boardId, // boardId 없으면 쿼리 안날림
    });

    const formatDate = (isoString: string) => {
        const date = new Date(isoString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}.${month}.${day}`;
      };

      const handleRouter = () => {
        if (!data?.fetchBoard?._id) {
          alert("게시글 ID를 불러오지 못했습니다.");
          return;
        }
      
        router.push(`/boards/${data.fetchBoard._id}/edit`);
      };


    return (
        <div className={styles.게시물상세화면}>
            <div className={styles.Title}>{data?.fetchBoard.title}</div>
            <div className={styles.writerDate}>
                <div className={styles.writerP}>
                    <div className={`${styles.icon} ${styles.writerIcon}`}></div>
                    <div className={styles.writer}>{data?.fetchBoard.writer}</div>
                </div>
                <div className={styles.Date}>{data?.fetchBoard.createdAt && formatDate(data.fetchBoard.createdAt)}</div>
            </div>
            <div className={styles.icons}>
                <div className={`${styles.icon} ${styles.link}`}></div>
                <div className={`${styles.icon} ${styles.location}`}></div>
            </div>
            <div className={styles.사진}></div>
            <div className={styles.Content}>
                {data?.fetchBoard.contents}
            </div>
            <div className={styles.VideoP}>
                <div className={styles.exampleVideo}></div>
            </div>
            <div className={styles.heartP}>
                <div className={styles.heart}>
                    <div className={`${styles.icon} ${styles.brokenHeart}`}></div>
                    <div className={styles.badNumber}>{data?.fetchBoard.dislikeCount}</div>
                </div>
                <div className={styles.heart}>
                    <div className={`${styles.icon} ${styles.redHeart}`}></div>
                    <div className={styles.goodNumber}>{data?.fetchBoard.likeCount}</div>
                </div>
            </div>
            <div className={styles.buttons}>
                <button className={styles.버튼들}>
                    <div className={`${styles.icon} ${styles.목록으로}`}></div>
                    <div className={styles.btnText}>목록으로</div>
                </button>
                <button className={styles.버튼들} onClick={handleRouter}>
                <div className={`${styles.icon} ${styles.수정하기}`}></div>
                <div className={styles.btnText}>수정하기</div>
                </button>
            </div>
        </div>
        
    )
}

export default BoardsDetail;