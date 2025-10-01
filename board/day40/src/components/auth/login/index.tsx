"use client"

import { useAccessTokenStore } from "@/commons/stores";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation"
import { useState } from "react";
import style from "./style.module.css"

const LOGIN_USER = gql`
    mutation loginUser($email:String!, $password:String!){
        loginUser(email:$email, password:$password){
            accessToken
        }
    }
`

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isActive, setIsActive] = useState(false);

    const { setAccessToken } = useAccessTokenStore()
    const [loginUser] = useMutation(LOGIN_USER)

const router = useRouter();

const onChangeEmail = (e) => {
    setEmail(e.target.value)
}

const onChangePassword = (e) => {
    setPassword(e.target.value)
}

const onClickLogin = async() => {
    const result = await loginUser({
        variables:{
            email, password
        }
    })
    const accessToken = result.data?.loginUser.accessToken
    console.log("로그인할때 찾은 토큰값"+ accessToken)

    setAccessToken(accessToken)
    localStorage.setItem("accessToken", accessToken)
    router.push("../boards")
}


const signupPageMove = () => {
    router.push("./auth/signup")

}



return (
    <div className={style.container}>
      <div className={style.inner}>
        <div className={style.logoBox}>
          <div className={style.logoBox}>
            <img className={style.logoImg} src="/assets/icons/triptrip.png" alt="" />
            <div className={style.welcome}>트립트립에 오신걸 환영합니다.</div>
          </div>
          <div className={style.loginBox}>
            <div className={style.loginTitle}>트립트립에 로그인하세요</div>
            <div className={style.inputBox}>
              <input className={style.emailInput} type="text" placeholder="이메일을 입력해 주세요." onChange={onChangeEmail} />
              <input className={style.passwordInput} type="text" placeholder="비밀번호를 입력해주세요." onChange={onChangePassword} />
              <div>{errorMessage}</div>
            </div>
          </div>
        </div>
        <div className={style.buttonBox}>
          <button className={style.loginBtn} onClick={onClickLogin}>로그인</button>
          <button className={style.signupBtn} onClick={signupPageMove}>회원가입</button>
        </div>
      </div>
      <div className={style.sideImgBox}>
        <img className={style.sideImg} src="/assets/images/Tranquil1.png" alt="" />
      </div>
    </div>
)
}