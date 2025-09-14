"use client";

import React from "react";
import DaumPostcode from "react-daum-postcode";
import type { BoardsWriteProps } from "./types";
import { useBoardsWrite } from "./hook";
import styles from "./styles.module.css";
import { Modal, Box, Typography, Button, TextField } from "@mui/material";

// 모달 스타일 정의 (MUI Box 컴포넌트용)
// as const를 사용하여 타입 추론을 더 명확하게 함
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  borderRadius: "8px",
} as const;

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
    onClickPostcodeSearch,
    onCompletePostcode,
    onClosePostcodeModal,
    isPostcodeModalOpen,
    onClickSubmit,
    onClickUpdate,
    onClickCancel,
    isFormValid,
    // hook에서 새로 추가된 모달 관련 상태와 함수들을 가져옵니다.
    modalState,
    handleCloseModal,
    handlePromptConfirm,
    handlePromptCancel,
    onChangePromptInput,
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
          <button type="button" className="button secondary" onClick={onClickPostcodeSearch}>우편번호 검색</button>
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
          className={`${(!props.isEdit && !isFormValid) ? styles.buttonDisabled : styles.buttonEnabled} button`}
          onClick={props.isEdit ? onClickUpdate : onClickSubmit}
          disabled={!props.isEdit && !isFormValid}
        >
          {props.isEdit ? "수정하기" : "등록하기"}
        </button>
      </div>

      {/* 우편번호 검색 모달 */}
      {isPostcodeModalOpen && (
        <div className={styles.modalOverlay} onClick={onClosePostcodeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>우편번호 검색</h3>
              <button type="button" className={styles.closeButton} onClick={onClosePostcodeModal}>
                ×
              </button>
            </div>
            <DaumPostcode
              onComplete={onCompletePostcode}
              style={{ width: "100%", height: "400px" }}
            />
          </div>
        </div>
      )}

      {/* 경고 및 프롬프트 모달 */}
      <Modal
        open={modalState.isOpen}
        onClose={modalState.isPrompt ? handlePromptCancel : handleCloseModal}
      >
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2">
            알림
          </Typography>
          <Typography>{modalState.message}</Typography>
          {modalState.isPrompt && (
            <TextField
              fullWidth
              label="비밀번호"
              variant="outlined"
              type="password"
              value={modalState.input}
              onChange={onChangePromptInput}
            />
          )}
          <div className={styles.buttonContainer} style={{ marginTop: "auto" }}>
            {modalState.isPrompt && (
              <Button onClick={handlePromptCancel} className="button secondary">
                취소
              </Button>
            )}
            <Button
              // 여기에 올바른 함수를 연결합니다.
              onClick={modalState.isPrompt ? handlePromptConfirm : handleCloseModal}
              className="button primary"
              style={{
                backgroundColor: "#4B5563",
                color: "#BDBDBD",
                marginLeft: modalState.isPrompt ? "8px" : "0",
              }}
            >
              확인
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
