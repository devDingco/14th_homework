"use client"

import styles from './style.module.css'
import WriteButton from './writeButton'
import WriteInput from './writeInput'
import { IBoardsWriteProps } from './type'
import useBoardWrite from './hook'
import { useEffect } from 'react'
import { gql, useQuery } from '@apollo/client'
import { useIsEdit } from '@/commons/isEditProvider'

const FETCH_BOARD = gql`
    query fetchBoard($boardId: ID!) {
        fetchBoard(boardId: $boardId) {
            _id
            writer
            title
            contents
            createdAt
        }
    }
`

// 게시글 등록/수정 페이지
const BoardsWrite = (props: IBoardsWriteProps) => {

    const {
        onChangePosting,
        writerErr,
        passwordErr,
        titleErr,
        contentErr
    } = useBoardWrite()

    const { isEdit, writer, title, password, contents } = useIsEdit()

    console.log(props.data)
    useEffect(()=> {
        console.log('dmaaaaa 컴포넌트으으으 : ',writer)
    },[writer])

    return (
        <div id="main" className={`${styles.new_main}`}>
            <h1 className={`b_20_28`}>게시물 등록</h1>
            <div id="" className={`${styles.board_container}`}>
                <section id="" className={`${styles.write_form_container}`}>
                    <form className={`${styles.write_form_80h} flex_row`}>
                        <WriteInput setState={onChangePosting("작성자")} label={"작성자"} placeholder={"작성자 명을 입력해 주세요."} errMsg={writerErr} data={props.data}/>
                        <WriteInput setState={onChangePosting("비밀번호")} label={"비밀번호"} placeholder={"비밀번호를 입력해 주세요."} errMsg={passwordErr} />
                    </form>
                    <hr />
                    <form className={`${styles.write_form_80h} flex_row`}>
                        <WriteInput setState={onChangePosting("제목")} label={"제목"} placeholder={"제목을 입력해 주세요."} errMsg={titleErr} data={props.data}/>
                    </form>
                    <hr />
                    <form className={`${styles.write_form_368h} flex_row`}>
                        <WriteInput setState={onChangePosting("내용")} label={"내용"} placeholder={"내용을 입력해 주세요."} errMsg={contentErr} data={props.data}/>
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
                    <WriteButton postResistData={{ writer, password, title, contents }} p="취소"/>
                    <WriteButton postUpdateData={{ writer, title, contents }} p={isEdit ? "수정하기" : "등록하기"}/>
                </div>
            </div>
        </div>
    )
}

export default BoardsWrite