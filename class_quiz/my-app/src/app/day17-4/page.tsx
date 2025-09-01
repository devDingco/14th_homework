"use client";

import styles from "./styles.module.css";
import { useState } from "react";

export default function QuizPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const onChangeEmail = () => {};
  const onChangePassword = () => {};
  const onChangePasswordCheck = () => {};

  const onClickSignup = () => {};

  return (
    <>
      이메일:{" "}
      <input
        onChange={onChangeEmail}
        className={styles.input}
        placeholder="이메일을 입력해주세요."
      />
      <div></div>
      <br />
      <br />
      비밀번호:{" "}
      <input
        onChange={onChangePassword}
        className={styles.input}
        placeholder="비밀번호를 입력해주세요."
      />
      <div></div>
      <br />
      <br />
      비밀번호 확인:
      <input
        onChange={onChangePasswordCheck}
        className={styles.input}
        placeholder="비밀번호를 입력해주세요."
      />
      <div></div>
      <br />
      <br />
      <button className={styles.input} onClick={onClickSignup}>
        가입하기
      </button>
    </>
  );
}
