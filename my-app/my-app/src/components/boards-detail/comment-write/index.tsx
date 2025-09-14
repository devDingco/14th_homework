"use client";

import Image from "next/image";
import chatIcon from "./icon/chat.svg";
import styles from "./styles.module.css";
import { useCommentWrite } from "./hook";

export default function CommentWrite() {
  const {
    writer,
    password,
    comment,
    rating,
    data,
    댓글등록버튼비활성화,
    onChangeWriter,
    onChangePassword,
    onChangeComment,
    setRating,
    onClickComment,
  } = useCommentWrite();

  return (
    <div className={styles.commentContainer}>
      <div className={styles.commentBody}>
        <div className={styles.commentFrame}>
          <div className={styles.commentTitle}>
            <Image src={chatIcon} alt="chatIcon" />
            <p>댓글</p>
          </div>

          <div className={styles.commentInputFrame}>
            <div>
              <label className={styles.inputLabel}>
                작성자 <span className={styles.required}>*</span>
              </label>
              <input
                className={styles.input}
                type="text"
                placeholder="작성자 명을 입력해주세요."
                value={writer}
                onChange={onChangeWriter}
              />
            </div>
            <div>
              <label className={styles.inputLabel}>
                비밀번호 <span className={styles.required}>*</span>
              </label>
              <input
                className={styles.input}
                type="password"
                placeholder="비밀번호를 입력해 주세요."
                value={password}
                onChange={onChangePassword}
              />
            </div>
          </div>
          <textarea
            className={styles.commentInput}
            placeholder="댓글을 입력해 주세요."
            value={comment}
            onChange={onChangeComment}
          />
          <button
            className={styles.commentButton}
            onClick={onClickComment}
            disabled={댓글등록버튼비활성화}
          >
            댓글등록
          </button>
        </div>
      </div>
    </div>
  );
}
