"use client"

import styles from './styles.module.css'
import Image from 'next/image'
import logoImage from "@assets/trip_logo.svg"
import loginImage from "@assets/login_image.png"
import { ChangeEvent, useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { CreateUserInput, CreateUserResponse, SignupInputs } from './types'
import { useAccessTokenStore } from '@/commons/stores/token-store'
import { Modal } from 'antd'


const IMAGE_SRC = {
    logoImage: { src: logoImage, alt: "로고이미지"},
    loginImage: { src: loginImage, alt: "로그인이미지"},
}

const CREATE_USER = gql`
    mutation createUser($createUserInput: CreateUserInput!){
        createUser(createUserInput: $createUserInput){
            _id
            email
            name
        }
    }
`
export default function SignupPage(){
    const [inputs, setInputs] = useState<SignupInputs>({
        email: "",
        name: "",
        password: "",
        passwordCheck: "",
    })

    const [ createUser ] = useMutation<
    { createUser: CreateUserResponse },
    { createUserInput: CreateUserInput }
  >(CREATE_USER)


    const [inputError, setInputError] = useState({
        email: "",
        name: "",
        password: "",
        passwordCheck: "",
    });

    const onChangeInputs = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {                
        const { id, value } = event.target;
        setInputs((prev) => ({          
            ...prev,
            [id]: value,  // id를 key로 매칭
        }))
    }

    const { setAccessToken } = useAccessTokenStore()

    const onClickSingup = async() => {
        // 0. 입력값 검증
        const errors: typeof inputError = { email: "", name: "", password: "", passwordCheck: "" };
       
        // 각 필드 검증
        if (!inputs.email) errors.email = "이메일을 입력해 주세요.";
        if (!inputs.name) errors.name = "이름을 입력해 주세요.";
        if (!inputs.password) errors.password = "비밀번호를 입력해 주세요.";
        if (!inputs.passwordCheck) errors.passwordCheck = "비밀번호 확인을 입력해 주세요.";

        if (inputs.password && inputs.passwordCheck && inputs.password !== inputs.passwordCheck) {
            errors.passwordCheck = "비밀번호가 일치하지 않습니다.";
        }

        // 에러가 하나라도 있으면 상태 업데이트 후 return
        if (Object.values(errors).some((msg) => msg !== "")) {
            setInputError(errors);
            return;
        }

        try {
            // 1. 회원가입 뮤테이션 실행
            const result = await createUser({
                variables: {
                    createUserInput: {
                        email: inputs.email,
                        name: inputs.name,
                        password: inputs.password,
                    },
                },
            })

            console.log(result.data?.createUser);

            // 2. 성공 모달
            Modal.success({
                content: "회원가입을 축하드려요!!",
            })

            // 에러 메시지 초기화
            setInputError({ email: "", name: "", password: "", passwordCheck: "" });


        } catch (error) {
            console.log(error);
            Modal.error({
                content: "회원가입에 실패했습니다. 다시 시도해 주세요.",
            })
        }      

    }



    return (
        <div className={styles.pageLayout}>
            <div className={styles.loginContainer}>
                <div className={styles.loginWrapper}>
                    <div className={styles.loginContent}>
                        <div className={styles.loginLogo}>
                            <div className={styles.loginTitle}>회원가입</div>
                        </div>

                        <div className={styles.loginInputContainer}>
                            <div className={styles.loginInputTitle}>회원가입을 위해 아래 빈칸을 모두 채워 주세요.</div>


                            <div className={styles.signupRowFlex}>
                                <div className={styles.flexHalf}>
                                    <div className={styles.signupFormTitle}>
                                        <div>이메일</div>
                                        <div className={styles.signupRequiredIndicator}>*</div>
                                    </div>
                                    <input
                                        id="email"
                                        className={`${styles.signupInput} ${inputError.email ? styles.inputErrorBorder : ""}`}
                                        placeholder="이메일을 입력해 주세요."
                                        value={inputs.email} 
                                        onChange={onChangeInputs}
                                    />
                                    {inputError.email && (
                                        <div className={styles.inputErrorMessage}>{inputError.email}</div>
                                    )}
                                </div>

                                <div className={styles.flexHalf}>
                                    <div className={styles.signupFormTitle}>
                                        <div>이름</div>
                                        <div className={styles.signupRequiredIndicator}>*</div>
                                    </div>
                                    <input
                                        id="name"
                                        className={`${styles.signupInput} ${inputError.name ? styles.inputErrorBorder : ""}`}
                                        placeholder="이름을 입력해 주세요."
                                        value={inputs.name} 
                                        onChange={onChangeInputs}
                                    />
                                    {inputError.name && (
                                        <div className={styles.inputErrorMessage}>{inputError.name}</div>
                                    )} 
                                </div>

                                <div className={styles.flexHalf}>
                                    <div className={styles.signupFormTitle}>
                                        <div>비밀번호</div>
                                        <div className={styles.signupRequiredIndicator}>*</div>
                                    </div>
                                    <input
                                        id="password"
                                        type='password'
                                        className={`${styles.signupInput} ${inputError.password ? styles.inputErrorBorder : ""}`}
                                        placeholder="비밀번호 입력해 주세요."
                                        value={inputs.password} 
                                        onChange={onChangeInputs}
                                    />
                                    {inputError.password && (
                                        <div className={styles.inputErrorMessage}>{inputError.password}</div>
                                    )} 
                                    
                                </div>

                                <div className={styles.flexHalf}>
                                    <div className={styles.signupFormTitle}>
                                        <div>비밀번호 확인</div>
                                        <div className={styles.signupRequiredIndicator}>*</div>
                                    </div>
                                    <input
                                        id="passwordCheck"
                                        type='password'
                                        className={`${styles.signupInput} ${inputError.passwordCheck ? styles.inputErrorBorder : ""}`}
                                        placeholder="비밀번호를 한번 더 입력해 주세요."
                                        value={inputs.passwordCheck} 
                                        onChange={onChangeInputs}
                                    />
                                    {inputError.passwordCheck && (
                                        <div className={styles.inputErrorMessage}>{inputError.passwordCheck}</div>
                                    )} 
                                </div>
                            </div>

                        </div>
                        
                    </div>
                    <div className={styles.loginButtonContainer}>
                        <button 
                            className={styles.signupButton}
                            onClick={onClickSingup}
                        >
                            회원가입
                        </button>
                    </div>
                </div>
            </div>

            <Image 
                src={IMAGE_SRC.loginImage.src}
                alt={IMAGE_SRC.loginImage.alt}
                className={styles.loginImage}                            
            />

        </div>       

                    
    )
}

