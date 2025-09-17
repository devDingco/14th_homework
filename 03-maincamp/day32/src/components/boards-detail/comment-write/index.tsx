import styles from './styles.module.css'
import useCommentWrite from './hook'
import React, { useState } from "react";
import { Rate } from "antd";
import { IProps } from "./types";





export default function CommentWrite(props:IProps) {
  const{
    onChangeWriter,
    onChangePassword,
    onChangeContents,
    onSubmit,
    writer,
    password,
    contents,
    rating,
    setRating,
    isComments,
    setIsComments,
    onClickCancel,
    onClickUpdate,
  } = useCommentWrite(props)


  
  return (
    <div className={styles.container}>
      <div className={styles.comment__write}>
        <h2 className={styles.comment__write__title}>
          <img src="/images/chat.png" alt="" /> 댓글
        </h2>

        <div className={styles.comment__write__rate}>
            <Rate onChange={setRating} value={rating} />
        </div>

        <div className={styles.comment__write__form}>
          <div className={styles.comment__write__form__input}>
            <div className={styles.comment__write__form__input__top}>
              <div className={styles.comment__write__form__input__top__left}>
                <h3>
                  작성자 <span style={{ color: 'red' }}>*</span>
                </h3>
                <input
                  // value={writer}
                  onChange={onChangeWriter}
                  type="text"
                  placeholder="작성자를 입력해주세요"
                  disabled={!!props.el}
                  defaultValue={props.el?.writer ?? writer}
                />
              </div>

              <div className={styles.comment__write__form__input__top__right}>
                <h3>
                  비밀번호 <span style={{ color: 'red' }}>*</span>
                </h3>
                <input
                  value={password}
                  onChange={onChangePassword}
                  type="password"
                  placeholder="비밀번호를 입력해주세요"
                  disabled={!!props.el}
                />
              </div>
            </div>

            <div className={styles.comment__write__form__input__bottom}>
              <input
                // value={contents}
                onChange={onChangeContents}
                type="text"
                placeholder="댓글을 입력해주세요"
                defaultValue={props.el?.contents ?? contents}
              />
              <div>{contents.length}/100</div>
            </div>
          </div>
          {props.isEdit ? <button onClick={onClickCancel}>취소</button> : ""}
          <button
            onClick={props.isEdit ? onClickUpdate : onSubmit} 
            
            className={styles.comment__write__form__button}
            
          >
            {props.isEdit ? '수정하기' : "댓글등록"}
          </button>
        </div>
      </div>

      <p className={isComments ? styles.comment__write__none__hidden : styles.comment__write__none}>
        등록된 댓글이 없습니다
      </p>
    </div>
  )
}
