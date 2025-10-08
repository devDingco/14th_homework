"use client";

import React from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import { useBoardWrite } from "./hook";
import { IBoardWriteProps } from "./types";
import addImage from "@/assets/add_image.png";
import { Modal } from "antd";
import DaumPostcodeEmbed from "react-daum-postcode";

const IMAGE_SRC = { addImage: { src: addImage, alt: "사진추가이미지" } };

export default function BoardWritePage(props: IBoardWriteProps) {
  const { isEdit } = props;

  const {
    writer, writerError, onChangeWriter,
    password, passwordError, onChangePassword,
    title, titleError, onChangeTitle,
    contents, contentsError, onChangeContents,
    onClickSubmit, onClickUpdate,
    isActive, data,
    zipcode, address, addressDetail, youtubeUrl, isModalOpen,
    onChangeAddressDetail, onChangeYoutubeUrl, handleToggleModal, handleComplete,
  } = useBoardWrite(isEdit);

  return (
    <div className={styles.layout}>
      {isModalOpen && (
        <Modal title="우편번호 검색" open={true} onCancel={handleToggleModal} footer={null}>
          <DaumPostcodeEmbed onComplete={handleComplete} />
        </Modal>
      )}

      <div className={styles.enroll_subject}>
        <div className={styles.enroll_subject_text}>
          {isEdit ? "게시물 수정" : "게시물 등록"}
        </div>
      </div>
      <div className={styles.enroll_row_container}>
        <div className={styles.enroll_row_section}>
          <div className={styles.enroll_row_flex}>
            <div className={styles.flex_half}>
              <div className={styles.enroll_form_title}>
                <div>작성자</div>
                <div className={styles.enroll_required_indicator}> *</div>
              </div>
              <input
                readOnly={isEdit}
                defaultValue={isEdit ? data?.fetchBoard?.writer : writer}
                type="text"
                placeholder="작성자 명을 입력해 주세요."
                className={isEdit ? styles.disabled_input : styles.enroll_input}
                onChange={onChangeWriter}
              />
              <div className={styles.error_msg}>{writerError}</div>
            </div>
            <div className={styles.flex_half}>
              <div className={styles.enroll_form_title}>
                <div>비밀번호</div>
                <div className={styles.enroll_required_indicator}> *</div>
              </div>
              <input
                type="password"
                placeholder="비밀번호를 입력해 주세요."
                className={styles.enroll_input}
                onChange={onChangePassword}
              />
              <div className={styles.error_msg}>{passwordError}</div>
            </div>
          </div>
        </div>

        <div className={styles.enroll_border}></div>

        <div className={styles.enroll_row_section}>
          <div className={styles.enroll_form_title}>
            <div>제목</div>
            <div className={styles.enroll_required_indicator}> *</div>
          </div>
          <input
            defaultValue={isEdit ? data?.fetchBoard?.title : title}
            type="text"
            className={styles.enroll_input}
            placeholder="제목을 입력해 주세요."
            onChange={onChangeTitle}
          />
          <div className={styles.error_msg}>{titleError}</div>
        </div>
        <div className={styles.enroll_border}></div>
        <div className={styles.enroll_row_section}>
          <div className={styles.enroll_form_title}>
            <div>내용</div>
            <div className={styles.enroll_required_indicator}> *</div>
          </div>
          <textarea
            defaultValue={isEdit ? data?.fetchBoard?.contents : contents}
            placeholder="내용을 입력해 주세요."
            className={`${styles.enroll_input} ${styles.enroll_textarea}`}
            onChange={onChangeContents}
          ></textarea>
          <div className={styles.error_msg}>{contentsError}</div>
        </div>
        <div className={styles.enroll_row_section}>
          <div className={styles.enroll_form_title}>
            <div>주소</div>
          </div>
          <div className={styles.enroll_address_firstrow}>
            <input
              type="text"
              className={styles.zipcode_input}
              placeholder="12345"
              readOnly
              value={zipcode}
            />
            <button className={styles.zipcode_search_button} onClick={handleToggleModal}>
              우편번호 검색
            </button>
          </div>
          <input
            placeholder="주소를 입력해주세요."
            className={styles.enroll_input}
            type="text"
            readOnly
            value={address}
          />
          <input
            placeholder="상세주소"
            className={styles.enroll_input}
            type="text"
            defaultValue={addressDetail}
            onChange={onChangeAddressDetail}
          />
        </div>
        <div className={styles.enroll_border}></div>
        <div className={styles.enroll_row_section}>
          <div className={styles.enroll_form_title}>
            <div>유튜브 링크</div>
          </div>
          <input
            className={styles.enroll_input}
            placeholder="링크를 입력해 주세요."
            value={youtubeUrl}
            onChange={onChangeYoutubeUrl}
          />
        </div>

        <div className={styles.enroll_border}></div>

        <div className={styles.enroll_row_section}>
          <div>사진 첨부</div>
          <div className={styles.picture_enroll_row}>
            <Image src={IMAGE_SRC.addImage.src} alt="이미지추가" />
            <Image src={IMAGE_SRC.addImage.src} alt="이미지추가" />
            <Image src={IMAGE_SRC.addImage.src} alt="이미지추가" />
          </div>
        </div>
      </div>
      <div className={styles.enroll_button_container}>
        <button className={styles.enroll_cancel_button}>취소</button>
        <button
          className={
            isActive
              ? styles.enroll_submit_button
              : `${styles.enroll_submit_button} ${styles.disabled}`
          }
          onClick={isEdit ? onClickUpdate : onClickSubmit}
          disabled={!isActive}
        >
          {isEdit ? "수정" : "등록"}하기
        </button>
      </div>
    </div>
  );
}