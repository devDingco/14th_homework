"use client"

import { useState } from "react"
import style from "./style.module.css"
import { gql, useMutation } from "@apollo/client";
import { error } from "console";
import { useRouter } from "next/navigation";

const CERATE_USER = gql`
    mutation  createUser($createUserInput: CreateUserInput!){
        createUser(createUserInput: $createUserInput){
            _id, email, name
        }
    }
`

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("");

    const [emailError, setEmailError] = useState("")
    const [nameError, setNameError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [confirmPasswordError, setConfirmPasswordError] = useState("")

    const [isActive, setIsActive] = useState(false);

    const [createuser] = useMutation(CERATE_USER);
    const router = useRouter()

    const onChangeEmail = (e) => {
        setEmail(e.target.value)

        if (e.target.value) {
            setEmailError("")
        } else {
            setEmailError("필수입력사항")
        }

        if (e.target.value && name && password && confirmPassword) {
            setIsActive(true)
        } else {
            setIsActive(false)
        }

    }

    const onChangeName = (e) => {
        setName(e.target.value)

        if (e.target.value) {
            setNameError("")
        } else {
            setNameError("필수입력사항")
        }

        if (email && e.target.value && password && confirmPassword) {
            setIsActive(true)
        } else {
            setIsActive(false)
        }
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value)

        if (e.target.value) {
            setPasswordError("")
        } else {
            setPasswordError("필수입력사항")
        }

        if (email && name && e.target.value && confirmPassword) {
            setIsActive(true)
        } else {
            setIsActive(false)
        }
    }

    const onChangeConfirmPassword = (e) => {
        setConfirmPassword(e.target.value)

        if (e.target.value) {
            setConfirmPasswordError("")
        } else {
            setConfirmPasswordError("필수입력사항")
        }

        if (email && name && password && e.target.value) {
            setIsActive(true)
        } else {
            setIsActive(false)
        }
    }

    const onclickSignUP = async() => {

        if (password !== confirmPassword) {
            alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.")
        }

        try{
        const result = await createuser({
            variables:{
                createUserInput:{
                    email, name, password
                }
            }
        })
        alert("회원가입 완료")
        router.push("/auth/login")
        console.log(result)
        
    }catch(error){
        alert("에러발생, 다시시도해주세요")
        console.log(error)
    }
    }




    return (
        <div className={style.container}>
            <div className={style.form}>
                <div className={style.formmain}>
                    <div className={style.form__aa}>
                        <div className={style.form__header}>회원가입</div>
                        <div className={style.form__input}>
                            <div className={style.description}>회원가입을 위해 아래 빈칸을 모두 채워주세요.</div>
                            <div className={style.inputs}>
                                <div className={style.inputGroup}>
                                    <div>이메일 <span className={style.star}>*</span></div>
                                    <input type="text" className={style.input} onChange={onChangeEmail} />
                                    <div className={style.error}>{emailError}</div>
                                </div>
                                <div className={style.inputGroup}>
                                    <div>이름 <span className={style.star}>*</span></div>
                                    <input type="text" className={style.input} onChange={onChangeName} />
                                    <div className={style.error}>{nameError}</div>
                                </div>
                                <div className={style.inputGroup}>
                                    <div>비밀번호 <span className={style.star}>*</span></div>
                                    <input type="text" className={style.input} onChange={onChangePassword} />
                                    <div className={style.error}> {passwordError}</div>
                                </div>
                                <div className={style.inputGroup}>
                                    <div>비밀번호 확인 <span className={style.star}>*</span></div>
                                    <input type="text" className={style.input} onChange={onChangeConfirmPassword} />
                                    <div className={style.error}>{confirmPasswordError}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={style.button}>
                        <button className={style.submitButton} onClick={onclickSignUP} disabled={!isActive} style={{ backgroundColor: isActive ? "blue" : "gray" }}>회원가입</button>
                    </div>
                </div>
            </div>
            <div className={style.imageContainer}>
                <img className={style.img} src="/assets/images/Tranquil1.png" alt="" />
            </div>
        </div >
    )
}