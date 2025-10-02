"use client"

import styles from './style.module.css'
import WriteButton from './writeButton'
import WriteInput from './writeInput'
import { IBoardErr } from './type'
import useBoardWrite from './hook'
import { useEffect, useState } from 'react'
import { useIsEdit } from '@/commons/provider/isEditProvider'
import Postcode from './postcode'

// 게시글 등록/수정 페이지
const BoardsWrite = () => {
    
    const [boardErr, setBoardErr] = useState<IBoardErr>({
        boardWriterErr: "",
        boardTitleErr: "",
        boardPasswordErr: "",
        boardContentsErr: ""
    })
    
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    
    const { isEdit, postData } = useIsEdit()

    const { onChangePosting, onClickResist, onUpdateHandler, onClickImage, onClickImageDelete, fileRef } = useBoardWrite({setBoardErr})

    useEffect(()=>{
        console.log('postData : ', postData)
    },[postData])

    return (
        <>
        <div id="main" className={`${styles.new_main}`}>
            <h1 className={`b_20_28`}>게시물 등록</h1>
            <div id="" className={`${styles.board_container}`}>
                <section id="" className={`${styles.write_form_container}`}>
                    <form className={`${styles.write_form_80h} flex_row`}>
                        <WriteInput setState={onChangePosting({category: "작성자"})} label={"작성자"} placeholder={"작성자 명을 입력해 주세요."} errMsg={boardErr.boardWriterErr} />
                        <WriteInput setState={onChangePosting({category: "비밀번호"})} label={"비밀번호"} placeholder={"비밀번호를 입력해 주세요."} errMsg={boardErr.boardPasswordErr} />
                    </form>
                    <hr />
                    <form className={`${styles.write_form_80h} flex_row`}>
                        <WriteInput setState={onChangePosting({category: "제목"})} label={"제목"} placeholder={"제목을 입력해 주세요."} errMsg={boardErr.boardTitleErr} />
                    </form>
                    <hr />
                    <form className={`${styles.write_form_368h} flex_row`}>
                        <WriteInput setState={onChangePosting({category: "내용"})} label={"내용"} placeholder={"내용을 입력해 주세요."} errMsg={boardErr.boardContentsErr} />
                    </form>
                    <form className={`${styles.write_form_192h} flex_column`}>
                        <WriteInput setState={onChangePosting({category: "주소"})} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} label={"주소"} placeholder={"주소를 입력해 주세요."}/>
                    </form>
                    <hr />
                    <form className={`${styles.write_form_80h} flex_row`}>
                        <WriteInput setState={onChangePosting({category: "유튜브링크"})} label={"유튜브 링크"} placeholder={"링크를 입력해 주세요."}/>
                    </form>
                    <hr />
                    <form className={`${styles.write_form_192h} flex_row`}>
                        <WriteInput setState={onChangePosting({category: "사진첨부"})} onClickImage={onClickImage} onClickImageDelete={onClickImageDelete} fileRef={fileRef} label={"사진 첨부"}/>
                    </form>
                </section>
                <div id="" className={`${styles.write_confirm_container} flex_row flex_justi_end`}>
                    <WriteButton p="취소"/>
                    <WriteButton onClickHandler={isEdit ? onUpdateHandler : onClickResist} p={isEdit ? "수정하기" : "등록하기"}/>
                </div>
            </div>
        </div>
        <Postcode isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
        </>
    )
}

export default BoardsWrite