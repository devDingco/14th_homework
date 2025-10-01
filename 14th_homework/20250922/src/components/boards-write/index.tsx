"use client";

import React, { useRef } from "react";
import DaumPostcode from "react-daum-postcode";
import type { BoardsWriteProps } from "./types";
import { useBoardsWrite } from "./hook";
import styles from "./styles.module.css";
import { Modal, Box, Typography, Button as MuiButton, TextField } from "@mui/material";
import { Button, Input } from "@triptalk/ui-components";
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
    images,
    setImages,
    errors,
    register,
    handleSubmit,
    onSubmit,
    onChangeYoutubeUrl,
    onChangeBoardAddressZipcode,
    onChangeBoardAddressAddress,
    onChangeBoardAddressAddressDetail,
    onClickPostcodeSearch,
    onCompletePostcode,
    onClosePostcodeModal,
    isPostcodeModalOpen,
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
    <form onSubmit={handleSubmit(onSubmit)} className={styles.contentContainer}>
      <h1 className={styles.postTitle}>{props.isEdit ? "게시글 수정" : "게시글 작성"}</h1>

      <div className={`${styles.formGroup} ${styles.firstGroup} ${styles.formRowGroup}`}>
        <div className={styles.flex1}>
          <label className={styles.labelRequired}>작성자</label>
          <input
            type="text"
            className={styles.inputField}
            placeholder="작성자를 입력해 주세요."
            {...register("writer")}
            disabled={props.isEdit}
          />
          {errors.writer && <div className={styles.errorMessage}>{errors.writer.message}</div>}
        </div>
        <div className={styles.flex1}>
          <label className={styles.labelRequired}>비밀번호</label>
          <input
            type="password"
            className={styles.inputField}
            placeholder="비밀번호를 입력해 주세요."
            {...register("password")}
            disabled={props.isEdit}
          />
          {errors.password && <div className={styles.errorMessage}>{errors.password.message}</div>}
        </div>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.labelRequired}>제목</label>
        <input
          type="text"
          className={styles.inputField}
          placeholder="제목을 입력해 주세요."
          {...register("title")}
        />
        {errors.title && <div className={styles.errorMessage}>{errors.title.message}</div>}
      </div>

      <div className={`${styles.formGroup} ${styles.noBorder}`}>
        <label className={styles.labelRequired}>내용</label>
        <textarea
          className={styles.textareaField}
          placeholder="내용을 입력해 주세요."
          {...register("contents")}
        ></textarea>
        {errors.contents && <div className={styles.errorMessage}>{errors.contents.message}</div>}
      </div>

      <div className={styles.formGroup}>
        <label>주소</label>
        <div className={`${styles.flexGap8} ${styles.mb8}`}>
          <input
            type="text"
            className={`${styles.inputField} ${styles.w120}`}
            placeholder="01234"
            {...register("boardAddress.zipcode")}
            onChange={onChangeBoardAddressZipcode}
          />
          <button type="button" className={`${styles.button} ${styles.secondary}`} onClick={onClickPostcodeSearch}>
            우편번호 검색
          </button>
        </div>
        <input
          type="text"
          className={`${styles.inputField} ${styles.mb8}`}
          placeholder="주소를 입력해 주세요."
          {...register("boardAddress.address")}
          onChange={onChangeBoardAddressAddress}
        />
        <input
          type="text"
          className={styles.inputField}
          placeholder="상세주소"
          {...register("boardAddress.addressDetail")}
          onChange={onChangeBoardAddressAddressDetail}
        />
      </div>

      <div className={styles.formGroup}>
        <label>유튜브 링크</label>
        <input
          type="text"
          className={styles.inputField}
          placeholder="링크를 입력해 주세요."
          {...register("youtubeUrl")}
          onChange={onChangeYoutubeUrl}
        />
      </div>

      <div className={styles.formGroup}>
        <label>사진 첨부</label>
        <div className={styles.fileUploadGrid}>
          {Array(3)
            .fill(null)
            .map((_, index) => {
              const imageUrl = images[index];
              return (
                <div
                  key={index}
                  className={styles.fileUploadBox}
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

      <div className={styles.buttonContainer}>
        <Button
          variant="secondary"
          size="large"
          onClick={onClickCancel}
          className={styles.button}
        >
          취소
        </Button>
        <Button
          type={props.isEdit ? "button" : "submit"}
          variant="primary"
          size="large"
          onClick={props.isEdit ? onClickUpdate : undefined}
          disabled={!isAllFormValid}
          className={styles.button}
        >
          {props.isEdit ? "수정하기" : "등록하기"}
        </Button>
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
              <Button onClick={handlePromptCancel} className={`${styles.button} ${styles.secondary}`}>
                취소
              </Button>
            )}
            <Button
              onClick={modalState.isPrompt ? handlePromptConfirm : handleCloseModal}
              className={`${styles.button} ${styles.primary}`}
              style={{
                marginLeft: modalState.isPrompt ? "8px" : "0",
              }}
            >
              확인
            </Button>
          </div>
        </Box>
      </Modal>
    </form>
  );
}
