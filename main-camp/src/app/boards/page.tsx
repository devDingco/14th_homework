"use client"

import BoardsList from "@/components/boards-list/list"
import styles from './styles.module.css'
import useFetchBoards from "@/commons/api/query/useFetchBoards"
import useFetchBoardsCount from "@/commons/api/query/useFetchBoardsCount"
import ListPagination from "@/components/boards-list/pagination"

const BoardsListPage = () => {
    const { boards, boardsRefetch } = useFetchBoards()
    const { boardsCount } = useFetchBoardsCount()
    const lastPage = Math.ceil(boardsCount ?? 10 / 10)

    return (
        <div id="main" className={`${styles.boards_main}`}>
            <div className={`${styles.board_list_frame} flex_column flex_align_items_center flex_justi_center`}>
                <div className={`${styles.board_list_container} flex_column`}>
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
                    <BoardsList boards={boards}/>
                    <ListPagination boardsCount={boardsCount} lastPage={lastPage} boardsRefetch={boardsRefetch}/>
                </div>
            </div>
        </div>
    )
}

export default BoardsListPage