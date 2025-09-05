"use client"

// import { Link } from "react-router"
import { gql, useMutation } from "@apollo/client";
import { ChangeEvent, useState } from 'react'
import style from './style.module.css'
import { useRouter } from "next/navigation";

interface IBoard {
    email: string,
    password: string,
    title: string,
    content: string,
    postalCode?: number,
    address?: string,
    detailaddress?: string,
    youtubeUrl?: string,
    photo?: File[]

} 

const mygraphql = gql`
mutation createBoard($writer: String!, $password: String!, $title: String!, $contents: String!){
    createBoard( createBoardInput:{writer: $writer, password: $password, title:$title, contents: $contents }){
        _id, title, contents, likeCount, dislikeCount
    }
}
`;

const BoardNew = () => {

    const router = useRouter()


    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [title, setTitle] = useState<string>("")
    const [content, setContent] = useState<string>("")
    const [board, setBoard] = useState<IBoard[]>([])


    const [emailError, setEmailError] = useState("필수입력사항")
    const [passwordError, setPasswordError] = useState("필수입력사항")
    const [titleError, setTitleError] = useState("필수입력사항")
    const [contentError, setContentError] = useState("필수입력사항")
    const [isActive, setIsActive] = useState(false)

    const [boardCreate] = useMutation(mygraphql)


    const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)

        if (event.target.value) {
            setEmailError("")
        } else {
            setEmailError("필수입력사항")
        }

        if (event.target.value && password && title && content) {
            setIsActive(true)
        } else {
            setIsActive(false)
        }
    }

    const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)

        if (event.target.value) {
            setPasswordError("")
        } else {
            setPasswordError("필수입력사항")
        }

        if (email && event.target.value && title && content) {

            setIsActive(true)

        } else {

            setIsActive(false)
        }

    }

    const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)

        if (event.target.value) {
            setTitleError("")
        } else {
            setTitleError("필수입력사항")
        }


        if (email && password && event.target.value && content) {
            setIsActive(true)
        } else {
            setIsActive(false)
        }
    }

    const onChangeContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setContent(event.target.value)

        if (event.target.value) {
            setContentError("")
        } else {
            setContentError("필수입력사항")
        }

        if (email && password && title && event.target.value) {
            setIsActive(true)
        } else {
            setIsActive(false)
        }
    }

    const onClickSignUp = async () => {

        try{
        if (email && password && title && content) {
            const result = await boardCreate({
                variables: {
                    writer: email,
                    password: password,
                    title: title,
                    contents: content
                    
                }
            })
            console.log(result)
            const myId=result?.data.createBoard._id;
            router.push(`/board/detail/${myId}`);
            alert("게시글 등록이 완료되었습니다.")
        }
    }catch(error){
        console.error(error);
        alert("에러가 발생하였습니다. 다시 시도해주세요.")
    }
    }





    return (
        <div className={style.전체바탕}>
            <div className={style.head}><span>게시물 등록</span></div>
            <div className={style.main}>
                <div className={style.메인}>
                    <div className={style.메인__1__1}>
                        <div>작성자 <span className={style.필수}>*</span> </div>
                        <input type="text" placeholder="작성자 명을 입력해 주세요." className={`${style.input} ${style.메인1__인풋}`} onChange={onChangeEmail} />
                        <div className={style.errorMassage}>{emailError}</div>
                    </div>
                    <div className={style.메인__1__1}>
                        <div>비밀번호 <span className={style.필수}>*</span></div>
                        <input  type="password" placeholder="비밀번호를 입력해 주세요." className={`${style.input} ${style.메인1__인풋}`} onChange={onChangePassword} />
                        <div className={style.errorMassage}>{passwordError}</div>
                    </div>
                </div>
                <hr></hr>
                <div className={style.메인__1__1}>
                    <div>제목 <span className={style.필수}>*</span></div>
                    <input className={style.input} type="text" placeholder="제목을 입력해 주세요." onChange={onChangeTitle} />
                    <div className={style.errorMassage}>{titleError}</div>
                </div>
                <hr></hr>

                <div className={style.메인__1__1}>
                    <div>내용 <span className={style.필수}>*</span></div>
                    <textarea className={style.textarea}  placeholder="내용을 입력해 주세요." onChange={onChangeContent} />
                    <div className={style.errorMassage}>{contentError}</div>
                </div>


                <div className={style.메인__1__1}>
                    <div className={style.메인__1__1} id="메인__주소__검색">
                        <div>주소</div>
                        <div className={style.메인__주소__주소검색}>
                            <input type="number" placeholder="01234" className={`${style.input} ${style.주소검색인풋}`} />
                            <button className={style.주소검색버튼}>우편번호 검색</button>
                        </div>
                    </div>
                    <div>
                        <input className={style.input} type="text" placeholder="주소를 입력해 주세요." />
                    </div>
                    <div>
                        <input className={style.input} type="text" placeholder="상세주소" />
                    </div>
                </div>
                <hr></hr>

                <div className={style.메인__1__1}>
                    <div>유튜브 링크</div>
                    <input className={style.input} type="text" placeholder="링크를 입력해주세요." />
                </div>
                <hr></hr>

                <div className={style.메인__1__1}>
                    <div>사진 첨부</div>
                    <div className={style.사진첨부목록}>
                        <div className={style.사진첨부리스트}>
                            <img src="../assets/icons/add.png"></img>
                            <div>클릭해서 사진 업로드</div>
                        </div>
                        <div className={style.사진첨부리스트}>
                            <img src="../assets/icons/add.png"></img>
                            <div>클릭해서 사진 업로드</div>
                        </div>
                        <div className={style.사진첨부리스트}>
                            <img src="../assets/icons/add.png"></img>
                            <div>클릭해서 사진 업로드</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.footer}>
                <button className={style.푸터취소버튼}>취소</button>
                <button className={style.푸터등록버튼} onClick={onClickSignUp} disabled={!isActive} style={{ backgroundColor: isActive ? "blue" : "gray" }}>등록하기</button>

            </div>

        </div>


    )

}

export default BoardNew