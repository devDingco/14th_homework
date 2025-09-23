"use client"

import BoardsList from "@/components/boards-list/list"
import styles from './styles.module.css'
import useFetchBoards from "@/commons/api/useFetchBoards"
import { useState } from "react"
import { FetchBoardsQuery } from "@/commons/gql/graphql"

const BoardsListPage = () => {
    const { boards } = useFetchBoards()
    
    const [boardsData, setBoardsData] = useState<FetchBoardsQuery["fetchBoards"]>()

    return (
        <div id="main" className={`${styles.boards_main}`}>
            <BoardsList boards={boards}/>
        </div>
    )
}

export default BoardsListPage