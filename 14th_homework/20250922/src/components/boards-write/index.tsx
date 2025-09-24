"use client";

import React, { useRef, useState } from "react";
import DaumPostcode from "react-daum-postcode";
import type { BoardsWriteProps } from "./types";
import { useBoardsWrite } from "./hook";
import styles from "./styles.module.css";
import formStyles from "@/styles/form.module.css";
import fileUploadStyles from "@/styles/fileUpload.module.css";
import utilitiesStyles from "@/styles/utilities.module.css";
import { Modal, Box, Typography, Button, TextField } from "@mui/material";
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

export default function BoardsWrite(props: BoardsWriteProps) {
  const {
    loading,
    error,
    formData,
    password,
    youtubeUrl,
    boardAddress,
    images,
    setImages,
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
    uploadFile,
  } = useBoardsWrite(props);

  // 이미지 업로드 관련 ref
  const fileRefs = useRef([null, null, null]);
  
  const onChangeFile = async (event, index) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const isValid = checkValidationFile(file);
    if (!isValid) return;

    try {
      const result = await uploadFile({ variables: { file } });
      const newImages = [...images];
      newImages[index] = result.data?.uploadFile.url || "";
      setImages(newImages);
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
    const newImages = [...images];
    newImages[index] = "";
    setImages(newImages);
  };


  if (loading) {
    return <div className="text-center mt-20">게시글 정보를 불러오는 중입니다...</div>;
  }

  if (error) {
    return <div className="text-center mt-20 text-red-500">게시글을 불러오는 중 에러가 발생했습니다.</div>;
  }
  
  const isAllFormValid = isFormValid;

  return (
    <div className={formStyles.contentContainer}>
      <h1 className={formStyles.postTitle}>{props.isEdit ? "게시글 수정" : "게시글 작성"}</h1>

      <div className={`${formStyles.formGroup} ${formStyles.firstGroup} ${formStyles.formRowGroup}`}>
        <div className={utilitiesStyles.flex1}>
          <label className={formStyles.labelRequired}>작성자</label>
          <input
            type="text"
            name="writer"
            className={formStyles.inputField}
            placeholder="작성자를 입력해 주세요."
            value={formData.writer}
            onChange={handleInputChange}
            disabled={props.isEdit}
          />
          {errors.writer && <div className={formStyles.errorMessage}>{errors.writer}</div>}
        </div>
        <div className={utilitiesStyles.flex1}>
          <label className={formStyles.labelRequired}>비밀번호</label>
          <input
            type="password"
            className={formStyles.inputField}
            placeholder="비밀번호를 입력해 주세요."
            value={password}
            onChange={onChangePassword}
            disabled={props.isEdit}
          />
          {errors.password && <div className={formStyles.errorMessage}>{errors.password}</div>}
        </div>
      </div>

      <div className={formStyles.formGroup}>
        <label className={formStyles.labelRequired}>제목</label>
        <input
          type="text"
          name="title"
          className={formStyles.inputField}
          placeholder="제목을 입력해 주세요."
          value={formData.title}
          onChange={handleInputChange}
        />
        {errors.title && <div className={formStyles.errorMessage}>{errors.title}</div>}
      </div>

      <div className={`${formStyles.formGroup} ${utilitiesStyles.noBorder}`}>
        <label className={formStyles.labelRequired}>내용</label>
        <textarea
          name="contents"
          className={formStyles.textareaField}
          placeholder="내용을 입력해 주세요."
          value={formData.contents}
          onChange={handleInputChange}
        ></textarea>
        {errors.contents && <div className={formStyles.errorMessage}>{errors.contents}</div>}
      </div>

      <div className={formStyles.formGroup}>
        <label>주소</label>
        <div className={`${utilitiesStyles.flexGap8} ${utilitiesStyles.mb8}`}>
          <input
            type="text"
            className={`${formStyles.inputField} ${utilitiesStyles.w120}`}
            placeholder="01234"
            value={boardAddress.zipcode}
            onChange={onChangeBoardAddressZipcode}
          />
          <button type="button" className={`${formStyles.button} ${formStyles.secondary}`} onClick={onClickPostcodeSearch}>
            우편번호 검색
          </button>
        </div>
        <input
          type="text"
          className={`${formStyles.inputField} ${utilitiesStyles.mb8}`}
          placeholder="주소를 입력해 주세요."
          value={boardAddress.address}
          onChange={onChangeBoardAddressAddress}
        />
        <input
          type="text"
          className={formStyles.inputField}
          placeholder="상세주소"
          value={boardAddress.addressDetail}
          onChange={onChangeBoardAddressAddressDetail}
        />
      </div>

      <div className={formStyles.formGroup}>
        <label>유튜브 링크</label>
        <input
          type="text"
          className={formStyles.inputField}
          placeholder="링크를 입력해 주세요."
          value={youtubeUrl}
          onChange={onChangeYoutubeUrl}
        />
      </div>

      <div className={formStyles.formGroup}>
        <label>사진 첨부</label>
        <div className={fileUploadStyles.fileUploadGrid}>
          {Array(3)
            .fill(null)
            .map((_, index) => {
              const imageUrl = images[index];
              return (
                <div
                  key={index}
                  className={fileUploadStyles.fileUploadBox}
                  onClick={onClickImage(index)}
                  style={{
                    backgroundImage: imageUrl ? `url(${imageUrl.startsWith('http') ? imageUrl : `https://storage.googleapis.com/${imageUrl}`})` : "none",
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
              );
            })}
        </div>
      </div>

      <div className={formStyles.buttonContainer}>
        <button className={`${formStyles.button} ${formStyles.secondary}`} onClick={onClickCancel}>
          취소
        </button>
        <button
          className={`${!isAllFormValid ? styles.buttonDisabled : styles.buttonEnabled} ${formStyles.button}`}
          onClick={props.isEdit ? onClickUpdate : onClickSubmit}
          disabled={!isAllFormValid}
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
          <div className={formStyles.buttonContainer} style={{ marginTop: "auto" }}>
            {modalState.isPrompt && (
              <Button onClick={handlePromptCancel} className={`${formStyles.button} ${formStyles.secondary}`}>
                취소
              </Button>
            )}
            <Button
              onClick={modalState.isPrompt ? handlePromptConfirm : handleCloseModal}
              className={`${formStyles.button} ${formStyles.primary}`}
              style={{
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
