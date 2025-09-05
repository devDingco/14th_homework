"use client"

import { gql, useQuery } from '@apollo/client'
import styles from './style.module.css'

const FETCH_BOARDS = gql`
    query fetchBoards($page: Int!) {
        fetchBoards(page: $page) {
                _id
                title
                writer
                contents
                createdAt
        }
    }
`

const FETCH_BOARDS_COUNT = gql`
    query {
        fetchBoardsCount(startDate: "2019-12-03T09:54:33Z", endDate: "2025-12-03T09:54:33Z")
    }
`

interface IFetchBoardsData {
    fetchBoards: {
        _id: string,
        title: string,
        writer?: string,
        contents: string,
        createdAt: string
    }[]
}

interface IFetchBoardsCount {
    fetchBoardsCount: number
}

const Boards = () => {
    let boardsData: IFetchBoardsData
    let boardsCount: IFetchBoardsCount

    boardsData = useQuery(FETCH_BOARDS, {
        variables: {
            // 하드코딩
            page: 1
        }
    }).data

    boardsCount = useQuery(FETCH_BOARDS_COUNT).data
    
    console.log(boardsData?.fetchBoards)
    console.log(boardsCount?.fetchBoardsCount)

    return (
        <div id="main" className={`${styles.list_main}`}>
            <div className={`${styles.board_list_frame}`}>
                <div className={`${styles.board_list_container}`}>
                    <div className={`${styles.board_list_top}`}>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div className={`${styles.board_list_bottom}`}>
                        {/* map */}
                        {boardsData?.fetchBoards.map((v,i)=>{
                            return  <div key={i}>{boardsCount?.fetchBoardsCount-i} {v.title} {v.writer} {v.createdAt.split("T")[0]}</div>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Boards