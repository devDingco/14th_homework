"use client";

import styles from "./styles.module.css";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useAccessTokenStore } from "@/commons/stores/count-store";
import { useRouter } from "next/navigation";

const LOGIN_USER = gql`
  mutation loginUser($password: String!, $email: String!) {
    loginUser(password: $password, email: $email) {
      accessToken
    }
  }
`;

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser] = useMutation(LOGIN_USER);
  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const { setAccessToken } = useAccessTokenStore();
  const onClickLogin = async () => {
    console.log(email);
    console.log(password);
    try {
      const result = await loginUser({
        variables: {
          email,
          password,
        },
      });
      console.log("요청성공");
      const myaccessToken = result.data?.loginUser.accessToken;
      setAccessToken(myaccessToken);
      localStorage.setItem("accessToken", myaccessToken);
      router.push("/boards");
    } catch (error) {
      alert(error);
    }
  };

  const onClickSignUp = () => {
    router.push("/first/signUp");
  };
  return (
    <div className={styles.all}>
      <div className={styles.form}>
        <img src="/images/logo_.png" alt="로고" />
        <div className={styles.message}>트립트립에 오신걸 환영합니다.</div>
        <div className={styles.guide}>트립트립에 로그인 하세요.</div>
        <input
          type="text"
          placeholder="이메일을 입력해 주세요."
          className={styles.email}
          onChange={onChangeEmail}
        />
        <input
          type="password"
          placeholder="비밀번호를 입력해 주세요."
          className={styles.password}
          onChange={onChangePassword}
        />
        <div className={styles.alert}>아이디 또는 비밀번호를 확인해 주세요</div>
        <button className={styles.login} onClick={onClickLogin}>
          로그인
        </button>
        <button className={styles.signup} onClick={onClickSignUp}>
          회원가입
        </button>
      </div>
      <img src="/images/Rectangle.png" alt="배경" width={1520} />
    </div>
  );
}
