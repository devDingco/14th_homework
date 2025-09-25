"use client"

import BoardListBannerPage from "@/commons/layout/banner"
import BoardsPage from "@/components/board-list/list"
import Pagination from "@/components/board-list/pagination"

import style from "../../components/board-list/list/style.module.css"
import { FetchBoardsDocument, FetchBoardsQuery, FetchBoardsQueryVariables } from "@/commons/graphql/graphql"
import { useQuery } from "@apollo/client"
import { FETCH_BOARDS_COUNT } from "@/components/board-list/pagination/queries"
import { FETCH_BOARDS } from "@/components/board-list/list/queries"
import Search from "@/components/board-list/search/page"
import { useState } from "react"


export default function Boardpage() {
     const [keyword, setKeyword] = useState("")
    const { data, refetch } = useQuery(FETCH_BOARDS
    )
    const { data: dataCount } = useQuery(FETCH_BOARDS_COUNT)
    const lastPage = Math.ceil((dataCount?.fetchBoardsCount ?? 10) / 10)

    return (
        <div className={style.page}>

            <div className={style.boards}>
                <Search  refetch={refetch} setKeyword={setKeyword}/>
                <BoardsPage data={data?.fetchBoards} keyword={keyword} refetch={refetch}/>
                <Pagination refetch={refetch} lastPage={lastPage} />
            </div>
        </div>
    )
}