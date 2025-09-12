"use client"

import styles from './style.module.css'
import WriteButton from './writeButton'
import WriteInput from './writeInput'
import { IOnUpdateHandler } from './type'
import useBoardWrite from './hook'
import { useState } from 'react'
import { useIsEdit } from '@/commons/isEditProvider'
// 게시글 등록/수정 페이지
const BoardsWrite = () => {

    const [writerErr, setWriterErr] = useState<string>("")
    const [passwordErr, setPasswordErr] = useState<string>("")
    const [titleErr, setTitleErr] = useState<string>("")
    const [contentErr, setContentsErr] = useState<string>("")

    const {
        onChangePosting,
        creatingBoard,
        updatingBoard,
        boardUpdateSetting
    } = useBoardWrite()

    const { isEdit, writer, title, password, contents, updatingContents, updatingTitle } = useIsEdit()

    const onClickResist = async () => {
        const forValArr = [writer, password, title, contents]
        
        if (forValArr.includes("")) {
            for (let i=0; i < forValArr.length; i++) {
                switch(i) {
                    case 0: {
                        forValArr[i] === "" ?  setWriterErr("필수입력 사항 입니다.") : setWriterErr("")
                        break
                    }
                    case 1: {
                        forValArr[i] === "" ? setPasswordErr("필수입력 사항 입니다.") : setPasswordErr("")
                        break
                    }
                    case 2: {
                        forValArr[i] === "" ? setTitleErr("필수입력 사항 입니다.") : setTitleErr("")
                        break
                    }
                    case 3: {
                        forValArr[i] === "" ? setContentsErr("필수입력 사항 입니다.") : setContentsErr("")
                        break
                    }
                    default:
                }
            }
        } else {
            setWriterErr("")
            setPasswordErr("")
            setTitleErr("")
            setContentsErr("")
            creatingBoard()
        }
    }

    const onUpdateHandler = async (data?: IOnUpdateHandler) => {
        const makingData = data
        
        const forValArr = [title, contents]

        if (forValArr.includes("")) {
            for (let i=0; i < forValArr.length; i++) {
                switch(i) {
                    case 0: {
                        if (forValArr[i] === "") {
                            setTitleErr("필수입력 사항 입니다.")
                        } else {
                            setTitleErr("")
                        }
                        // forValArr[i] === "" ? setTitleErr("필수입력 사항 입니다.") : setTitleErr("")
                        break
                    }
                    case 1: {
                        if (forValArr[i] === "") {
                            setContentsErr("필수입력 사항 입니다.")
                        } else {
                            setContentsErr("")                        
                        }
                        // forValArr[i] === "" ? setContentsErr("필수입력 사항 입니다.") : setContentsErr("")
                        break
                    }
                    default:
                }
            }
            return
        } else if (updatingContents === contents) {
            alert('내용이 같으면 수정이 불가능 합니다.')
            return
        } else {
            if (updatingTitle === title) {
                delete makingData?.title
            } else if (updatingContents === contents ) {
                delete makingData?.contents
            }
            setTitleErr("")
            setContentsErr("")
            
            updatingBoard(boardUpdateSetting(makingData!))
        }
    }

    return (
        <div id="main" className={`${styles.new_main}`}>
            <h1 className={`b_20_28`}>게시물 등록</h1>
            <div id="" className={`${styles.board_container}`}>
                <section id="" className={`${styles.write_form_container}`}>
                    <form className={`${styles.write_form_80h} flex_row`}>
                        <WriteInput setState={onChangePosting({category: "작성자"})} label={"작성자"} placeholder={"작성자 명을 입력해 주세요."} errMsg={writerErr} />
                        <WriteInput setState={onChangePosting({category: "비밀번호"})} label={"비밀번호"} placeholder={"비밀번호를 입력해 주세요."} errMsg={passwordErr} />
                    </form>
                    <hr />
                    <form className={`${styles.write_form_80h} flex_row`}>
                        <WriteInput setState={onChangePosting({category: "제목"})} label={"제목"} placeholder={"제목을 입력해 주세요."} errMsg={titleErr} />
                    </form>
                    <hr />
                    <form className={`${styles.write_form_368h} flex_row`}>
                        <WriteInput setState={onChangePosting({category: "내용"})} label={"내용"} placeholder={"내용을 입력해 주세요."} errMsg={contentErr} />
                    </form>
                    <form className={`${styles.write_form_192h} flex_column`}>
                        <WriteInput label={"주소"} placeholder={"주소를 입력해 주세요."}/>
                    </form>
                    <hr />
                    <form className={`${styles.write_form_80h} flex_row`}>
                        <WriteInput label={"유튜브 링크"} placeholder={"링크를 입력해 주세요."}/>
                    </form>
                    <hr />
                    <form className={`${styles.write_form_192h} flex_row`}>
                        <WriteInput label={"사진 첨부"}/>
                    </form>
                </section>
                <div id="" className={`${styles.write_confirm_container} flex_row flex_justi_end`}>
                    <WriteButton p="취소"/>
                    <WriteButton onClickHandler={isEdit ? onUpdateHandler : onClickResist} postData={isEdit ? { title, contents } : { writer, title, contents }} p={isEdit ? "수정하기" : "등록하기"}/>
                </div>
            </div>
        </div>
    )
}

export default BoardsWrite