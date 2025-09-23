"use client";
import Image from "next/image";
import { IBoardWriteProps } from "./types";
import { useBoardWrite } from "./hook";
import styles from "./styles.module.css";
import addImage from "@assets/add_image.png";

const IMAGE_SRC = { addImage: { src: addImage, alt: "사진추가이미지" } };

export default function BoardWritePage(props: IBoardWriteProps) {
  const { formData, errors, handleChange, isButtonDisabled, onSubmit } = useBoardWrite(props.isEdit);

  return (
    <div className={styles.layout}>
      <h1>{props.isEdit ? "게시물 수정" : "게시물 등록"}</h1>
      <input placeholder="작성자" value={formData.writer} onChange={handleChange("writer")} disabled={props.isEdit} />
      <div>{errors.name}</div>

      <input type="password" placeholder="비밀번호" value={formData.password} onChange={handleChange("password")} disabled={props.isEdit} />
      <div>{errors.password}</div>

      <input placeholder="제목" value={formData.title} onChange={handleChange("title")} />
      <div>{errors.title}</div>

      <textarea placeholder="내용" value={formData.contents} onChange={handleChange("contents")} />
      <div>{errors.contents}</div>

      <button disabled={!props.isEdit && isButtonDisabled} onClick={onSubmit}>
        {props.isEdit ? "수정" : "등록"}하기
      </button>
    </div>
  );