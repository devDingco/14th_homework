"use client";

import Image from "next/image";
import chatIcon from "./icon/chat.svg";
import styles from "./styles.module.css";
import { useCommentWrite } from "./hook";
import { Modal, Rate } from "antd";
import { ICommentWrite } from "./types";
import { Content } from "antd/es/layout/layout";

export default function CommentWrite({ isEdit, el }) {
  const {
    writer,
    password,
    comment,
    rating,
    data,
    등록버튼비활성화,
    isModalOpen,
    modalContent,
    handleOk,
    handleCancel,
    onChangeWriter,
    onChangePassword,
    onChangeComment,
    onChangeRating,
    onClickComment,
    onClickEditComment,
  } = useCommentWrite(el);
  {
  }

  return (
    <div className={styles.commentContainer}>
      <div className={styles.commentBody}>
        <div className={styles.commentFrame}>
          <div className={styles.commentTitle}>
            <Image src={chatIcon} alt="chatIcon" />
            <p>댓글</p>
          </div>
          <div>
            <Rate onChange={(e) => onChangeRating(e)} />
          </div>
          <div className={styles.commentInputFrame}>
            <div>
              <label className={styles.inputLabel}>
                작성자 <span className={styles.required}>*</span>
              </label>
              <input
                className={isEdit ? styles.inputEdit : styles.inputWrite}
                type="text"
                placeholder="작성자 명을 입력해주세요."
                // value={writer}
                defaultValue={isEdit ? el?.writer : writer}
                disabled={isEdit}
                onChange={onChangeWriter}
              />
            </div>
            <div>
              <label className={styles.inputLabel}>
                비밀번호 <span className={styles.required}>*</span>
              </label>
              <input
                className={styles.inputWrite}
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
            // value={comment}
            defaultValue={isEdit ? el?.contents : comment}
            onChange={onChangeComment}
          />
          <div>
            <button
              className={
                isEdit ? styles.showCancelButton : styles.hiddenCancelButton
              }
            >
              취소
            </button>
            <button
              className={
                isEdit ? styles.commentEditButton : styles.commentWriteButton
              }
              onClick={handleOk}
              disabled={등록버튼비활성화}
            >
              {isEdit ? "수정하기" : "댓글등록"}
            </button>
          </div>
          <Modal
            title="Message"
            open={isModalOpen}
            onOk={handleOk}
            // onOk={isEdit ? onClickEditComment : onClickComment}
            onCancel={handleCancel}
          >
            <p>{modalContent}</p>
          </Modal>
        </div>
      </div>
    </div>
  );
}
