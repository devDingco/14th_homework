"use client";

import styles from "./styles.module.css";
import { ChangeEvent, useState } from "react";

export default function QuizPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordCheckError, setPasswordCheckError] = useState("");

  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const onChangePasswordCheck = (event: ChangeEvent<HTMLInputElement>) => {
    setPasswordCheck(event.target.value);
  };

  const onClickSignup = () => {
    if (email.includes("@") !== true) {
      setEmailError("이메일 형식이 올바르지 않습니다.");
    } else {
      setEmailError("");
    }
    if (password !== passwordCheck) {
      setPasswordError("비밀번호가 일치하지 않습니다.");
      setPasswordCheckError("비밀번호가 일치하지 않습니다.");
    } else {
      setPasswordError("");
      setPasswordCheckError("");
    }
    if (
      email !== "" &&
      password !== "" &&
      passwordCheck !== "" &&
      email.includes("@") &&
      password === passwordCheck
    ) {
      alert("등록완료!");
    }
  };
  return (
    <>
      이메일:
      <input
        onChange={onChangeEmail}
        className={styles.input}
        placeholder="이메일을 입력해주세요."
      />
      <div className={styles.errorCSS}>{emailError}</div>
      <br />
      <br />
      비밀번호:
      <input
        onChange={onChangePassword}
        className={styles.input}
        placeholder="비밀번호를 입력해주세요."
      />
      <div className={styles.errorCSS}>{passwordError}</div>
      <br />
      <br />
      비밀번호 확인:
      <input
        onChange={onChangePasswordCheck}
        className={styles.input}
        placeholder="비밀번호를 입력해주세요."
      />
      <div className={styles.errorCSS}>{passwordCheckError}</div>
      <br />
      <br />
      <button className={styles.input} onClick={onClickSignup}>
        가입하기
      </button>
    </>
  );
}
