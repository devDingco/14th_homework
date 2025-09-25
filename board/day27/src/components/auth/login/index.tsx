"use client"

import { useAccessTokenStore } from "@/commons/stores";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation"
import { useState } from "react";

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
    console.log(accessToken)

    setAccessToken(accessToken)
    router.push("../boards")
}


const signupPageMove = () => {
    router.push("./auth/signup")

}

return (
    <div>
        <div>
            <div>
                <div>
                    <div>
                        <img src="/assets/icons/triptrip.png" alt="" />
                        <div>트립트립에 오신걸 환영합니다.</div>
                    </div>
                    <div>
                        <div>트립트립에 로그인하세요</div>
                        <div>
                            <input type="text" placeholder="이메일을 입력해 주세요." onChange={onChangeEmail} />
                            <input type="text" placeholder="비밀번호를 입력해주세요." onChange={onChangePassword} />
                        </div>
                    </div>
                </div>
                <div>
                    <button onClick={onClickLogin}>로그인</button>
                    <button onClick={signupPageMove}>회원가입</button>
                </div>

            </div>
        </div>
        <div>
            <img src="/assets/images/Tranquil1.png" alt="" />
        </div>


    </div>


)
}