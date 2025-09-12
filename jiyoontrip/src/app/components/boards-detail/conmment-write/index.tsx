"use client";

import useCommentWrite from "./hook";
import styles from "./styles.module.css";
import Image from "next/image";
const grayStar = "/images/graystar.webp";
const yellowStar = "/images/yellowstar.webp";

export default function CommentWriteComponent() {
  const {
    onChangePassword,
    onChangeContent,
    onChangeAuthor,
    onClickComment,
    setRating,
    isActive,
    stars,
    author,
    password,
    content,
    rating,
  } = useCommentWrite();
  return (
    <>
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.starRating}>
            <Image
              src="/icons/outline/chat.svg"
              alt="ChatIcon"
              width={24}
              height={24}
              sizes="100vw"
            />
            댓글
          </div>
          <div style={{ display: "flex", gap: "5px" }}>
            {stars.map((star) => (
              <Image
                key={star}
                onClick={() => setRating(star)}
                src={star <= rating ? yellowStar : grayStar}
                alt={`${star} star`}
                width={24}
                height={24}
              />
            ))}
          </div>
          <div className={styles.enrollAuthorPassword}>
            <div className={styles.inputArea}>
              <div className={styles.inputArea__enrollLabel}>
                <label
                  htmlFor="author-input-1"
                  className={styles.inputArea__enrollLabel__label}
                >
                  작성자
                </label>
                <span className={styles.inputArea__enrollLabel__star}>*</span>
              </div>
              <input
                id="author-input-1"
                className={styles.inputArea__input}
                type="text"
                placeholder="작성자 명을 입력해 주세요."
                value={author}
                onChange={onChangeAuthor}
              />
              <div className={styles.inputError}>{}</div>
            </div>
            <div className={styles.inputArea}>
              <div className={styles.inputArea__enrollLabel}>
                <label
                  htmlFor="author-input-2"
                  className={styles.inputArea__enrollLabel__label}
                >
                  비밀번호
                </label>
                <span className={styles.inputArea__enrollLabel__star}>*</span>
              </div>
              <input
                id="author-input-2"
                className={styles.inputArea__input}
                type="password"
                placeholder="비밀번호를 입력해 주세요."
                value={password}
                onChange={onChangePassword}
              />
              <div className={styles.inputError}>{}</div>
            </div>
          </div>
          <div className={styles.inputArea}>
            <textarea
              id="author-input-4"
              className={styles.inputArea__textarea}
              placeholder="내용을 입력해 주세요."
              value={content}
              onChange={onChangeContent}
            />
            {/* <div className={styles.inputError}>{}</div> */}
          </div>
          <div className={styles.enrollButton}>
            <button
              className={styles.inputArea__registerButton}
              onClick={onClickComment}
              style={{
                backgroundColor:
                  isActive === true
                    ? "#2974E5" // 등록 페이지에서 활성화 시 파란색
                    : "#C7C7C7",
              }}
            >
              댓글 등록
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
