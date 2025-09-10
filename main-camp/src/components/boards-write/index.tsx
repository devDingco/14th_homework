"use client"

import styles from './style.module.css'
import WriteButton from './writeButton'
import WriteInput from './writeInput'
import { IBoardsWriteProps, IFunctionUpdateBoard } from './type'
import useBoardWrite from './hook'
import { useEffect, useState } from 'react'
import { useIsEdit } from '@/commons/isEditProvider'
// 게시글 등록/수정 페이지
const BoardsWrite = (props: IBoardsWriteProps) => {

    const [writerErr, setWriterErr] = useState<string>("")
    const [passwordErr, setPasswordErr] = useState<string>("")
    const [titleErr, setTitleErr] = useState<string>("")
    const [contentErr, setContentsErr] = useState<string>("")

    const {
        onChangePosting,
        fetchingBoard,
        updatingBoard,
        boardUpdateSetting
    } = useBoardWrite()

    const { isEdit, writer, title, password, contents } = useIsEdit()

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
            fetchingBoard()
        }
    }

    const onUpdateHandler = async (data?: IFunctionUpdateBoard) => {
    
        const updateBoardInput = boardUpdateSetting(data)
        const forValArr = [title, contents]

        console.log('updateBoardInput', updateBoardInput)
        console.log('forValArr', forValArr)

        if (forValArr.includes("")) {
            for (let i=0; i < forValArr.length; i++) {
                switch(i) {
                    case 0: {
                        if (forValArr[i] === "") {
                            console.log("타이틀 안적었네?")
                            setTitleErr("필수입력 사항 입니다.")
                        } else {
                            console.log("타이틀 있다")
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
        } else if (updateBoardInput.contents === forValArr[1] || updateBoardInput.title === forValArr[0]) {
            console.log('수정할 내용이 없습니다.')
        } else {
            setTitleErr("")
            setContentsErr("")
            updatingBoard()
        }
    }

    useEffect(()=> {
        console.log('에러메세지 업데이트됐나? : ', titleErr)
    },[titleErr])

    return (
        <div id="main" className={`${styles.new_main}`}>
            <h1 className={`b_20_28`}>게시물 등록</h1>
            <div id="" className={`${styles.board_container}`}>
                <section id="" className={`${styles.write_form_container}`}>
                    <form className={`${styles.write_form_80h} flex_row`}>
                        <WriteInput setState={onChangePosting({category: "작성자"})} label={"작성자"} placeholder={"작성자 명을 입력해 주세요."} errMsg={writerErr} data={props.data}/>
                        <WriteInput setState={onChangePosting({category: "비밀번호"})} label={"비밀번호"} placeholder={"비밀번호를 입력해 주세요."} errMsg={passwordErr} />
                    </form>
                    <hr />
                    <form className={`${styles.write_form_80h} flex_row`}>
                        <WriteInput setState={onChangePosting({category: "제목"})} label={"제목"} placeholder={"제목을 입력해 주세요."} errMsg={titleErr} data={props.data}/>
                    </form>
                    <hr />
                    <form className={`${styles.write_form_368h} flex_row`}>
                        <WriteInput setState={onChangePosting({category: "내용"})} label={"내용"} placeholder={"내용을 입력해 주세요."} errMsg={contentErr} data={props.data}/>
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
                    <WriteButton onClickHandler={isEdit ? onUpdateHandler : onClickResist} postData={isEdit ? { writer, password, title, contents } : { writer, title, contents }} p={isEdit ? "수정하기" : "등록하기"}/>
                </div>
            </div>
        </div>
    )
}

export default BoardsWrite