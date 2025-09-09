"use client"

import styles from './style.module.css'
import useBoardsListPage from './hook'

const BoardsList = () => {
    
    const {
        goDetailHandler,
        onDeleteHanlder,
        boardsData
    } = useBoardsListPage()

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

export default BoardsList