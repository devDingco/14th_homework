import { useEffect, useState } from "react"
import useBoardCommentList from "./hook"
import { FetchBoardCommentsQuery, Query } from "@/commons/gql/graphql"
import styles from './styles.module.css'

interface IBoardsCommentList {
    getBoardComments: () => Promise<FetchBoardCommentsQuery | undefined>,
    comments: Query["fetchBoardComments"]
}

const BoardsCommentList = (props: IBoardsCommentList) => {
    const {         
        updateBoardComments,
        deleteBoardComments
    } = useBoardCommentList()
    
    useEffect(()=>{
        (async ()=>{
            await props.getBoardComments()
        })()
    },[])

    useEffect(()=>{
        console.log('댓글 조회 : ', props.comments)
    },[props.comments])

    const onClickCommentDeleteHandler = async (event: React.MouseEvent<HTMLImageElement>) => {
        await deleteBoardComments(event)
        await props.getBoardComments()
    }

    const onClickCommentUpdateHandler = async (event: React.MouseEvent<HTMLImageElement>) => {
        await updateBoardComments(event)
        await props.getBoardComments()
    }

    return (
        <ul id="comment_list_frame">
            {props.comments.length === 0 
                ? 
                <div className="flex_row flex_justi_center">
                    <p className="r_14_20" style={{ color: "rgba(119, 119, 119, 1)" }}>등록된 댓글이 없습니다.</p>
                </div>
                : 
                props.comments.map((v, i)=>{
                    return <>
                                <li key={i} data-key={v._id}className={`${styles.comment_frame} flex_column flex_justi_sb`}>
                                    <div className={`flex_row flex_justi_sb`}>
                                        <div className={`${styles.comment_profile} flex_row flex_align_items_center`}>
                                            <div className={`${styles.comment_profile_frame} flex_row`}>
                                                <img className={`${styles.profile_img}`} src="/svg/person.png" alt="profile"/>
                                                <p className="l_14_20 flex_row flex_justi_center flex_align_items_center" style={{ whiteSpace: "nowrap" }}>{v.writer}</p>
                                            </div>
                                            <div className={`${styles.commnt_star} flex_row`}>
                                                <img src="/image/star.png" />
                                                <img src="/image/star.png" />
                                                <img src="/image/star.png" />
                                                <img src="/image/star.png" />
                                                <img src="/image/star.png" />
                                            </div>
                                        </div>
                                        <div className={`${styles.comment_btn_frame} flex_row flex_justi_sb`}>
                                            <img data-key={v._id} src="/svg/edit.png" alt="edit_comment" style={{ cursor: "pointer" }} onClick={onClickCommentUpdateHandler}/>
                                            <img data-key={v._id} src="/svg/close.png" alt="delete_comment" style={{ cursor: "pointer" }} onClick={onClickCommentDeleteHandler}/>
                                        </div> 
                                    </div>                            
                                    <div><p className="r_16_24" style={{ whiteSpace: "pre-line", color: "rgba(51, 51, 51, 1)" }}>{`${v.contents}`}</p></div>
                                    <div><p className="r_14_20" style={{ color: "rgba(129, 129, 129, 1)" }} >{v.createdAt.split("T")[0]}</p></div>
                                </li>
                                {i+1 !== props.comments.length ? <div className={`${styles.comment_line}`}></div> : null}
                            </>
                })
            }
        </ul>
    )
}

export default BoardsCommentList