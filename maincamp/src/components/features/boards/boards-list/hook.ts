import { FETCH_BOARDS_AND_COUNT } from "@/graphql/queries/board";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IUseBoardsList } from "./types";
import { FetchBoardsAndCountDocument, FetchBoardsAndCountQueryVariables } from "@/commons/graphql/graphql";

export default function useBoardsList (): IUseBoardsList {
    
    const [currentPage, setCurrentPage] = useState(1)
    const { data, loading } = useQuery<FetchBoardsAndCountQueryVariables>(FetchBoardsAndCountDocument, {
        variables:{
            page: currentPage,
        },
        fetchPolicy: 'cache-and-network' // 새로고침 ..! 
    })
        
    const router = useRouter();

    const changeCurrentPage = (newNum: number) => {
        setCurrentPage(newNum)
    }

    const onClickBoardsNew = () => {
        router.push('/boards/new')
    }




    // data가 안불러져왔거나 없을 때의 기본 반환값 설정 필요
    if(!data) {
        return{
            fetchBoards: [],
            fetchBoardsCount: 0,
            flex: [],
            textAlign: [] as CanvasTextAlign[] ,
            pageNum : [1],
            changeCurrentPage,
            onClickBoardsNew,
            currentPage,
            loading,
    
        }

    }
    const {fetchBoards, fetchBoardsCount} = data
    

    const flex = ["4", "53", "6.25", "6.25"]
    const textAlign = ['center', 'left', 'center', 'center'] as CanvasTextAlign[]
    const numArray = new Array(10).fill(1)
    const pageNum = numArray.map((el, index) => {
        return(fetchBoardsCount - (currentPage - 1)*10 - index)
    })

    // console.log(`총 게시글 수: ${fetchBoardsCount}, 현재페이지: ${currentPage}, 현재페이지의 게시글 번호: ${pageNum}`)
    // console.log("목록페이지 current" + currentPage)

    
    return{changeCurrentPage, fetchBoards, fetchBoardsCount, onClickBoardsNew, flex, textAlign, pageNum, currentPage, loading}
}