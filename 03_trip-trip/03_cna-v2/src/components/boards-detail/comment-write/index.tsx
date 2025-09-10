'use client'
import Image from 'next/image'
import styles from './styles.module.css'
import chatImage from '@assets/chat.png'

import { CommentWriteProps } from './types'
import useCommentWrite from './hook'

const IMAGE_SRC = {
  chatImage: {
    src: chatImage,
    alt: '사진추가이미지',
  },
}

export default function CommentWriteComponent(props: CommentWriteProps) {
  const {
    handleChangeWriter,
    handleChangePassword,
    handleChangeContents,
    handleChangeRating,
    handleSubmit,
    writer,
    password,
    contents,
    rating,
  } = useCommentWrite({ boardId: props.boardId })
  return (
    <div className={styles.comment_layout}>
      <div className={styles.comment_title}>
        <Image src={IMAGE_SRC.chatImage.src} alt={IMAGE_SRC.chatImage.alt} />
        <p>댓글</p>
      </div>
      <div>대충 별점 들어가는 곳 {rating}</div>
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
            />
          </div>
          <div className={styles.comment_input}>
            <div className={styles.comment_title}>
              <label htmlFor="comment_password">비밀번호</label>
              <span className={styles.enroll_required_indicator}>*</span>
            </div>
            <input
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
          ></textarea>
          <p className={styles.comment_len}>{0}/100</p>
        </div>
        <button className={styles.enroll_submit_button} disabled={false} onClick={handleSubmit}>
          댓글 등록
        </button>
      </div>
    </div>
  )
}
