"use client";

import Image from "next/image";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
// import { gql, useMutation } from "@apollo/client";

export default function Home() {
  // const router = useRouter();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const onChangeName = (event) => {
    setName(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const onChangePasswordCheck = (event) => {
    setPasswordCheck(event.target.value);
  };
  const onClickSignup = async () => {};
  return (
    <>
      <div className={styles.page}>
        <div className={styles.leftZone}>
          <div className={styles.leftZoneEnroll}>
            <div className={styles.leftZoneEnrollTop}>
              <div className={styles.top}>
                <div className={styles.welcome}>회원가입</div>
                <div className={styles.logingogo}>
                  회원가입을 위해 아래 빈칸을 모두 채워 주세요.
                </div>
              </div>
              <div className={styles.inputEnroll}>
                <div className={styles.inputBlock}>
                  <div className={styles.inputLabel}>
                    <label>이메일</label>
                    <div className={styles.star}>*</div>
                  </div>
                  <input
                    type="text"
                    placeholder="이메일을 입력해 주세요."
                    className={styles.input}
                    onChange={onChangeEmail}
                  />
                </div>
                <div className={styles.inputBlock}>
                  <div className={styles.inputLabel}>
                    <label>이름</label>
                    <div className={styles.star}>*</div>
                  </div>
                  <input
                    type="text"
                    placeholder="이름을 입력해 주세요."
                    className={styles.input}
                    onChange={onChangeName}
                  />
                </div>
                <div className={styles.inputBlock}>
                  <div className={styles.inputLabel}>
                    <label>비밀번호</label>
                    <div className={styles.star}>*</div>
                  </div>
                  <input
                    type="password"
                    placeholder="비밀번호를 입력해 주세요."
                    className={styles.input}
                    onChange={onChangePassword}
                  />
                </div>
                <div className={styles.inputBlock}>
                  <div className={styles.inputLabel}>
                    <label>비밀번호 확인</label>
                    <div className={styles.star}>*</div>
                  </div>
                  <input
                    type="password"
                    placeholder="비밀번호를 한번 더  입력해 주세요."
                    className={styles.input}
                    onChange={onChangePasswordCheck}
                  />
                </div>
              </div>
            </div>
            <div className={styles.bottom}>
              <button className={styles.loginButton} onClick={onClickSignup}>
                회원가입
              </button>
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
