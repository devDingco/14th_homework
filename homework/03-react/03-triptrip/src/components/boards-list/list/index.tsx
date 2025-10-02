"use client"

import React from 'react';
import styles from "./styles.module.css";
import { IBoardsPageProps, IFetchBoard } from './types';
import useBoardsPage from './hook';


export default function BoardsPage (props:IBoardsPageProps ) {
    const keyword = props.keyword || ""  // undefined 방지
    
    const {
        data,
        boardsCount,
        onClickBoard,
        onClickDelete,
    } = useBoardsPage()

    const currentPage = props.currentPage || 1
    const totalCount = props.boardsCount || boardsCount
    

    return (        
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
                    {(props.data || data?.fetchBoards || [])?.map((el:IFetchBoard, index: number) => {
                        return(
                            <div 
                                key={el._id} 
                                id={el._id}
                                className={styles.boardsListRow} 
                                onClick={() => onClickBoard(el._id)}
                            >
                                <p>{totalCount - ((currentPage -1)  * 10 + index )}</p> {/* 게시글 번호 */}
                                <p>{el.title
                                        .replaceAll(keyword, `#$%${keyword}#$%`)
                                        .split("#$%")
                                        .map((text, idx) => (
                                            <span key={idx} style={{ color: text === keyword ? 'red' : 'black' }}>
                                                {text}
                                            </span>
                                        ))
                                        }</p>
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
    

        
    )
}