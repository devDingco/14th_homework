import { useEffect } from "react"
import useBoardCommentList from "./hook"
import styles from './styles.module.css'
import { Rate } from 'antd'
import { IBoardsCommentList } from "./type"
import InfiniteScroll from 'react-infinite-scroll-component'
import BoardsCommentWrite from "../comment-write"
import { useIsBoardDetail } from "@/commons/provider/isBoardDetailProvider"

const BoardsCommentList = (props: IBoardsCommentList) => {
    const { isCommentEdit } = useIsBoardDetail()

    const { setCommentInput, commentInput } = useIsBoardDetail()

    const {         
        onClickCommentDeleteHandler, onClickCommentUpdateHandler, scrollInfiniteFetchComments, hasMore
    } = useBoardCommentList()

    useEffect(()=>{
        console.log('댓글 조회 : ', props.boardComments)
    },[props.boardComments])

    useEffect(()=>{
        console.log('commentInput: ',commentInput)
    },[commentInput])
    return (
        <>
            <ul id="comment_list_frame">
                {
                    props.boardComments
                    ?
                    <InfiniteScroll
                        dataLength={props.boardComments?.length} //This is important field to render the next data
                        next={() => scrollInfiniteFetchComments({boardCommentsFetchMore:props.boardCommentsFetchMore, boardComments:props.boardComments})}
                        hasMore={hasMore}
                        loader={<h4 style={{ textAlign: 'center' }}>Loading...</h4>}
                        endMessage={
                        <p style={{ textAlign: 'center' }}>
                            <b>보여줄 내용이 없어요!</b>
                        </p>
                        }
                    >
                    {props.boardComments?.length === 0 
                        ? 
                        <div className="flex_row flex_justi_center">
                            <p className="r_14_20" style={{ color: "rgba(119, 119, 119, 1)" }}>등록된 댓글이 없습니다.</p>
                        </div>
                        : 
                        props.boardComments?.map((v, i)=>{
                            return  ( 
                                isCommentEdit.commentId === i && isCommentEdit.isUpdate
                                ?
                                <>
                                    <BoardsCommentWrite updatingInput={v} boardCommentId={v._id}/>
                                    {i+1 !== props.boardComments?.length ? <div className={`${styles.comment_line}`}></div> : null}
                                </>
                                :
                                <>
                                    <li key={i} data-key={v._id}className={`${styles.comment_frame} flex_column flex_justi_sb`}>
                                        <div className={`flex_row flex_justi_sb`}>
                                            <div className={`${styles.comment_profile} flex_row flex_align_items_center`}>
                                                <div className={`${styles.comment_profile_frame} flex_row`}>
                                                    <img className={`${styles.profile_img}`} src="/svg/person.png" alt="profile"/>
                                                    <p className="l_14_20 flex_row flex_justi_center flex_align_items_center" style={{ whiteSpace: "nowrap" }}>{v.writer}</p>
                                                </div>
                                                <div className={`${styles.commnt_star} flex_row`}>
                                                    <Rate value={v.rating} disabled/>
                                                </div>
                                            </div>
                                            <div className={`${styles.comment_btn_frame} flex_row flex_justi_sb`}>
                                                <img id={String(i)} data-key={v._id} src="/svg/edit.png" alt="edit_comment" style={{ cursor: "pointer" }} 
                                                    onClick={(event) => { 
                                                        setCommentInput({
                                                            writer: v.writer,
                                                            password: "",
                                                            rating: v.rating,
                                                            contents: v.contents
                                                        })
                                                        onClickCommentUpdateHandler({event: event, boardComment: v}) 
                                                    }}/>
                                                <img data-key={v._id} src="/svg/close.png" alt="delete_comment" style={{ cursor: "pointer" }} onClick={(event) => {onClickCommentDeleteHandler({event:event, page: Math.ceil((props.boardComments?.length ?? 10) / 10)})}}/>
                                            </div> 
                                        </div>                            
                                        <div><p className="r_16_24" style={{ whiteSpace: "pre-line", color: "rgba(51, 51, 51, 1)" }}>{`${v.contents}`}</p></div>
                                        <div><p className="r_14_20" style={{ color: "rgba(129, 129, 129, 1)" }} >{v.createdAt.split("T")[0]}</p></div>
                                    </li>
                                    {i+1 !== props.boardComments?.length ? <div className={`${styles.comment_line}`}></div> : null}
                                </>
                            )
                        })
                    }
                    </InfiniteScroll>
                    : null
                }            
            </ul>
        </>
    )
}

export default BoardsCommentList