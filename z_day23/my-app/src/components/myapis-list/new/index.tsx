"use client";

import styles from "./styles.module.css";
import Link from "next/link";
import { IMyapisFormProps } from "./types";
import { useMyapisForm } from "./hooks";

export default function MyapisForm({ isEdit = false }: IMyapisFormProps) {
  const { formData, loading, success, handleChange, handleSubmit } =
    useMyapisForm(isEdit);

  return (
    <div className={styles.container}>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <h1 className={styles.title}>
          {isEdit ? "게시글 수정" : "게시글 등록"}
        </h1>
        {success && (
          <div className={styles.successMessage}>
            {isEdit
              ? "게시글이 성공적으로 수정되었습니다!"
              : "게시글이 성공적으로 등록되었습니다!"}
          </div>
        )}
        <div className={styles.formGroup}>
          <label htmlFor="writer" className={styles.label}>
            작성자
          </label>
          <input
            id="writer"
            name="writer"
            type="text"
            className={styles.input}
            placeholder="작성자를 입력해주세요."
            value={formData.writer}
            onChange={handleChange}
            required
            disabled={isEdit}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="title" className={styles.label}>
            제목
          </label>
          <input
            id="title"
            name="title"
            type="text"
            className={styles.input}
            placeholder="제목을 입력해주세요."
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="content" className={styles.label}>
            내용
          </label>
          <textarea
            id="content"
            name="content"
            className={styles.textarea}
            placeholder="내용을 입력해주세요."
            value={formData.content}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={loading}
        >
          {isEdit
            ? loading
              ? "수정 중..."
              : "수정하기"
            : loading
            ? "등록 중..."
            : "등록하기"}
        </button>
        <Link href="/myapis" className={styles.backButton}>
          취소
        </Link>
      </form>
    </div>
  );
}
