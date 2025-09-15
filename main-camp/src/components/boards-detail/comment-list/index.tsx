import { useEffect, useState } from "react"
import useBoardCommentList from "./hook"
import { FetchBoardCommentsQuery, Query } from "@/commons/gql/graphql"
import styles from './styles.module.css'

interface IBoardsCommentList {
    getBoardComments: () => Promise<FetchBoardCommentsQuery | undefined>,
    comments: Query["fetchBoardComments"]
}

const BoardsCommentList = (props: IBoardsCommentList) => {

    useEffect(()=>{
        (async ()=>{
            await props.getBoardComments()
        })()
    },[])

    useEffect(()=>{
        console.log('댓글 조회 : ', props.comments)
    },[props.comments])

    return (
        <ul id="comment_list">
            {props.comments.map((v)=>{
                return <li>
                            <div className={`flex_row`}>
                                <div className={`${styles.comment_profile} flex_row flex_align_items_center`}>
                                    <img className={`${styles.profile_img}`} src="/svg/person.png" alt="profile"/>
                                    <p className="l_14_20 flex_justi_center">{v.writer}</p>
                                </div>
                                <div className={`${styles.commnt_star} flex_row`}>
                                    <img src="/image/star.png" />
                                    <img src="/image/star.png" />
                                    <img src="/image/star.png" />
                                    <img src="/image/star.png" />
                                    <img src="/image/star.png" />
                                </div>
                            </div>
                            <div></div>{v.writer}, {v.contents}
                            <div><p>{v.contents}</p></div>
                            <div><p>{v.createdAt}</p></div>
                        </li>
            })}
        </ul>
    )
}

export default BoardsCommentList