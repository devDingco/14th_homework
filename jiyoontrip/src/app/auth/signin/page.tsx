"use client";

import Image from "next/image";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useAccessTokenStore } from "@/app/commons/stores/store";

const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      accessToken
    }
  }
`;

export default function Home() {
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);
  const [isError, setIsError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser] = useMutation(LOGIN_USER);
  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    if (event.target.value !== "" && password !== "") {
      setIsActive(true);
    }
  };
  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    if (event.target.value !== "" && email !== "") {
      setIsActive(true);
    }
  };
  const onClickSignupGo = () => {
    router.push("/auth/signup");
  };
  const { setAccessToken } = useAccessTokenStore();

  const onClickLogin = async () => {
    try {
      if (email !== "" && password !== "") {
        setIsError(true);
        // 1. 로그인 뮤테이션 날려서 엑세스토큰 받아오기
        const result = await loginUser({
          variables: { email, password },
        });
        const accessToken = result.data?.loginUser.accessToken;
        setAccessToken(accessToken);
        localStorage.setItem("accessToken", accessToken);
        // 2. 로그인 성공페이지로 이동하기
        router.push("/boards");
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <>
      <div className={styles.page}>
        <div className={styles.leftZone}>
          <div className={styles.leftZoneEnroll}>
            <div className={styles.leftZoneEnrollTop}>
              <div className={styles.top}>
                <Image
                  className={styles.logoIcon}
                  src="/images/logo.svg"
                  alt="logoIcon"
                  width={0}
                  height={0}
                  sizes="100vw"
                />
                <div className={styles.welcome}>트립트립에 오신걸 환영합니다.</div>
                <div className={styles.logingogo}>트립트립에 로그인 하세요.</div>
              </div>
              <div className={styles.inputEnroll}>
                <input
                  type="text"
                  placeholder="이메일을 입력해 주세요."
                  className={styles.input}
                  onChange={onChangeEmail}
                  style={{
                    border:
                      isError === true
                        ? "1px solid var(--red, #F66A6A)"
                        : "1px solid var(--Gray-Gray-200, #d4d3d3)",
                  }}
                />
                <div className={styles.inputErrorEnroll}>
                  <input
                    type="password"
                    placeholder="비밀번호를 입력해 주세요."
                    className={styles.input}
                    onChange={onChangePassword}
                    style={{
                      border:
                        isError === true
                          ? "1px solid var(--red, #F66A6A)"
                          : "1px solid var(--Gray-Gray-200, #d4d3d3)",
                    }}
                  />
                  <div
                    className={styles.inputError}
                    style={{ display: isError === true ? "block" : "none" }}
                  >
                    아이디 또는 비밀번호를 확인해 주세요.
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.bottom}>
              <button
                className={styles.loginButton}
                onClick={onClickLogin}
                style={{
                  backgroundColor:
                    isActive === true ? "#2974e5" : " var(--gray-300, #C7C7C7)",
                }}
              >
                로그인
              </button>
              <div onClick={onClickSignupGo} className={styles.signinButton}>
                회원가입
              </div>
            </div>
          </div>
        </div>
        <div className={styles.rightZone}>
          <Image
            className={styles.homepageImage}
            src="/images/homepage.png"
            alt="homepageImage"
            width={0}
            height={0}
            sizes="100vw"
          />
        </div>
      </div>
    </>
  );
}
