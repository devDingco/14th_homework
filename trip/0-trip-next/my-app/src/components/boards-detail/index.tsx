"use client";

import React from 'react';
import styles from "./styles.module.css";
import { useBoardsDetail } from '@/components/boards-detail/hook';

const BoardsDetail = () => {

  const {data, handleRouter, formatDate} = useBoardsDetail()

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