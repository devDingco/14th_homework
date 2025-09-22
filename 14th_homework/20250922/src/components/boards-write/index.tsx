"use client";

import React, { useRef, useState } from "react";
import DaumPostcode from "react-daum-postcode";
import type { BoardsWriteProps } from "./types";
import { useBoardsWrite } from "./hook";
import styles from "./styles.module.css";
import { Modal, Box, Typography, Button, TextField } from "@mui/material";
import { gql, useMutation } from "@apollo/client";
import { checkValidationFile } from "@/commons/libraries/image-validation";

// 모달 스타일 정의
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

// 게시글 등록 GraphQL 쿼리
const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
      writer
      title
      contents
    }
  }
`;

// 파일 업로드 GraphQL 쿼리
const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`;

export default function BoardsWrite(props: BoardsWriteProps) {
  const {
    loading,
    error,
    formData,
    password,
    youtubeUrl,
    boardAddress,
    images,
    errors,
    handleInputChange,
    onChangePassword,
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
    modalState,
    handleCloseModal,
    handlePromptConfirm,
    handlePromptCancel,
    onChangePromptInput,
  } = useBoardsWrite(props);

  // 이미지 업로드 관련 상태 및 ref
  const [imageUrls, setImageUrls] = useState(["", "", ""]);
  const fileRefs = useRef([null, null, null]);

  const [uploadFile] = useMutation(UPLOAD_FILE);
  const [createBoard] = useMutation(CREATE_BOARD);
  
  const onChangeFile = async (event, index) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const isValid = checkValidationFile(file);
    if (!isValid) return;

    try {
      const result = await uploadFile({ variables: { file } });
      const newImageUrls = [...imageUrls];
      newImageUrls[index] = result.data?.uploadFile.url || "";
      setImageUrls(newImageUrls);
    } catch (e) {
      console.error(e);
      alert("이미지 업로드에 실패했습니다.");
    }
  };

  const onClickImage = (index) => () => {
    fileRefs.current[index]?.click();
  };

  const onClickDelete = (index) => (event) => {
    event.stopPropagation();
    const newImageUrls = [...imageUrls];
    newImageUrls[index] = "";
    setImageUrls(newImageUrls);
  };

  const finalSubmit = async () => {
    try {
      if (props.isEdit) {
        // 기존 onClickUpdate 로직 호출
        onClickUpdate();
      } else {
        const result = await createBoard({
          variables: {
            createBoardInput: {
              writer: formData.writer,
              title: formData.title,
              contents: formData.contents,
              password: password,
              images: imageUrls.filter(url => url !== ""),
            },
          },
        });
        console.log("게시글 등록 성공:", result);
        // 등록 후 추가 로직 (예: 페이지 이동)
      }
    } catch (e) {
      console.error("게시글 등록/수정 실패:", e);
      // 에러 모달 등을 띄울 수 있음
    }
  };


  if (loading) {
    return <div className="text-center mt-20">게시글 정보를 불러오는 중입니다...</div>;
  }

  if (error) {
    return <div className="text-center mt-20 text-red-500">게시글을 불러오는 중 에러가 발생했습니다.</div>;
  }
  
  const isAllFormValid = isFormValid && formData.writer && formData.title && formData.contents && password;

  return (
    <div className="content-container">
      <h1 className="post-title">{props.isEdit ? "게시글 수정" : "게시글 작성"}</h1>

      <div className="form-group first-group form-row-group">
        <div className="flex-1">
          <label className="label-required">작성자</label>
          <input
            type="text"
            name="writer"
            className="input-field"
            placeholder="작성자를 입력해 주세요."
            value={formData.writer}
            onChange={handleInputChange}
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
          name="title"
          className="input-field"
          placeholder="제목을 입력해 주세요."
          value={formData.title}
          onChange={handleInputChange}
        />
        {errors.title && <div className="error-message">{errors.title}</div>}
      </div>

      <div className="form-group no-border">
        <label className="label-required">내용</label>
        <textarea
          name="contents"
          className="textarea-field"
          placeholder="내용을 입력해 주세요."
          value={formData.contents}
          onChange={handleInputChange}
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
          <button type="button" className="button secondary" onClick={onClickPostcodeSearch}>
            우편번호 검색
          </button>
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
          {imageUrls.map((imageUrl, index) => (
            <div
              key={index}
              className="file-upload-box"
              onClick={onClickImage(index)}
              style={{
                backgroundImage: imageUrl ? `url(https://storage.googleapis.com/${imageUrl})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative",
              }}
            >
              {!imageUrl && (
                <>
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
                </>
              )}
              {imageUrl && (
                <div
                  className={styles.deleteButton}
                  onClick={onClickDelete(index)}
                >
                  <img src="/images/picture_delete.png" alt="삭제" />
                </div>
              )}
              <input
                style={{ display: "none" }}
                type="file"
                onChange={(event) => onChangeFile(event, index)}
                ref={(el) => (fileRefs.current[index] = el)}
                accept="image/jpeg,image/png"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="button-container">
        <button className="button secondary" onClick={onClickCancel}>
          취소
        </button>
        <button
          className={`${(props.isEdit && !isAllFormValid) || (!props.isEdit && !isAllFormValid) ? styles.buttonDisabled : styles.buttonEnabled} button`}
          onClick={finalSubmit}
          disabled={!props.isEdit && !isAllFormValid}
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
