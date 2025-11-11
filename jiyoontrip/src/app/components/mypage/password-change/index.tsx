"use client";
import { useForm } from "react-hook-form";
import MyInput from "@/app/commons/components/input";
import MyButton from "@/app/commons/components/button";
import styles from "./styles.module.css";

export default function PasswordChange() {
  const { register, formState } = useForm({
    mode: "onChange",
  });

  return (
    <form className={styles.passwordArea}>
      <h2 className={styles.title}>비밀번호 변경</h2>
      <div className={styles.formContainer}>
        <div className={styles.inputsContainer}>
          <div className={styles.inputWrapper}>
            <div className={styles.labelArea}>
              <label className={styles.label}>새 비밀번호</label>
              <span className={styles.required}>*</span>
            </div>
            <MyInput
              type="password"
              placeholder="새 비밀번호를 입력해 주세요."
              register={register}
              name="newPassword"
              className={styles.input}
            />
          </div>
          <div className={styles.inputWrapper}>
            <div className={styles.labelArea}>
              <label className={styles.label}>새 비밀번호 확인</label>
              <span className={styles.required}>*</span>
            </div>
            <MyInput
              type="password"
              placeholder="새 비밀번호를 확인해 주세요."
              register={register}
              name="newPasswordConfirm"
              className={styles.input}
            />
          </div>
        </div>
        <MyButton
          formState={formState}
          style={{
            alignSelf: "flex-end",
            width: "130px",
            height: "48px",
            backgroundColor: formState.isValid ? "#000000" : "#c7c7c7",
            borderRadius: "8px",
          }}
        >
          비밀번호 변경
        </MyButton>
      </div>
    </form>
  );
}
