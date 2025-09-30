"use client";

import Image from "next/image";
import styles from "./styles.module.css";
// import { useRouter } from "next/navigation";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";

const CREAT_USER = gql`
  mutation createUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      _id
      email
      name
      picture
      createdAt
      updatedAt
      deletedAt
    }
  }
`;

export default function Home() {
  const router = useRouter();
  const [createUser] = useMutation(CREAT_USER);
  const [isActive, setIsActive] = useState(false);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordCheckError, setPasswordCheckError] = useState(false);
  const onChangeEmail = (event) => {
    setEmail(event.target.value);
    if (
      event.target.value !== "" &&
      name !== "" &&
      password !== "" &&
      passwordCheck !== ""
    ) {
      setIsActive(true);
    }
  };
  const onChangeName = (event) => {
    setName(event.target.value);
    if (
      email !== "" &&
      event.target.value !== "" &&
      password !== "" &&
      passwordCheck !== ""
    ) {
      setIsActive(true);
    }
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
    if (
      email !== "" &&
      name !== "" &&
      event.target.value !== "" &&
      passwordCheck !== ""
    ) {
      setIsActive(true);
    }
  };

  const onChangePasswordCheck = (event) => {
    setPasswordCheck(event.target.value);
    if (email !== "" && name !== "" && password !== "" && event.target.value !== "") {
      setIsActive(true);
    }
  };

  const onClickSignup = async () => {
    try {
      if (email === "") {
        setEmailError(true);
      }
      if (name === "") {
        setNameError(true);
      }
      if (password === "") {
        setPasswordError(true);
      }
      if (passwordCheck === "") {
        setPasswordCheckError(true);
      }

      if (email !== "" && name !== "" && password !== "" && passwordCheck !== "") {
        await createUser({
          variables: {
            createUserInput: { email: email, password: password, name: name },
          },
        });
        alert("회원가입을 축하드립니다.");
        router.push("/boards");
      }
    } catch (error) {
      alert(error);
    }
  };
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
                    <label className={styles.label}>이메일</label>
                    <div className={styles.star}>*</div>
                  </div>
                  <input
                    type="text"
                    placeholder="이메일을 입력해 주세요."
                    className={styles.input}
                    onChange={onChangeEmail}
                    style={{
                      border:
                        emailError === true
                          ? "1px solid var(--red, #F66A6A)"
                          : "1px solid var(--Gray-Gray-200, #d4d3d3)",
                    }}
                  />
                  <div
                    className={styles.inputError}
                    style={{ display: emailError === true ? "block" : "none" }}
                  >
                    이메일을 입력해 주세요.
                  </div>
                </div>
                <div className={styles.inputBlock}>
                  <div className={styles.inputLabel}>
                    <label className={styles.label}>이름</label>
                    <div className={styles.star}>*</div>
                  </div>
                  <input
                    type="text"
                    placeholder="이름을 입력해 주세요."
                    className={styles.input}
                    onChange={onChangeName}
                    style={{
                      border:
                        nameError === true
                          ? "1px solid var(--red, #F66A6A)"
                          : "1px solid var(--Gray-Gray-200, #d4d3d3)",
                    }}
                  />
                  <div
                    className={styles.inputError}
                    style={{ display: nameError === true ? "block" : "none" }}
                  >
                    이름을 입력해 주세요.
                  </div>
                </div>
                <div className={styles.inputBlock}>
                  <div className={styles.inputLabel}>
                    <label className={styles.label}>비밀번호</label>
                    <div className={styles.star}>*</div>
                  </div>
                  <input
                    type="password"
                    placeholder="비밀번호를 입력해 주세요."
                    className={styles.input}
                    onChange={onChangePassword}
                    style={{
                      border:
                        passwordError === true
                          ? "1px solid var(--red, #F66A6A)"
                          : "1px solid var(--Gray-Gray-200, #d4d3d3)",
                    }}
                  />
                  <div
                    className={styles.inputError}
                    style={{ display: passwordError === true ? "block" : "none" }}
                  >
                    비밀번호를 입력해 주세요.
                  </div>
                </div>
                <div className={styles.inputBlock}>
                  <div className={styles.inputLabel}>
                    <label className={styles.label}>비밀번호 확인</label>
                    <div className={styles.star}>*</div>
                  </div>
                  <input
                    type="password"
                    placeholder="비밀번호를 한번 더 입력해 주세요."
                    className={styles.input}
                    onChange={onChangePasswordCheck}
                    style={{
                      border:
                        passwordCheckError === true
                          ? "1px solid var(--red, #F66A6A)"
                          : "1px solid var(--Gray-Gray-200, #d4d3d3)",
                    }}
                  />
                  <div
                    className={styles.inputError}
                    style={{ display: passwordCheckError === true ? "block" : "none" }}
                  >
                    비밀번호를 입력해 주세요.
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.bottom}>
              <button
                className={styles.loginButton}
                onClick={onClickSignup}
                style={{
                  backgroundColor:
                    isActive === true ? "#2974e5" : " var(--gray-300, #C7C7C7)",
                }}
              >
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
