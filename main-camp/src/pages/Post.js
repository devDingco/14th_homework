import { useState } from 'react'
import WriteButton from "../components/WriteButton"
import WriteInput from "../components/WriteInput"

// 게시글 등록 페이지
const Post = () => {
    const [writer, setWriter] = useState("")
    const [password, setPassword] = useState("")
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    
    const [writerErr, setWriterErr] = useState("")
    const [passwordErr, setPasswordErr] = useState("")
    const [titleErr, setTitleErr] = useState("")
    const [contentErr, setContentErr] = useState("")

    const onChangeWriter = (event) => {
        
        setWriter(event.target.value)
    }
    const onChangePassword = (event) => {
        
        setPassword(event.target.value)
    }
    const onChangeTitle = (event) => {
        
        setTitle(event.target.value)
    }
    const onChangeContent = (event) => {
        
        setContent(event.target.value)
    }
    
    const onClickResist = () => {
        const forValArr = [writer, password, title, content]
        
        if (forValArr.includes("")) {
   
            // const forErr = []
            // forValArr.forEach((v, i) => {
            //     if (v === "") forErr.push(i)
            // })

            for (let i=0; i < forValArr.length; i++) {
                switch(i) {
                    case 0: {
                        forValArr[i] === "" ? setWriterErr("필수입력 사항 입니다.") : setWriterErr("")
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
                        forValArr[i] === "" ? setContentErr("필수입력 사항 입니다.") : setContentErr("")
                        break
                    }
                    default:
                }
            }
        } else {
            alert('게시글 등록이 가능한 상태입니다!')
        }
    }

    return (
        <div id="main">
            <h1 className="b_20_28">게시물 등록</h1>
            <div id="main_container">
                <section id="write_form_container">
                    <form className="write_form_80h flex_row">
                        <WriteInput setState={onChangeWriter} label={"작성자"} placeholder={"작성자 명을 입력해 주세요."} errMsg={writerErr}/>
                        <WriteInput setState={onChangePassword} label={"비밀번호"} placeholder={"비밀번호를 입력해 주세요."} errMsg={passwordErr}/>
                    </form>
                    <hr />
                    <form className="write_form_80h flex_row">
                        <WriteInput setState={onChangeTitle} label={"제목"} placeholder={"제목을 입력해 주세요."} errMsg={titleErr}/>
                    </form>
                    <hr />
                    <form className="write_form_368h flex_row">
                        <WriteInput setState={onChangeContent} label={"내용"} placeholder={"내용을 입력해 주세요."} errMsg={contentErr}/>
                    </form>
                    <form className="write_form_192h flex_column">
                        <WriteInput label={"주소"} placeholder={"주소를 입력해 주세요."}/>
                    </form>
                    <hr />
                    <form className="write_form_80h flex_row">
                        <WriteInput label={"유튜브 링크"} placeholder={"링크를 입력해 주세요."}/>
                    </form>
                    <hr />
                    <form className="write_form_192h flex_row">
                        <WriteInput label={"사진 첨부"}/>
                    </form>
                </section>
                <div id="write_confirm_container" className="flex_row flex_justi_end">
                    <WriteButton p="취소"/>
                    <WriteButton setState={onClickResist} p="등록하기"/>
                </div>
            </div>
        </div>
    )
}

export default Post