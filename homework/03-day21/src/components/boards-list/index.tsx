"use client"

import React from 'react';
import styles from "./styles.module.css";
import { IBoardsPageProps, IFetchBoard } from './types';
import useBoardsPage from './hook';


export default function BoardsPage (props:IBoardsPageProps ) {
    const {
        data,
        onClickBoard,
        onClickDelete,
        boardsCount,
    } = useBoardsPage()
    

    return (
        <div className={styles.layout}>
            <div className={styles.container}>
                <div className={styles.boardsContainer}>
                    <div className={styles.boardsList}>
                        <div className={styles.boardsListHeader}>
                            <p>번호</p>
                            <p>제목</p>
                            <p>작성자</p>
                            <p>날짜</p>
                        </div>
                        <div className={styles.boardsListBody}>
                            {/* 게시글 목록 자리 */}
                            {data?.fetchBoards?.map((el:IFetchBoard, index: number) => {
                                return(
                                    <div 
                                        key={el._id} 
                                        id={el._id}
                                        className={styles.boardsListRow} 
                                        onClick={() => onClickBoard(el._id)}
                                    >
                                        <p>{boardsCount - index}</p> {/* 게시글 번호 */}
                                        <p>{el.title}</p>
                                        <p>{el.writer}</p>
                                        <p>{new Date(el.createdAt).toLocaleDateString("ko-KR")}</p>

                                        <div
                                            className={styles.deleteButton} 
                                            onClick={(event) => {
                                                onClickDelete(event, el._id)
                                            }} 
                                        >
                                            <img className={styles.iconImage} src="/images/delete.png" alt="삭제아이콘"/>
                                        </div>
                                    </div>
                                )
                            })}
                            
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}