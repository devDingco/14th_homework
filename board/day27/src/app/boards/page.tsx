"use client"

import BoardListBannerPage from "@/commons/layout/banner"
import BoardsPage from "@/components/board-list/list"
import Pagination from "@/components/board-list/pagination"

import style from "../../components/board-list/list/style.module.css"
import { FetchBoardsDocument, FetchBoardsQuery, FetchBoardsQueryVariables } from "@/commons/graphql/graphql"
import { useQuery } from "@apollo/client"
import { FETCH_BOARDS_COUNT } from "@/components/board-list/pagination/queries"
import { FETCH_BOARDS } from "@/components/board-list/list/queries"


export default function Boardpage() {
    const { data, refetch } = useQuery(FETCH_BOARDS
    )
    const { data: dataCount} = useQuery(FETCH_BOARDS_COUNT)
    const lastPage = Math.ceil((dataCount?.fetchBoardsCount ?? 10) / 10)

    return (
        <div className={style.page}>

            <div className={style.boards}>
                <BoardsPage data={data?.fetchBoards}/>
                <Pagination refetch={refetch} lastPage={lastPage}/>
            </div>
        </div>
    )
}