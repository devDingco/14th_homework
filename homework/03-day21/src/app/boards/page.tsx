"use client"

import React, { useEffect, useState } from 'react';
import BoardsPage from '@/components/boards-list/list';
import PaginationPage from '@/components/boards-list/pagination';
import { useQuery } from '@apollo/client';
import { FETCH_BOARDS, FETCH_BOARDS_COUNT } from './queries';
import usePagination from '@/components/boards-list/pagination/hook';
import styles from "./styles.module.css";
import SearchBoardPage from '@/components/boards-list/search';

export default function BoardsListPage () {  
    const [keyword, setKeyword] = useState("")    
    const [page, setPage] = useState(1)  // 현재 페이지 관리

    // 게시글 목록
    const { data, refetch } = useQuery(FETCH_BOARDS, {
        variables: { page, search: ""},
    })

    // 전체 게시글 개수
    const { data: boardsCountData } = useQuery(FETCH_BOARDS_COUNT, {
        variables: { search: keyword }, // 검색어 기준으로 개수도 맞춤
    });
    const boardsCount = boardsCountData?.fetchBoardsCount ?? 0; 
    const lastPage = Math.ceil(boardsCount / 10)

    // 페이지네이션 훅
    const { startPage, currentPage, onClickPage, onClickPrevPage, onClickNextPage} = usePagination({
        lastPage,
        refetch: ({ page }) => refetch({ page, search: keyword }),  // ✅ keyword 포함해서 전달
    })

    // keyword가 바뀌면 page를 1로 초기화하고 refetch
    useEffect(() => {
        setPage(1)
        refetch({ page: 1, search: keyword })
    }, [keyword, refetch])

    return (
        <div className={styles.pageLayout}>
            <div className={styles.container}>
                <SearchBoardPage 
                    keyword={keyword} 
                    setKeyword={setKeyword} 
                    refetch={refetch}
                />
                <BoardsPage 
                    data={data?.fetchBoards} 
                    currentPage={currentPage} 
                    boardsCount={boardsCount}
                    keyword={keyword}   // 여기서 전달
                />
                <PaginationPage 
                     lastPage={lastPage}
                     refetch={refetch}
                />
            </div>
        </div>
    )
}