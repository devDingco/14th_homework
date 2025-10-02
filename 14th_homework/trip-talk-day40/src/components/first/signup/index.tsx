"use client";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
const CREATE_USER = gql`
  mutation createUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      _id
      email
      name
    }
  }
`;
export default function SignUP() {
  const router = useRouter();
  const [inputs, setInputs] = useState({
    email: "",
    name: "",
    password: "",
    passwordConfirm: "",
  });
  const [emailError, setEmailError] = useState(false);
  const [passwordErorr, setPasswordError] = useState(false);
  const onChangeInput = (event) => {
    setInputs((prev) => {
      const newInputs = {
        ...prev,
        [event?.target.id]: event.target.value,
      };

      return newInputs;
    });
  };
  useEffect(() => {
    if (inputs.email && !inputs.email.includes("@")) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
    if (inputs.password !== inputs.passwordConfirm) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  }, [inputs]);

  const [createUser] = useMutation(CREATE_USER);
  const onClickSingUp = async () => {
    console.log(inputs.email);
    console.log(inputs.password);
    console.log(typeof inputs.password);
    console.log(inputs.name);

    try {
      if (
        inputs.email &&
        inputs.name &&
        inputs.password &&
        inputs.passwordConfirm
      ) {
        const result = await createUser({
          variables: {
            createUserInput: {
              email: inputs.email,
              password: inputs.password,
              name: inputs.name,
            },
          },
        });
        console.log(result);
        alert("회원가입을 축하드립니다.");
        router.push("/");
      } else {
        alert("모든 항목을 입력해 주세요.");
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div className={styles.all}>
      <div className={styles.form}>
        <div className={styles.title}>
          <div className={styles.signup_title}>회원가입</div>
          <div className={styles.signup_guide}>
            회원가입을 위해 아래 빈칸을 모두 채워 주세요.
          </div>
        </div>
        <div className={styles.inputs}>
          <div className={styles.email}>
            <div className={styles.email_label}>
              <div>이메일</div>
              <img
                src="/images/_*.png"
                alt="아스타기호"
                style={{ width: "8px", height: "8px" }}
              />
            </div>
            <input
              id="email"
              type="text"
              placeholder="이메일을 입력해 주세요."
              className={styles.email_input}
              onChange={onChangeInput}
            />
            <div
              className={`${styles.email_alert} ${
                emailError ? styles.show : ""
              }`}
            >
              이메일 형식이 맞지 않습니다.
            </div>
          </div>
          <div className={styles.name}>
            <div className={styles.name_label}>
              <div>이름</div>
              <img
                src="/images/_*.png"
                alt="아스타기호"
                style={{ width: "8px", height: "8px" }}
              />
            </div>
            <input
              id="name"
              type="text"
              placeholder="이름을 입력해 주세요."
              className={styles.name_input}
              onChange={onChangeInput}
            />
          </div>
          <div className={styles.password}>
            <div className={styles.password_label}>
              <div>비밀번호</div>
              <img
                src="/images/_*.png"
                alt="아스타기호"
                style={{ width: "8px", height: "8px" }}
              />
            </div>
            <input
              id="password"
              type="password"
              placeholder="비밀번호를 입력해 주세요."
              className={styles.password_input}
              onChange={onChangeInput}
            />
          </div>
          <div className={styles.password_confirm}>
            <div className={styles.password_confirm_label}>
              <div>비밀번호 확인</div>
              <img
                src="/images/_*.png"
                alt="아스타기호"
                style={{ width: "8px", height: "8px" }}
              />
            </div>
            <input
              id="passwordConfirm"
              type="password"
              placeholder="비밀번호를 한번 더 입력해 주세요."
              className={styles.password_confirm_input}
              onChange={onChangeInput}
            />
            <div
              className={`${styles.password_alert} ${
                passwordErorr ? styles.show : ""
              }`}
            >
              비밀번호가 일치하지 않습니다.
            </div>
          </div>
        </div>
        <button className={styles.button} onClick={onClickSingUp}>
          회원가입
        </button>
      </div>
      <img src="/images/Rectangle.png" alt="배경" width={1520} height={1080} />
    </div>
  );
}
