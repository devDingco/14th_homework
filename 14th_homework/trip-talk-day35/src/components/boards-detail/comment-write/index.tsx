"use client";
import React, { cache } from "react";
import { Rate } from "antd";

import useCommentWrite from "./hook";
import styles from "./styles.module.css";
import Image from "next/image";
import { useMutation, useQuery } from "@apollo/client";
import { FETCH_BOARD_COMMENTS, UPDATE_BOARD_COMMENT } from "./queries";

export default function CommentWrite({ isEdit, commentId, el }) {
  const {
    writer,
    password,
    comment,
    boardId,
    onChangeWriter,
    onChangePassword,
    onChangeComment,
    onClickCreateComment,
    value,
    setValue,
  } = useCommentWrite();
  const [updateBoardComment] = useMutation(UPDATE_BOARD_COMMENT);
  const { data } = useQuery(FETCH_BOARD_COMMENTS);
  // const onClickCancleEdit = () => {};
  const onClickEdit = async () => {
    try {
      await updateBoardComment({
        variables: {
          updateBoardCommentInput: { contents: comment, rating: value },
          password: password,
          boardCommentId: commentId,
        },
        refetchQueries: [
          {
            query: FETCH_BOARD_COMMENTS,
            variables: { boardId: boardId, page: 1 },
          },
        ],
        // update(cache, { data: { updateBoardComment } }) {
        //   cache.modify({
        //     fields: {
        //       fetchBoardComments(existingComments = []) {
        //         return existingComments.map((c) =>
        //           c._id === commentId ? { ...c, ...updateBoardComment } : c
        //         );
        //       },
        //     },
        //   });
        // },
      });
      window.location.reload();
    } catch (error) {
      alert(error);
    }
  };

  return isEdit ? (
    <>
      <div>
        <Rate allowHalf value={value} onChange={setValue} />
      </div>
      <div>
        <div className={styles.작성자_비밀번호}>
          <div>
            <div className={styles.작성자_라벨}>
              <span>작성자</span>
              <Image
                src={"/images/_.png"}
                width={8}
                height={8}
                alt="아스타기호"
              />
            </div>
            <input
              className={styles.댓글작성자}
              type="text"
              placeholder="작성자 명을 입력해 주세요"
              value={writer}
              onChange={onChangeWriter}
            />
          </div>
          <div>
            <div className={styles.비밀번호_라벨}>
              <span>비밀번호</span>
              <Image
                src={"/images/_.png"}
                width={8}
                height={8}
                alt="아스타기호"
              />
            </div>
            <input
              className={styles.댓글비밀번호}
              type="password"
              placeholder="비밀번호를 입력해 주세요"
              value={password}
              onChange={onChangePassword}
            />
          </div>
        </div>
        <div>
          <textarea
            className={styles.댓글입력창}
            placeholder="댓글을 입력해 주세요."
            value={comment}
            onChange={onChangeComment}
          />
        </div>
        <div className={styles.댓글취소수정버튼}>
          <button
            className={styles.댓글취소버튼}
            id="댓글취소버튼"
            // onClick={onClickCancleEdit}
          >
            취소
          </button>
          <button
            className={styles.댓글수정버튼}
            id="댓글수정버튼"
            onClick={onClickEdit}
          >
            수정하기
          </button>
        </div>
      </div>
    </>
  ) : (
    <div className={styles.댓글작성}>
      <div className={styles.댓글아이콘}>
        <Image
          src={"/images/chat.svg"}
          width={24}
          height={24}
          alt="댓글아이콘"
        />
        <span className={styles.댓글}>댓글</span>
      </div>
      <div>
        <Rate allowHalf value={value} onChange={setValue} />
      </div>
      <div>
        <div className={styles.작성자_비밀번호}>
          <div>
            <div className={styles.작성자_라벨}>
              <span>작성자</span>
              <Image
                src={"/images/_.png"}
                width={8}
                height={8}
                alt="아스타기호"
              />
            </div>
            <input
              className={styles.댓글작성자}
              type="text"
              placeholder="작성자 명을 입력해 주세요"
              value={writer}
              onChange={onChangeWriter}
            />
          </div>
          <div>
            <div className={styles.비밀번호_라벨}>
              <span>비밀번호</span>
              <Image
                src={"/images/_.png"}
                width={8}
                height={8}
                alt="아스타기호"
              />
            </div>
            <input
              className={styles.댓글비밀번호}
              type="password"
              placeholder="비밀번호를 입력해 주세요"
              value={password}
              onChange={onChangePassword}
            />
          </div>
        </div>
        <div>
          <textarea
            className={styles.댓글입력창}
            placeholder="댓글을 입력해 주세요."
            value={comment}
            onChange={onChangeComment}
          />
        </div>
        <div className={styles.댓글등록버튼}>
          <button
            className={styles.댓글버튼}
            id="댓글등록버튼"
            onClick={onClickCreateComment}
          >
            댓글등록
          </button>
        </div>
      </div>
    </div>
  );
}
