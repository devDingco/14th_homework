"use client"

import React from 'react';
import styles from "./styles.module.css";
import { useBoardList } from './hook';
// import { IBoard, IUseBoardList } from './types';
import { FetchBoardsQuery } from '@/commons/gql/graphql';

const BoardsList = () => {
    const {data, onClickDelete, onClickRouter} = useBoardList()

    return (
        <div className={styles.main}>
            <div className={styles.table}>
                <div className={`${styles.table_text} ${styles.textNumber}`}>번호</div>
                <div className={`${styles.table_text} ${styles.text_start}`}>제목</div>
                <div className={`${styles.table_text} ${styles.text_center}`}>작성자</div>
                <div className={`${styles.table_text} ${styles.text_center}`}>날짜</div>
            </div>
            <div className={styles.listP}>
                {data?.fetchBoards?.map((el: NonNullable<FetchBoardsQuery["fetchBoards"]>[number], index) => (
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