"use client";

import React from "react";
import type { BoardsWriteProps } from "./types";
import { useBoardsWrite } from "./hook";
import styles from "./styles.module.css";

export default function BoardsWrite(props: BoardsWriteProps) {
  const {
    loading,
    error,
    writer,
    password,
    title,
    contents,
    youtubeUrl,
    boardAddress,
    errors,
    onChangeWriter,
    onChangePassword,
    onChangeTitle,
    onChangeContents,
    onChangeYoutubeUrl,
    onChangeBoardAddressZipcode,
    onChangeBoardAddressAddress,
    onChangeBoardAddressAddressDetail,
    onClickSubmit,
    onClickUpdate,
    onClickCancel,
    isFormValid,
  } = useBoardsWrite(props);

  if (loading) {
    return <div className="text-center mt-20">게시글 정보를 불러오는 중입니다...</div>;
  }

  if (error) {
    return <div className="text-center mt-20 text-red-500">게시글을 불러오는 중 에러가 발생했습니다.</div>;
  }

  return (
    <div className="content-container">
      <h1 className="post-title">{props.isEdit ? "게시글 수정" : "게시글 작성"}</h1>

      <div className="form-group first-group form-row-group">
        <div className="flex-1">
          <label className="label-required">작성자</label>
          <input
            type="text"
            className="input-field"
            placeholder="작성자를 입력해 주세요."
            value={writer}
            onChange={onChangeWriter}
            disabled={props.isEdit}
          />
          {errors.writer && <div className="error-message">{errors.writer}</div>}
        </div>
        <div className="flex-1">
          <label className="label-required">비밀번호</label>
          <input
            type="password"
            className="input-field"
            placeholder="비밀번호를 입력해 주세요."
            value={password}
            onChange={onChangePassword}
            disabled={props.isEdit}
          />
          {errors.password && <div className="error-message">{errors.password}</div>}
        </div>
      </div>

      <div className="form-group">
        <label className="label-required">제목</label>
        <input
          type="text"
          className="input-field"
          placeholder="제목을 입력해 주세요."
          value={title}
          onChange={onChangeTitle}
        />
        {errors.title && <div className="error-message">{errors.title}</div>}
      </div>

      <div className="form-group no-border">
        <label className="label-required">내용</label>
        <textarea
          className="textarea-field"
          placeholder="내용을 입력해 주세요."
          value={contents}
          onChange={onChangeContents}
        ></textarea>
        {errors.contents && <div className="error-message">{errors.contents}</div>}
      </div>

      <div className="form-group">
        <label>주소</label>
        <div className="flex-gap-8 mb-8">
          <input
            type="text"
            className="input-field w-120"
            placeholder="01234"
            value={boardAddress.zipcode}
            onChange={onChangeBoardAddressZipcode}
          />
          <button className="button secondary">우편번호 검색</button>
        </div>
        <input
          type="text"
          className="input-field mb-8"
          placeholder="주소를 입력해 주세요."
          value={boardAddress.address}
          onChange={onChangeBoardAddressAddress}
        />
        <input
          type="text"
          className="input-field"
          placeholder="상세주소"
          value={boardAddress.addressDetail}
          onChange={onChangeBoardAddressAddressDetail}
        />
      </div>

      <div className="form-group">
        <label>유튜브 링크</label>
        <input
          type="text"
          className="input-field"
          placeholder="링크를 입력해 주세요."
          value={youtubeUrl}
          onChange={onChangeYoutubeUrl}
        />
      </div>

      <div className="form-group">
        <label>사진 첨부</label>
        <div className="file-upload-grid">
          {Array(3)
            .fill(null)
            .map((_, index) => (
              <div key={index} className="file-upload-box">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
                <span>클릭해서 사진 업로드</span>
              </div>
            ))}
        </div>
      </div>

      <div className="button-container">
        <button className="button secondary" onClick={onClickCancel}>취소</button>
        <button
          className={`${(!props.isEdit && !isFormValid) ? styles.buttonDisabled : styles.buttonEnabled} button primary`}
          onClick={props.isEdit ? onClickUpdate : onClickSubmit}
          disabled={!props.isEdit && !isFormValid}
        >
          {props.isEdit ? "수정하기" : "등록하기"}
        </button>
      </div>
    </div>
  );
}
