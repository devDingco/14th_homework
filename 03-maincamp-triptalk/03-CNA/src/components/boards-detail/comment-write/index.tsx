"use client";

import React from "react";
import styles from "./styles.module.css";
import chatIcon from "@/assets/icons/chat.png";
import fiveStars from "@/assets/images/fivestars.png";
import useCommentWrite from "./hook";

export default function CommentWrite() {
  const {
    writer,
    setWriter,
    password,
    setPassword,
    comment,
    setComment,
    commentCount,
    isDisabled,
    onSubmit,
    loading,
  } = useCommentWrite();

  return (
    <div className={styles.commentFrame}>
      <div className={styles.commentBody}>
      <hr className={styles.sectionDivider} />
        <section className={styles.commentContainer} aria-label="댓글 작성">
          <header className={styles.header}>
            <img
              src={chatIcon.src}
              alt="댓글 아이콘"
              className={styles.chatIcon}
            />
            <h3 className={styles.title}>댓글</h3>
          </header>

          <img src={fiveStars.src} alt="별점" className={styles.stars} />

          <form className={styles.form} onSubmit={onSubmit}>
            <div className={styles.fields }>
              <div className={styles.rowInputs}>
                <div className={styles.inputBox}>
                  <label className={styles.label} htmlFor="comment-writer">
                    작성자 <span className={styles.required}>*</span>
                  </label>
                  <input
                    id="comment-writer"
                    className={styles.input}
                    placeholder="작성자 명을 입력해 주세요."
                    value={writer}
                    onChange={(e) => setWriter(e.target.value)}
                  />
                </div>
                <div className={styles.inputBox}>
                  <label className={styles.label} htmlFor="comment-password">
                    비밀번호 <span className={styles.required}>*</span>
                  </label>
                  <input
                    id="comment-password"
                    type="password"
                    className={styles.input}
                    placeholder="비밀번호를 입력해 주세요."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className={styles.textareaBox}>
                <textarea
                  className={styles.textarea}
                  placeholder="댓글을 입력해 주세요."
                  maxLength={100}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <span className={styles.counterInBox}>{commentCount}/100</span>
              </div>
            </div>
            <div className={styles.actions}>
              <button
                type="submit"
                className={styles.submitBtn}
                disabled={isDisabled || loading}
              >
                댓글 등록
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
