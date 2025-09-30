"use client"

import styles from './styles.module.css'
import Image from 'next/image'
import logoImage from "@assets/trip_logo.svg"
import loginImage from "@assets/login_image.png"
import Link from 'next/link'
import { ChangeEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAccessTokenStore } from '@/commons/stores/token-store'
import { ApolloError, gql, useMutation } from '@apollo/client'
import { Modal } from 'antd'


const IMAGE_SRC = {
    logoImage: { src: logoImage, alt: "로고이미지"},
    loginImage: { src: loginImage, alt: "로그인이미지"},
}

const LOGIN_USER = gql `
    mutation loginUser($email: String!, $password: String!){
        loginUser(email: $email, password: $password){
            accessToken
        }
    }
`

export default function LoginPage(){
    const router = useRouter()

    const [ email, setEmail ] = useState<string>("")
    const [ password, setPassword] = useState<string>("")
    const [inputError, setInputError] = useState<string>("");

    const [ loginUser ] = useMutation(LOGIN_USER)

    const onChangeEmail = (event:ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }

    const onChangePassword = (event:ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    const { setAccessToken } = useAccessTokenStore()

    const onClickLogin = async() => {
         // 0. 입력값 검증
        if (!email || !password) {
            setInputError("이메일과 비밀번호를 모두 입력해 주세요.");
            return;
        }

        try {
            // 1. 로그인 뮤테이션 날려서 accessToken 받아오기
            const result = await loginUser({
                variables: { email, password }        
            })

            const API로받은_accessToken = result.data?.loginUser.accessToken
            console.log(API로받은_accessToken)

            if(API로받은_accessToken) {
                // 로그인 성공
                setAccessToken(API로받은_accessToken)
                setInputError("");
                localStorage.setItem("accessToken", API로받은_accessToken)
                router.push('/boards')
            }         

        //catch (error: unknown) + if (error instanceof ApolloError) → 더 안전한 방식
        } catch(error: unknown){
            if (error instanceof ApolloError) {
                // 1) GraphQL 에러 (아이디/비번 틀림 등)
                if (error.graphQLErrors?.length > 0) {
                    setInputError("아이디 또는 비밀번호를 확인해 주세요.");
                    return;
                }
            }       
            // 2) 서버나 네트워크 오류
            Modal.error({ content: "에러가 발생하였습니다. 다시 시도해 주세요." })
            return
        }
    }


    return (
        <div className={styles.pageLayout}>
            <div className={styles.loginContainer}>
                <div className={styles.loginWrapper}>
                    <div className={styles.loginContent}>
                        <div className={styles.loginLogo}>                        
                            <Image 
                                src={IMAGE_SRC.logoImage.src}
                                alt={IMAGE_SRC.logoImage.alt}
                                className={styles.loginLogoImage}                            
                            />
                            <div className={styles.loginTitle}>트립트립에 오신걸 환영합니다.</div>
                        </div>

                        <div className={styles.loginInputContainer}>
                            <div className={styles.loginInputTitle}>트립트립에 로그인 하세요.</div>
                            <div className={styles.flexHalf}>
                                <input 
                                    className={`${styles.loginInput} ${inputError ? styles.inputErrorBorder : ""}`} 
                                    type='text' 
                                    placeholder='이메일을 입력해주세요.'
                                    onChange={onChangeEmail} 
                                />
                            </div>
                            <div className={styles.flexHalf}>
                                <input                             
                                    className={`${styles.loginInput} ${inputError ? styles.inputErrorBorder : ""}`} 
                                    type='password' 
                                    placeholder='비밀번호를 입력해주세요.' 
                                    onChange={onChangePassword}
                                />
                                {inputError && (
                                    <div className={styles.inputErrorMessage}>{inputError}</div>
                                )}
                            </div>                            
                        </div>
                        
                    </div>
                    <div className={styles.loginButtonContainer}>
                        <button 
                            className={styles.loginButton}
                            onClick={onClickLogin}
                        >
                            로그인
                        </button>
                        
                        <Link href="/signup" className={styles.signupButton}>
                            회원가입
                        </Link>
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

