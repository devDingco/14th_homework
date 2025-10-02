"use client";

import Image from "next/image";
import { Rate } from 'antd';
import styles from "./styles.module.css";
import { useCommentCreate } from "./hook";
import chatImage from "@/assets/ic_conversation.png";

export default function CommentWrite() {
  const {
    isButtonDisabled,
    onChangeWriter,
    onChangePW,
    onChangeText,
    onChangeRating,
    commentWriter,
    commentPassword,
    commentText,
    rating,
    createComment,
  } = useCommentCreate();

  return (
    <div className={styles.commentBodyArea}>
      <div className={styles.title}>
        <Image src={chatImage} alt="댓글 아이콘"  />
        <span>댓글</span>
      </div>

      <div className={styles.commentKeyArea}>
        <div className={styles.writerBox}>
          <div className={styles.inputTitle}>작성자 <span>*</span></div>
          <input
            value={commentWriter}
            onChange={onChangeWriter}
            placeholder="이름을 입력해주세요."
            className={styles.writerInput}
            type="text"
          />
        </div>
        <div className={styles.writerBox}>
          <div className={styles.inputTitle}>비밀번호 <span>*</span></div>
          <input
            value={commentPassword}
            onChange={onChangePW}
            placeholder="비밀번호를 입력해주세요."
            className={styles.writerInput}
            type="password"
          />
        </div>
      </div>

      <Rate onChange={onChangeRating} value={rating} />

      <div className={styles.commentInputBody}>
        <textarea
          value={commentText}
          onChange={onChangeText}
          className={styles.commentInput}
          placeholder="댓글을 입력하세요."
          maxLength={100}
        />
        <div className={styles.buttonBody}>
            <div className={styles.inputTextCount}>{commentText.length}/200</div>
            <button
              disabled={isButtonDisabled}
              className={styles.commentEnrollButton}
              onClick={createComment}
            >
              등록하기
            </button>
        </div>
      </div>
    </div>
  );
}