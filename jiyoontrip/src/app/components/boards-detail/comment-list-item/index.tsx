"use client";

import { ChangeEvent, useState } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import { useMutation } from "@apollo/client";
import { UPDATE__BOARD__COMMENT } from "./queries";
import { FetchBoardCommentsDocument } from "@/commons/graphql/graphql";
const grayStar = "/images/graystar.webp";
const yellowStar = "/images/yellowstar.webp";

export default function CommentItem({ el }) {
  const [isCommentEdit, setIsCommentEdit] = useState(false);
  const [isActive, setIsActive] = useState(false);
  // const [author, setAuthor] = useState("");
  const [password, setPassword] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);
  const stars = [1, 2, 3, 4, 5];
  const [updateBoardComment] = useMutation(UPDATE__BOARD__COMMENT);
  // const onChangeAuthor = (event: ChangeEvent<HTMLInputElement>) => {
  //   setAuthor(event.target.value);
  //   if (event.target.value !== "" && password !== "" && content !== "") {
  //     setIsActive(true);
  //   }
  // };
  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    if (event.target.value !== "" && content !== "") {
      setIsActive(true);
    }
  };
  const onChangeContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
    if (password !== "" && event.target.value !== "") {
      setIsActive(true);
    }
  };

  // const onChangeRating = (event: ChangeEvent<HTMLInputElement>) => {
  //   setRating(event.target.val)
  // }

  const onClickEdit = () => {
    setIsCommentEdit(true);
    setRating(el.rating);
  };

  const updateContent = content || el.contents;
  const updateStar = rating || el.rating;

  const onClickUpdate = async () => {
    const result = await updateBoardComment({
      variables: {
        updateBoardCommentInput: {
          contents: updateContent,
          rating: updateStar,
        },
        password: password,
        boardCommentId: el._id,
      },
      refetchQueries: [
        {
          query: FetchBoardCommentsDocument,
          variables: { boardId: el.boardId ?? "" },
        },
      ],
    });
    console.log(result);
  };

  const onClickCancel = () => {
    setIsCommentEdit(false);
  };

  return isCommentEdit ? (
    <div className={styles.container}>
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
            value={el.writer}
            disabled
            // onChange={onChangeAuthor}
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
            // value={password}
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
          value={content || el.contents}
          onChange={onChangeContent}
        />
        {/* <div className={styles.inputError}>{}</div> */}
      </div>
      <div className={styles.enrollButton}>
        <button className={styles.inputArea__cancelButton} onClick={onClickCancel}>
          취소
        </button>
        <button
          className={styles.inputArea__registerButton}
          // onClick={}
          style={{
            backgroundColor: isActive === true ? "#000" : "#C7C7C7",
          }}
          onClick={onClickUpdate}
        >
          수정하기
        </button>
      </div>
      <hr className={styles.line} />
    </div>
  ) : (
    <div key={el._id} className={styles.commentList__item}>
      <div className={styles.commentList__item__enroll}>
        <div className={styles.commentList__item__enroll__left}>
          <div className={styles.commentList__item__enroll__left__profile}>
            <Image
              src="/icons/outline/profile.svg"
              alt="ProfileIcon"
              width={24}
              height={24}
              sizes="100vw"
            />
            {el.writer}
          </div>
          <div className={styles.stars}>
            {Array.from({ length: 5 }).map((_, index) => (
              <Image
                key={index}
                src={index + 1 <= el.rating ? yellowStar : grayStar}
                alt="StarIcon"
                width={24}
                height={24}
                sizes="100vw"
              />
            ))}
          </div>
        </div>
        <div className={styles.commentList__item__enroll__right}>
          <button onClick={onClickEdit}>
            <Image
              src="/icons/outline/edit.svg"
              alt="EditIcon"
              width={24}
              height={24}
              sizes="100vw"
            />
          </button>
          <button>
            <Image
              src="/icons/outline/close.svg"
              alt="CloseIcon"
              width={24}
              height={24}
              sizes="100vw"
            />
          </button>
        </div>
      </div>
      <div className={styles.commentList__item__content}>{el.contents}</div>
      <div className={styles.commentList__item__date}>{el.createdAt.split("T")[0]}</div>
      <hr className={styles.line} />
    </div>
  );
}
