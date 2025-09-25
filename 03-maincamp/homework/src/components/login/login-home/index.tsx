"use client"

import { ChangeEvent, useEffect, useState } from 'react'
import styles from './styles.module.css'
import { gql, useMutation } from '@apollo/client'
import { result, set } from 'lodash'
import { useRouter } from 'next/navigation'
import { useAccessTokenStore } from '@/stores/use-access-token'

const LOGIN_USER = gql`
    mutation loginUser($email: String!, $password: String!){
        loginUser(email: $email, password: $password){
            accessToken
        }
    }
`

export default function LoginHome(){
    const [errors, setErrors] = useState({
        email: "",
        password: ""
    })
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loginUser] = useMutation(LOGIN_USER)
    const router = useRouter()
    const { accessToken, setAccessToken } = useAccessTokenStore()
    
    
    const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }

    const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    const onClickLogin = async () => {
        let newErrors = {
            email: "",
            password: ""
        }
        if(!email) newErrors.email = "이메일을 입력해주세요"
        if(!password) newErrors.password = "비밀번호를 입력해주세요"
        setErrors(newErrors)
        const hasError = Object.values(newErrors).some((error)=> error !== "")
        if (hasError) return

        try{
             const result = await loginUser(
            { variables: { email, password } }
        )
        const AccessTokenByApi = result.data?.loginUser.accessToken;
        setAccessToken(AccessTokenByApi);
        localStorage.setItem("accessToken", AccessTokenByApi)
        
        router.push('/boards')

        }catch(error){
            alert(error.message)
        }
       
    }
    const onClickToSignUp = () => {
        router.push('/login/signup')
    }

    return(
        <div className={styles.container}>
            <div className={styles.loginHeader}>
              <div className={styles.loginBox}>
                <div className={styles.loginBox__input}>
                    <div className={styles.loginBox__input__logo}>
                        <img src="/images/logo.png" alt="logo" />
                        <h1>트립트립에 오신 것을 환영합니다.</h1>
                    </div>
                    <div className={styles.loginBox__input__form}>
                        <h2>트립트립에 로그인 하세요</h2>
                        <input className={errors.email ? styles.red : ""} onChange={onChangeEmail} placeholder='이메일을 입력해 주세요' type="text" />
                        <input className={errors.password ? styles.red : ""}  onChange={onChangePassword} placeholder='비밀번호를 입력해 주세요' type="password" />
                        {(errors.email || errors.password) && <div className={styles.error}> 아이디 또는 비밀번호를 확인해주세요 </div>}
                    </div>
                </div>
                <div className={styles.loginBox__button}>
                    <button className={styles.loginBox__button__login} onClick={onClickLogin}>로그인</button>
                    <button onClick={onClickToSignUp}>회원가입</button>
                </div>
            </div>

            </div>
            <img className={styles.loginBg} src="/images/loginBg.png" alt="" />
        </div>
    )
        
            
}
    