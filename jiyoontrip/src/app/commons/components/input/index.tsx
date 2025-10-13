"use client";

import styles from "./styles.module.css";

export default function MyInput() {
  //   const { register } = useFormContext();

  return (
    <>
      <input
        id="author-input-1"
        className={styles.inputArea__input}
        type="text"
        placeholder="작성자 명을 입력해 주세요."
        {...register("writer")}
        disabled={isEdit === true ? true : false}
        style={{
          backgroundColor: isEdit === true ? "#f2f2f2" : "#fff",
        }}
      />
    </>
  );
}
