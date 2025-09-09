"use client"

import { gql, useMutation, useQuery } from '@apollo/client'
import styles from './style.module.css'
import { useRouter } from 'next/navigation'

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

const DELETE_BOARD = gql`
    mutation deleteBoard($boardId: ID!) {
        deleteBoard(boardId: $boardId)
    }
`

// 게시글 전체 번호 조회
// const FETCH_BOARDS_COUNT = gql`
//     query {
//         fetchBoardsCount(startDate: "2019-12-03T09:54:33Z", endDate: "2025-12-03T09:54:33Z")
//     }
// `

interface IFetchBoardsData {
    fetchBoards: {
        _id: string,
        title: string,
        writer?: string,
        contents: string,
        createdAt: string
    }[]
}

// interface IFetchBoardsCount {
//     fetchBoardsCount: number
// }

const BoardsListPage = () => {
    const router = useRouter()

    const [deleteBoard] = useMutation(DELETE_BOARD)

    let boardsData: IFetchBoardsData
    // let boardsCount: IFetchBoardsCount

    boardsData = useQuery(FETCH_BOARDS, {
        variables: {
            // 하드코딩
            page: 1
        }
    }).data

    // boardsCount = useQuery(FETCH_BOARDS_COUNT).data
    
    console.log(boardsData?.fetchBoards)
    // console.log(boardsCount?.fetchBoardsCount)

    const goDetailHandler = (event: any) => {


        router.push(`/boards/${event.currentTarget.dataset.key}`)
    }

    const onDeleteHanlder = async (event: any) => {
        console.log(event.currentTarget.dataset.key)
        
        try {
            const result = await deleteBoard({
                variables: {
                    boardId : event.currentTarget.dataset.key
                },
                refetchQueries: [
                    { query: FETCH_BOARDS, variables: { page: 1 } }
                ]
            })
            console.log("삭제한 게시글 ID: ",result.data.deleteBoard)
            alert("게시글이 삭제되었습니다!")
        } catch(e) {
            console.log(e)
        }
    }

    return (
        <div id="main" className={`${styles.list_main}`}>
            <div className={`${styles.board_list_frame} flex_column flex_align_items_center`}>
                <div className={`${styles.board_list_container}`}>
                    <div className={`${styles.board_list_top} flex_row`}>
                        <div className='flex_row flex_justi_center'>
                            <p className='me_16_20' style={{ color: "rgba(28, 28, 28, 1)" }}>번호</p>
                        </div>
                        <div>
                            <p className='me_16_20' style={{ color: "rgba(28, 28, 28, 1)" }}>제목</p>
                        </div>
                        <div className='flex_row flex_justi_center'>
                            <p className='me_16_20' style={{ color: "rgba(28, 28, 28, 1)" }}>작성자</p>
                        </div>
                        <div className='flex_row flex_justi_center'>
                            <p className='me_16_20' style={{ color: "rgba(28, 28, 28, 1)" }}>날짜</p>
                        </div>
                    </div>
                    <ul className={`${styles.board_list_bottom} flex_column`}>
                        {/* map */}
                        {boardsData?.fetchBoards.map((v,i)=>{
                            // return  <div key={i}>{boardsCount?.fetchBoardsCount-i} {v.title} {v.writer} {v.createdAt.split("T")[0]}</div>
                            return  <li key={i} className='flex_row'>
                                        <div className='flex_row flex_justi_center'><p className='l_14_20' style={{ color: "rgba(145, 145, 145, 1)" }}>{i+1}</p></div> 
                                        <div data-key={v._id} onClick={goDetailHandler} style={{ cursor: "pointer" }}><p className='me_14_20' style={{ color: "rgba(28, 28, 28, 1)" }}>{v.title}</p></div> 
                                        <div className='flex_row flex_justi_center l_14_20'><p style={{ color: "rgba(51, 51, 51, 1)" }}>{v.writer}</p></div> 
                                        <div className='flex_row flex_justi_center l_14_20'><p style={{ color: "rgba(145, 145, 145, 1)" }}>{v.createdAt.split("T")[0]}</p></div>
                                        <img data-key={v._id} className={`${styles.board_list_del_btn}`} onClick={onDeleteHanlder} src="/svg/delete.png" alt="delete"/>
                                    </li>
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default BoardsListPage