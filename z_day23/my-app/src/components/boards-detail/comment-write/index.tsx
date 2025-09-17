// src/components/comment-write/index.tsx
"use client";

import { Rate, Modal } from "antd";
import { VerySmallInput } from "@/components/boards-write/form-input";
import styles from "../detail/styles.module.css";
import { ICommentWriteProps } from "./types";
import { useCommentWrite } from "./hook";
import React from "react";

export default function CommentWrite({ boardId }: ICommentWriteProps) {
  const {
    writer,
    setWriter,
    password,
    setPassword,
    contents,
    setContents,
    rating,
    setRating,
    onClickSubmit,
    modalMessage,
    setModalMessage,
  } = useCommentWrite(boardId);

  return (
    <div className={styles.boards}>
      <div className={styles.boards_body}>
        <div className={styles.comment_body}>
          <div className={styles.comment_body_up}>
            <div className={styles.comment_body_up_title}>
              <img src="/images/chat.png" alt="댓글 아이콘" />
              <div className={styles.comment_body_up_title_font}>댓글</div>
            </div>

            {/* 별점 */}
            <Rate onChange={setRating} value={rating} />
            {rating > 0 && <span style={{ marginLeft: 8 }}>{rating}점</span>}

            {/* 입력 필드 */}
            <div className={styles.comment_body_field}>
              <div className={styles.comment_body_field_inside}>
                <div
                  className={styles.comment_body_field_inside_writer_password}
                >
                  <VerySmallInput
                    Input_Title="작성자"
                    Input_Placeholder="작성자 명을 입력해주세요."
                    Input_Star="*"
                    value={writer}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setWriter(e.target.value)
                    }
                  />
                  <VerySmallInput
                    Input_Title="비밀번호"
                    Input_Placeholder="비밀번호를 입력해주세요."
                    Input_Star="*"
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setPassword(e.target.value)
                    }
                  />
                </div>
                <textarea
                  className={styles.input_comment}
                  placeholder="댓글을 입력해주세요."
                  value={contents}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setContents(e.target.value)
                  }
                ></textarea>
              </div>
              <div className={styles.comment_submit_end}>
                <button
                  className={styles.comment_submit}
                  onClick={onClickSubmit}
                >
                  댓글 등록
                </button>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </div>

      {/* ✅ 모달로 메시지 출력 */}
      <Modal
        open={!!modalMessage}
        onOk={() => setModalMessage(null)}
        onCancel={() => setModalMessage(null)}
        okText="확인"
      >
        <div>{modalMessage}</div>
      </Modal>
    </div>
  );
}
