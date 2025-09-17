'use client'

import styles from './styles.module.css'
import { ChatBubbleOutlineOutlined } from '@mui/icons-material'
import { CommentWriteProps } from './types'
import useCommentWrite from './hook'
import { Rate } from 'antd'

export default function CommentWriteComponent(props: CommentWriteProps) {
  const { isEdit = false, boardId, onClickEdit, el } = props
  const {
    handleChangeWriter,
    handleChangePassword,
    handleChangeContents,
    handleChangeRating,
    handleSubmit,
    handleChange,
    isDisabled,
    writer,
    password,
    contents,
    rating,
  } = useCommentWrite({ boardId, el, onClickEdit })

  return (
    <div className={styles.comment_layout}>
      <div className={styles.comment_title}>
        <ChatBubbleOutlineOutlined />
        <p>댓글</p>
      </div>
      <Rate onChange={handleChangeRating} value={rating} />
      {/* 인풋3개 들어가는 곳 */}
      <div className={styles.comment_inputs}>
        {/* 위에 인풋 2개 */}
        <div className={styles.comment_inputs_top}>
          <div className={styles.comment_input}>
            <div className={styles.comment_title}>
              <label htmlFor="comment_writer">작성자</label>
              <span className={styles.enroll_required_indicator}>*</span>
            </div>

            <input
              id="comment_writer"
              placeholder="작성자 명을 입력해 주세요."
              onChange={handleChangeWriter}
              value={writer}
              className={styles.enroll_input}
              readOnly={isEdit}
            />
          </div>
          <div className={styles.comment_input}>
            <div className={styles.comment_title}>
              <label htmlFor="comment_password">비밀번호</label>
              <span className={styles.enroll_required_indicator}>*</span>
            </div>
            <input
              type="password"
              id="comment_password"
              placeholder="비밀번호를 입력해 주세요."
              onChange={handleChangePassword}
              className={styles.enroll_input}
              value={password}
            />
          </div>
        </div>
        {/* 아래에 인풋 1개 */}
        <div className={styles.comment_wrapper}>
          <textarea
            placeholder="댓글을 입력해 주세요."
            className={`${styles.enroll_input} ${styles.enroll_textarea}`}
            onChange={handleChangeContents}
            value={contents}
            maxLength={100}
          ></textarea>
          <p className={styles.comment_len}>{contents.length}/100</p>
        </div>
        <div className={styles.active_buttons}>
          {isEdit ? (
            <>
              <button className={styles.enroll_cancel_button} onClick={onClickEdit}>
                취소
              </button>
              <button
                className={styles.enroll_submit_button}
                disabled={isDisabled}
                onClick={handleChange}
              >
                수정 하기
              </button>
            </>
          ) : (
            <button
              className={styles.enroll_submit_button}
              disabled={isDisabled}
              onClick={handleSubmit}
            >
              댓글 등록
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
