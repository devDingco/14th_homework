"use client";

import React from "react";
import Image from "next/image";
import styles from "./style.module.css";
import { useBoardsComponentWrite } from "./hook";
import { IBoardsComponentWriteProps } from "./types";
import addIcon from "../../app/boards/new/assets/add.svg";
import { Button, Modal } from "antd";

import { useState } from "react";
import DaumPostcodeEmbed from "react-daum-postcode";

export default function BoardsComponentWrite(
  props: IBoardsComponentWriteProps
) {
  const { isEdit } = props;

  const {
    data,
    writer,
    password,
    title,
    contents,
    isModalOpen,
    zonecode,
    address,
    addressDetail,
    youtubeUrl,
    onChangeWriter,
    onChangeTitle,
    onChangePassword,
    onChangeContents,
    onChangeAddressDetail,
    onChangeYoutubeUrl,

    onClickSignup,
    onClickEdit,

    handleOk,
    handleCancel,
    handleComplete,
    onClickOpenModal,

    등록버튼비활성화,
  } = useBoardsComponentWrite(isEdit);

  return (
    <div className={styles.게시물등록_frame}>
      <div className={styles.게시물등록_container}>
        <h1>게시물{props.isEdit ? " 수정" : " 등록"}</h1>

        <div className={styles.게시물등록_작성자and비밀번호}>
          <div className={styles.게시물등록_사용자인풋}>
            <label htmlFor="작성자" className={styles.게시물등록_라벨}>
              작성자 <span className={styles.required}>*</span>
            </label>
            <input
              id="작성자"
              className={
                isEdit
                  ? styles.게시물등록_수정플레이스홀더
                  : styles.게시물등록_플레이스홀더
              }
              disabled={isEdit ? true : false}
              type="text"
              placeholder="작성자 명을 입력해 주세요."
              onChange={onChangeWriter}
              defaultValue={isEdit ? data?.fetchBoard.writer : writer}
            />
            {/* <div className={styles.에러메세지_스타일}>{writererror}</div> */}
          </div>

          <div className={styles.게시물등록_사용자인풋}>
            <label htmlFor="비밀번호" className={styles.게시물등록_라벨}>
              비밀번호 <span style={{ color: "red" }}>*</span>
            </label>
            <input
              id="비밀번호"
              className={
                isEdit
                  ? styles.게시물등록_수정플레이스홀더
                  : styles.게시물등록_플레이스홀더
              }
              disabled={isEdit ? true : false}
              type="text"
              placeholder="비밀번호를 입력해 주세요."
              onChange={onChangePassword}
              defaultValue={data ? "********" : ""}
            />
            {/* <div className={styles.에러메세지_스타일}>{passworderror}</div> */}
          </div>
        </div>

        <hr />

        <div className={styles.게시물등록_사용자인풋}>
          <label htmlFor="제목" className={styles.게시물등록_라벨}>
            제목 <span style={{ color: "red" }}>*</span>
          </label>
          <input
            id="제목"
            className={styles.게시물등록_플레이스홀더}
            type="text"
            placeholder="제목을 입력해 주세요."
            onChange={onChangeTitle}
            defaultValue={data?.fetchBoard.title}
          />
          {/* <div className={styles.에러메세지_스타일}>{titleerror}</div> */}
        </div>

        <div className={styles.게시물등록_사용자인풋}>
          <label htmlFor="내용" className={styles.게시물등록_라벨}>
            내용 <span style={{ color: "red" }}>*</span>
          </label>
          <textarea
            id="내용"
            className={styles.게시물등록_플레이스홀더_내용}
            placeholder="내용을 입력해 주세요."
            onChange={onChangeContents}
            defaultValue={data?.fetchBoard.contents}
          />
          {/* <div className={styles.에러메세지_스타일}>{contenterror}</div> */}
        </div>

        <hr />

        <div className={styles.게시물등록_주소인풋}>
          <div className={styles.게시물등록_주소_상단}>
            <label className={styles.게시물등록_주소인풋_라벨}>주소</label>
            <div className={styles.게시물등록_주소인풋_우편번호}>
              <input
                className={styles.게시물등록_주소인풋_플레이스홀더}
                type="text"
                placeholder="01234"
                value={zonecode || data?.fetchBoard.boardAddress.zipcode || ""}
              />
              <button
                className={styles.게시물등록_주소인풋_우편번호버튼}
                onClick={onClickOpenModal}
              >
                우편번호 검색
              </button>
            </div>
          </div>

          <input
            className={styles.게시물등록_플레이스홀더}
            type="text"
            placeholder="주소를 입력해 주세요."
            value={address || data?.fetchBoard.boardAddress.address || ""}
          />
          <input
            className={styles.게시물등록_플레이스홀더}
            type="text"
            placeholder="상세주소"
            defaultValue={
              addressDetail || data?.fetchBoard.boardAddress.addressDetail || ""
            }
            onChange={onChangeAddressDetail}
          />
        </div>

        <hr />

        <div className={styles.게시물등록_사용자인풋}>
          <label htmlFor="유튜브링크" className={styles.게시물등록_라벨}>
            유튜브 링크
          </label>
          <input
            id="유튜브링크"
            className={styles.게시물등록_플레이스홀더}
            type="text"
            placeholder="링크를 입력해 주세요"
            defaultValue={data?.fetchBoard.youtubeUrl ?? ""}
            onChange={onChangeYoutubeUrl}
          />
        </div>

        <hr />

        <div className={styles.사진첨부인풋}>
          <label>사진첨부</label>
          <div className={styles.게시물등록_사진첨부}>
            <label>
              <div className={styles.게시물등록_사진첨부_박스}>
                <Image src={addIcon} alt={addIcon} />
                <p>클릭해서 사진 업로드</p>
                <input type="file" />
              </div>
            </label>
            <label>
              <div className={styles.게시물등록_사진첨부_박스}>
                <Image src={addIcon} alt={addIcon} />
                <p>클릭해서 사진 업로드</p>
                <input type="file" />
              </div>
            </label>
            <label>
              <div className={styles.게시물등록_사진첨부_박스}>
                <Image src={addIcon} alt={addIcon} />
                <p>클릭해서 사진 업로드</p>
                <input type="file" />
              </div>
            </label>
          </div>
        </div>

        <div className={styles.게시물등록_취소and등록하기버튼}>
          <button className={styles.취소버튼}>취소</button>
          <button
            className={styles.등록하기버튼}
            onClick={isEdit ? onClickEdit : onClickSignup}
            disabled={isEdit ? false : 등록버튼비활성화}
          >
            {props.isEdit ? "수정" : "등록"}하기
          </button>
        </div>
      </div>
      <Modal
        title="Basic Modal"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <DaumPostcodeEmbed onComplete={handleComplete} />
      </Modal>
    </div>
  );
}
