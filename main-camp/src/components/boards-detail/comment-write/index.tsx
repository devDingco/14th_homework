"use client"

import { useEffect, useState } from 'react'
import useBoardsCommentWrite from './hook'
import styles from './styles.module.css'
import { CreateBoardCommentInput } from '@/commons/gql/graphql'
import { Rate } from 'antd'
import { ICommentErr } from './type'

const BoardsCommentWrite = () => {

    const [commentInput, setCommentInput] = useState<CreateBoardCommentInput>({
        writer: "",
        contents: "",
        password: "",
        rating: 1,
    })

    const [commentErr, setCommentErr] = useState<ICommentErr>({
        commentWriterErr: "",
        commentPasswordErr: "",
        commentContentsErr: ""
    })

    const {
        isActive, activeButton, onChangeWriting, onClickCommentWrite, chooseStar
    } = useBoardsCommentWrite({setCommentInput, commentInput, setCommentErr})    

    useEffect(()=>{
        activeButton(commentInput)
    },[commentInput.writer, commentInput.password, commentInput.contents])

    return (
        <div id="comment_write" className={`${styles.comment_write_container} flex_column flex_justi_sb`}>
            <div className={`${styles.comment_icon} flex_row`}>
                <img src="/svg/chat.png" alt="comment"></img>
                <p className='sb_16_20'>댓글</p>
            </div>
            <div className={`${styles.comment_star} flex_row`}>
                {/* <img src="/image/star.png" /> */}
                <Rate onChange={chooseStar} value={commentInput.rating}/>
            </div>
            <section className={`${styles.comment_write_frame} flex_column`}>
                <div className={`${styles.comment_write_form_container} flex_column`}>
                    <form className={`${styles.comment_write_form_top} flex_row`}>
                        <div className={`${styles.input_frame_312w_80h} flex_column`}>
                            <label className={`${styles.label_312w_24h} me_16_24 flex_row`} style={{ whiteSpace: "nowrap" }}>작성자<p className={`me_16_24`} style={{ color:"rgba(246, 106, 106, 1)" }}>*</p></label>
                            <input className={`${styles.input_312w_48h} input_g_border_gray r_16_24`} onChange={onChangeWriting({ category: "작성자" })} placeholder='작성자 명을 입력해 주세요.' value={commentInput.writer || ""}></input>
                            <p className={`me_16_24`} style={{ color: "rgba(246, 106, 106, 1)" }}>{commentErr.commentWriterErr}</p>
                        </div>
                        <div className={`${styles.input_frame_312w_80h} flex_column`}>
                            <label className={`${styles.label_312w_24h} me_16_24 flex_row`} style={{ whiteSpace: "nowrap" }}>비밀번호<p className={`me_16_24`} style={{ color:"rgba(246, 106, 106, 1)" }}>*</p></label>
                            <input className={`${styles.input_312w_48h} input_g_border_gray r_16_24`} onChange={onChangeWriting({ category: "비밀번호" })} placeholder='비밀번호를 입력해 주세요.' type='password' value={commentInput.password || ""}></input>
                            <p className={`me_16_24`} style={{ color: "rgba(246, 106, 106, 1)" }}>{commentErr.commentPasswordErr}</p>
                        </div>
                    </form>
                    <form id="comment_write_contents">
                        <textarea id="comment_write_contents" className={`${styles.comment_write_form_bottom} input_g_border_gray r_16_24`} onChange={onChangeWriting({ category: "내용" })} placeholder='댓글을 입력해 주세요.' value={commentInput.contents || ""}>

                        </textarea>
                        <p className={`me_16_24`} style={{ color: "rgba(246, 106, 106, 1)" }}>{commentErr.commentContentsErr}</p>
                    </form>
                </div>
                <button className={`${styles.comment_resist_btn} flex_align_self_flexend`} onClick={onClickCommentWrite} style={{ background: isActive === true ? "rgba(41, 116, 229, 1)" : "rgba(199, 199, 199, 1)" }}>
                    <p className='sb_18_24' style={{ color: "rgba(228, 228, 228, 1)", whiteSpace: "nowrap" }}>댓글 등록</p>
                </button>
            </section>
        </div>
    )
}

export default BoardsCommentWrite