"use client"

import styles from './style.module.css'
import WriteButton from './writeButton'
import WriteInput from './writeInput'
import { IOnUpdateHandler } from './type'
import useBoardWrite from './hook'
import { useEffect, useState } from 'react'
import { useIsEdit } from '@/commons/provider/isEditProvider'
import Postcode from './postcode'

// 게시글 등록/수정 페이지
const BoardsWrite = () => {
    const { isEdit, postData, updatingBoardData, setUpdatingBoardData } = useIsEdit()
    const {
        onChangePosting,
        creatingBoard,
        updatingBoard,
        boardUpdateSetting
    } = useBoardWrite()

    const [writerErr, setWriterErr] = useState<string>("")
    const [passwordErr, setPasswordErr] = useState<string>("")
    const [titleErr, setTitleErr] = useState<string>("")
    const [contentErr, setContentsErr] = useState<string>("")

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    const onClickResist = async () => {
        const forValArr = [
            { value: postData.writer, setError: setWriterErr },
            { value: postData.password, setError: setPasswordErr },
            { value: postData.title, setError: setTitleErr },
            { value: postData.contents, setError: setContentsErr },
          ];
        const forAddressValArr = [postData.boardAddress?.zipcode, postData.boardAddress?.address]

        let hasError = false;
            forValArr.forEach(({ value, setError }) => {
            if (value === "") {
                setError("필수입력 사항 입니다.");
                hasError = true;
            } else {
                setError("");
            }
        });

        if (hasError) return;

        if ((forAddressValArr.filter((v) => v === "").length !== forAddressValArr.length) && (forAddressValArr.filter((v) => v === "").length !== 0)) {
            alert('주소를 끝까지 입력해 주세요')
            return
        }
        
        creatingBoard()
    }

    const onUpdateHandler = async () => {
        
        const forValArr = [
            { value: postData.title, setError: setTitleErr },
            { value: postData.contents, setError: setContentsErr },
        ];
        
        let hasError = false;
            forValArr.forEach(({ value, setError }) => {
            if (value === "") {
                setError("필수입력 사항 입니다.");
                hasError = true;
            } else {
                setError("");
            }
        });

        if (hasError) return;

        if (updatingBoardData.contents === postData.contents) {
            alert('내용이 같으면 수정이 불가능 합니다.')
            return
        } else {
            setTitleErr("")
            setContentsErr("")
        }

        updatingBoard()
    }

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
                        <WriteInput setState={onChangePosting({category: "주소"})} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} label={"주소"} placeholder={"주소를 입력해 주세요."}/>
                    </form>
                    <hr />
                    <form className={`${styles.write_form_80h} flex_row`}>
                        <WriteInput setState={onChangePosting({category: "유튜브링크"})} label={"유튜브 링크"} placeholder={"링크를 입력해 주세요."}/>
                    </form>
                    <hr />
                    <form className={`${styles.write_form_192h} flex_row`}>
                        <WriteInput label={"사진 첨부"}/>
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