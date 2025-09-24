"use client"

import styles from './styles.module.css'
import useBoardsListPage from './hook'
import { FetchBoardsQuery } from '@/commons/gql/graphql'

interface IBoardsList {
    boards: FetchBoardsQuery["fetchBoards"] | undefined
}

const BoardsList = (props: IBoardsList) => {

    const {
        goDetailHandler,
        onDeleteHanlder,
    } = useBoardsListPage()

    return (
        <ul className={`${styles.board_list_bottom} flex_column`}>
            {/* map */}
            {props.boards?.map((v:any, i:number) => {
                // return  <div key={i}>{boardsCount?.fetchBoardsCount-i} {v.title} {v.writer} {v.createdAt.split("T")[0]}</div>
                return  <li key={i} data-key={v._id} onClick={goDetailHandler} className='flex_row'>
                            <div style={{ cursor: "pointer" }} className='flex_row flex_justi_center'><p className='l_14_20' style={{ color: "rgba(145, 145, 145, 1)" }}>{i+1}</p></div> 
                            <div style={{ cursor: "pointer" }}><p className='me_14_20' style={{ color: "rgba(28, 28, 28, 1)" }}>{v.title}</p></div> 
                            <div style={{ cursor: "pointer" }} className='flex_row flex_justi_center l_14_20'><p style={{ color: "rgba(51, 51, 51, 1)" }}>{v.writer}</p></div> 
                            <div style={{ cursor: "pointer" }} className='flex_row flex_justi_center l_14_20'><p style={{ color: "rgba(145, 145, 145, 1)" }}>{v.createdAt.split("T")[0]}</p></div>
                            <img data-key={v._id} className={`${styles.board_list_del_btn}`} onClick={onDeleteHanlder} src="/svg/delete.png" alt="delete"/>
                        </li>
            })}
        </ul>
    )
}

export default BoardsList