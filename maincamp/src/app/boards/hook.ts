import { useQuery } from "@apollo/client";
import { useState } from "react";
import {  FetchBoardsCountDocument, FetchBoardsDocument, FetchBoardsQuery, FetchBoardsQueryVariables } from "@/commons/graphql/graphql";

export default function useBoards () {

    // 게시글 리스트 요청 API 및 게시글 개수 요청 API
    const { data, refetch } = useQuery<FetchBoardsQuery, FetchBoardsQueryVariables>(FetchBoardsDocument, {fetchPolicy: "cache-and-network"});
    const { data: dataBoardsCount } = useQuery(FetchBoardsCountDocument)

    // 현재 페이지 공유를 위한 현재 페이지 state 설정 및 페이지 그룹 당 페이지 수 설정
    const [currentPage, setCurrentPage] = useState(1)
    const rowsPerPage = 10
    const numPerPageGroup = 5

    // 페이지네이션 마지막 페이지 계산
    const lastPage = Math.ceil((dataBoardsCount?.fetchBoardsCount ?? rowsPerPage) / rowsPerPage )

    // 게시글 번호 계산을 위한 배열 생성
    const numArray = new Array(10).fill(1)
    const pageNum = numArray.map((el, index) => {
        if(dataBoardsCount)
        return(dataBoardsCount?.fetchBoardsCount - ( currentPage - 1 )*10 - index)
    })
    

    
    return{ data, numPerPageGroup, lastPage, refetch, pageNum, currentPage, setCurrentPage }
}