"use client";

import { Button, Inputfield } from "@commons/ui";
import styles from "./styles.module.css";
import useLogin from "./hook";

export default function Login() {
  const { onClickSignup, onChangeEmail, onChangePassword, onCLickLogin, isValid } = useLogin();
  return (
    <form className={styles.formContainer} onSubmit={onCLickLogin}>
      <>
        <img src="/icons/triptrip_logo.svg" />
        <span>트립트립에 오신걸 환영합니다.</span>
      </>
      <div>
        <p>트립트립에 로그인 하세요.</p>
        <div className={isValid ? `${styles.inputContainer}` : `${styles.inputContainer}  ${styles.error}`}>
          <Inputfield type="text" placeholder="이메일을 입력해 주세요." onChange={onChangeEmail} />
          <Inputfield type="password" placeholder="비밀번호를 입력해 주세요." onChange={onChangePassword} />
          <span style={{ display: isValid ? "none" : "block" }}>아이디 또는 비밀번호를 확인해 주세요.</span>
        </div>
      </div>
      <>
        <Button variant="FormBtn" type="submit">
          로그인
        </Button>
        <p className={styles.SignupBtn} onClick={onClickSignup}>
          회원가입
        </p>
      </>
    </form>
  );
}
