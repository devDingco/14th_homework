"use client";

import { Button, Inputfield } from "@commons/ui";
import styles from "./styles.module.css";
import useSignUp from "./hook";
import { Modal } from "antd";

export default function Signup() {
  const { errors, onChangeInputs, onClickSignup, onClickLogin, isModalOpen } = useSignUp();
  return (
    <>
      <form className={styles.formContainer} onSubmit={onClickSignup}>
        <span className={styles.title}>회원가입</span>
        <div>
          회원가입을 위해 아래 빈칸을 모두 채워 주세요
          <div className={styles.inputContainer}>
            <div className={errors.email ? styles.error : ""}>
              <Inputfield
                type="text"
                placeholder="이메일을 입력해 주세요."
                label="이메일"
                required
                id="email"
                onChange={onChangeInputs}
              />
              {errors.email && <span className={styles.errorMessage}>이메일을 입력해 주세요.</span>}
            </div>
            <div className={errors.name ? styles.error : ""}>
              <Inputfield
                type="text"
                placeholder="이름을 입력해 주세요."
                label="이름"
                required
                id="name"
                onChange={onChangeInputs}
              />
              {errors.name && <span className={styles.errorMessage}>이름을 입력해 주세요.</span>}
            </div>
            <div className={errors.password ? styles.error : ""}>
              <Inputfield
                type="password"
                placeholder="비밀번호를 입력해 주세요."
                label="비밀번호"
                required
                id="password"
                onChange={onChangeInputs}
              />
              {errors.password && <span className={styles.errorMessage}>비밀번호를 입력해 주세요.</span>}
            </div>
            <div className={errors.passwordConfirm ? styles.error : ""}>
              <Inputfield
                type="password"
                placeholder="비밀번호를 한번 더 입력해 주세요."
                label="비밀번호 확인"
                required
                id="passwordConfirm"
                onChange={onChangeInputs}
              />
              {errors.passwordConfirm && (
                <span className={styles.errorMessage}>비밀번호를 입력해 주세요.</span>
              )}
            </div>
          </div>
        </div>
        <>
          <Button variant="FormBtn" type="submit">
            회원가입
          </Button>
        </>
      </form>
      <Modal
        open={isModalOpen}
        centered
        onOk={() => {}}
        onCancel={() => {}}
        closeIcon={null}
        classNames={{ content: styles.modal, footer: styles.modalBtn }}
        footer={
          <Button variant="modalBtn" type="submit" onClick={onClickLogin}>
            로그인하기
          </Button>
        }
      >
        <div>회원가입을 축하드려요.</div>
        <div>
          <img src="/icons/triptrip_logo.svg" />
        </div>
      </Modal>
    </>
  );
}
