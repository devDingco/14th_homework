"use client"

import { ChangeEvent, useEffect, useState } from 'react'
import useBoardsCommentWrite from './hook'
import styles from './styles.module.css'
import { IOnChangeWriting } from './type'
import { BoardComment, FetchBoardCommentsQuery, Query } from '@/commons/gql/graphql'

interface IBoardsCommentWrite {
    getBoardComments: () => Promise<FetchBoardCommentsQuery | undefined>,
    comments: Query["fetchBoardComments"]
}

const BoardsCommentWrite = (props: IBoardsCommentWrite) => {

    const [commentWriter, setCommentWriter] = useState<string>("")
    const [commentPassword, setCommentPassword] = useState<string>("")
    const [commentContents, setCommentContents] = useState<string>("")
    const [commentWriterErr, setCommentWriterErr] = useState<string>("")
    const [commentPasswordErr, setCommentPasswordErr] = useState<string>("")
    const [commentContentsErr, setCommentContentsErr] = useState<string>("")

    const {
        creatingBoardComment, isActive, activeButton
    } = useBoardsCommentWrite({commentWriter, commentPassword, commentContents, getBoardComments: props.getBoardComments})

    const onChangeWriting = (props: IOnChangeWriting) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        switch (props.category) {
            case "작성자": {
                setCommentWriter(event.target.value)
                break
            }
            case "비밀번호": {
                setCommentPassword(event.target.value)
                break
            }
            case "내용": {
                setCommentContents(event.target.value)
                break
            }
            default:
        }
    }    

    const onClickCommentWrite = async () => {
        const forValArr = [commentWriter, commentPassword, commentContents]
        
        if (forValArr.includes("")) {
            for (let i=0; i < forValArr.length; i++) {
                switch(i) {
                    case 0: {
                        forValArr[i] === "" ?  setCommentWriterErr("필수입력 사항 입니다.") : setCommentWriterErr("")
                        break
                    }
                    case 1: {
                        forValArr[i] === "" ? setCommentPasswordErr("필수입력 사항 입니다.") : setCommentPasswordErr("")
                        break
                    }
                    case 2: {
                        forValArr[i] === "" ? setCommentContentsErr("필수입력 사항 입니다.") : setCommentContentsErr("")
                        break
                    }
                }
            }
        } else {
            setCommentWriterErr("")
            setCommentPasswordErr("")
            setCommentContentsErr("")
            // createComment 시작!
            console.log('createComment 시작!')
            creatingBoardComment()
        }
    }

    useEffect(()=>{
        activeButton({ commentWriter, commentContents, commentPassword})
    },[commentWriter, commentContents, commentPassword])

    return (
        <div id="comment_write" className={`${styles.comment_write_container} flex_column flex_justi_sb`}>
            <div className={`${styles.comment_icon} flex_row`}>
                <img src="/svg/chat.png" alt="comment"></img>
                <p className='sb_16_20'>댓글</p>
            </div>
            <div className={`${styles.comment_star} flex_row`}>
                <img src="/image/star.png" />
            </div>
            <section className={`${styles.comment_write_frame} flex_column`}>
                <div className={`${styles.comment_write_form_container} flex_column`}>
                    <form className={`${styles.comment_write_form_top} flex_row`}>
                        <div className={`${styles.input_frame_312w_80h} flex_column`}>
                            <label className={`${styles.label_312w_24h} me_16_24 flex_row`} style={{ whiteSpace: "nowrap" }}>작성자<p className={`me_16_24`} style={{ color:"rgba(246, 106, 106, 1)" }}>*</p></label>
                            <input className={`${styles.input_312w_48h} input_g_border_gray r_16_24`} onChange={onChangeWriting({ category: "작성자" })} placeholder='작성자 명을 입력해 주세요.'></input>
                            <p className={`me_16_24`} style={{ color: "rgba(246, 106, 106, 1)" }}>{commentWriterErr}</p>
                        </div>
                        <div className={`${styles.input_frame_312w_80h} flex_column`}>
                            <label className={`${styles.label_312w_24h} me_16_24 flex_row`} style={{ whiteSpace: "nowrap" }}>비밀번호<p className={`me_16_24`} style={{ color:"rgba(246, 106, 106, 1)" }}>*</p></label>
                            <input className={`${styles.input_312w_48h} input_g_border_gray r_16_24`} onChange={onChangeWriting({ category: "비밀번호" })} placeholder='비밀번호를 입력해 주세요.' type='password'></input>
                            <p className={`me_16_24`} style={{ color: "rgba(246, 106, 106, 1)" }}>{commentPasswordErr}</p>
                        </div>
                    </form>
                    <form id="comment_write_contents">
                        <textarea id="comment_write_contents" className={`${styles.comment_write_form_bottom} input_g_border_gray r_16_24`} onChange={onChangeWriting({ category: "내용" })} placeholder='댓글을 입력해 주세요.'>

                        </textarea>
                        <p className={`me_16_24`} style={{ color: "rgba(246, 106, 106, 1)" }}>{commentContentsErr}</p>
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