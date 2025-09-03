"use client"
import { ChangeEvent, useState } from 'react'
import styles from './style.module.css'
import WriteButton from "../../components/boards/WriteButton"
import WriteInput from "../../components/boards/WriteInput"
import { gql, useMutation } from '@apollo/client'
import { useRouter } from 'next/navigation'

const CREATE_BOARD = gql`
    mutation createBoard($createBoardInput: CreateBoardInput!) {
        createBoard(createBoardInput: $createBoardInput) {
            _id
            writer
            title
        }
    }
`

// 게시글 등록 페이지
const BoardsNew = () => {
    const router = useRouter()

    const [writer, setWriter] = useState<string>("")
    const [password, setPassword] = useState<string | number>("")
    const [title, setTitle] = useState<string>("")
    const [content, setContent] = useState<string>("")
    
    const [writerErr, setWriterErr] = useState<string>("")
    const [passwordErr, setPasswordErr] = useState<string>("")
    const [titleErr, setTitleErr] = useState<string>("")
    const [contentErr, setContentErr] = useState<string>("")

    const [createBoard] = useMutation(CREATE_BOARD)

    const onChangePosting = (category: string) => (event: ChangeEvent<HTMLInputElement>) => {
        switch (category) {
            case "작성자": {
                setWriter(event.target.value)
                break
            }
            case "비밀번호": {
                setPassword(event.target.value)
                break
            }
            case "제목": {
                setTitle(event.target.value)
                break
            }
            case "내용": {
                setContent(event.target.value)
                break
            }
            default:
        }
    }

    const onClickResist = async () => {
        const forValArr = [writer, password, title, content]
        
        if (forValArr.includes("")) {
            for (let i=0; i < forValArr.length; i++) {
                switch(i) {
                    case 0: {
                        if (forValArr[i] === "") {
                            setWriterErr("필수입력 사항 입니다.")
                        } else {
                            setWriterErr("")
                        }
                        // forValArr[i] === "" ? setWriterErr("필수입력 사항 입니다.") : setWriterErr("")
                        break
                    }
                    case 1: {
                        if (forValArr[i] === "") {
                            setPasswordErr("필수입력 사항 입니다.")
                        } else {
                            setPasswordErr("")
                        }
                        // forValArr[i] === "" ? setPasswordErr("필수입력 사항 입니다.") : setPasswordErr("")
                        break
                    }
                    case 2: {
                        if (forValArr[i] === "") {
                            setTitleErr("필수입력 사항 입니다.")
                        } else {
                            setTitleErr("")
                        }
                        // forValArr[i] === "" ? setTitleErr("필수입력 사항 입니다.") : setTitleErr("")
                        break
                    }
                    case 3: {
                        if (forValArr[i] === "") {
                            setContentErr("필수입력 사항 입니다.")
                        } else {
                            setContentErr("")
                        }
                        // forValArr[i] === "" ? setContentErr("필수입력 사항 입니다.") : setContentErr("")
                        break
                    }
                    default:
                }
            }
        } else {
            setWriterErr("")
            setPasswordErr("")
            setTitleErr("")
            setContentErr("")
            
            try {
                // createBoard 게시글 등록
                const result = await createBoard({
                    variables: {
                        createBoardInput: {
                            writer: writer,
                            password: password,
                            title: title,
                            contents: content
                        }
                    }
                })
                console.log(result.data.createBoard._id)
                router.push(`/boards/${result.data.createBoard._id}`)
            } catch(e) {
                alert('에러가 발생하였습니다. 다시 시도해 주세요.')
            }
        }
    }

    return (
        <div id="main" className={`${styles.new_main}`}>
            <h1 className={`b_20_28`}>게시물 등록</h1>
            <div id="" className={`${styles.board_container}`}>
                <section id="" className={`${styles.write_form_container}`}>
                    <form className={`${styles.write_form_80h} flex_row`}>
                        <WriteInput setState={onChangePosting("작성자")} label={"작성자"} placeholder={"작성자 명을 입력해 주세요."} errMsg={writerErr}/>
                        <WriteInput setState={onChangePosting("비밀번호")} label={"비밀번호"} placeholder={"비밀번호를 입력해 주세요."} errMsg={passwordErr}/>
                    </form>
                    <hr />
                    <form className={`${styles.write_form_80h} flex_row`}>
                        <WriteInput setState={onChangePosting("제목")} label={"제목"} placeholder={"제목을 입력해 주세요."} errMsg={titleErr}/>
                    </form>
                    <hr />
                    <form className={`${styles.write_form_368h} flex_row`}>
                        <WriteInput setState={onChangePosting("내용")} label={"내용"} placeholder={"내용을 입력해 주세요."} errMsg={contentErr}/>
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
                    <WriteButton state={{ writer, password, title, content }} p="취소"/>
                    <WriteButton state={{ writer, password, title, content }} setState={onClickResist} p="등록하기"/>
                </div>
            </div>
        </div>
    )
}

export default BoardsNew