"use client"

import React from 'react';
import BoardsPage from '@/components/boards-list/list';
import PaginationPage from '@/components/boards-list/pagination';
import { useQuery } from '@apollo/client';
import { FETCH_BOARDS, FETCH_BOARDS_COUNT } from './queries';
import usePagination from '@/components/boards-list/pagination/hook';
import styles from "./styles.module.css";

export default function BoardsListPage () {  
    // 게시글 목록
    const { data, refetch } = useQuery(FETCH_BOARDS, {
        variables: { page: 1},
    })


    // 전체 게시글 개수
    const { data: boardsCountData } = useQuery(FETCH_BOARDS_COUNT);
    const boardsCount = boardsCountData?.fetchBoardsCount ?? 0; 
    const lastPage = Math.ceil(boardsCount / 10)
    const { startPage, currentPage, onClickPage, onClickPrevPage, onClickNextPage} = usePagination({
        refetch, lastPage })

    // const startIndex = (currentPage - 1) * 10;
    // const boardsWithNumber = data?.fetchBoards?.map((el, index) => ({
    //     ...el,
    //     boardNumber: boardsCount - (startIndex + index)
    // }));   



    return (
        <div className={styles.pageLayout}>
            <div className={styles.container}>
                <BoardsPage data={data?.fetchBoards} currentPage={currentPage} boardsCount={boardsCount}/>
                <PaginationPage 
                    refetch={refetch} 
                    lastPage={lastPage}
                />
            </div>
        </div>
    )
}