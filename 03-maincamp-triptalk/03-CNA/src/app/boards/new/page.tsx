"use client";

import React, { useState, ChangeEvent, MouseEvent } from "react";
import styles from "./styles.module.css";
import addIcon from "@/assets/icons/add.svg";
import { useMutation, gql } from "@apollo/client";

const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
    }
  }
`;

const BoardsNew = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");

  const [createBoard, { loading }] = useMutation(CREATE_BOARD);
  const isSubmitDisabled = !name || !password || !title || !content || loading;

  const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onChangeContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const onClickSignup = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    // 1) 에러 초기화
    setNameError("");
    setPasswordError("");
    setTitleError("");
    setContentError("");

    // 2) 필드별 검사
    let valid = true;
    if (!name.trim()) {
      setNameError("필수입력 사항입니다.");
      valid = false;
    }
    if (!password.trim()) {
      setPasswordError("필수입력 사항입니다.");
      valid = false;
    }
    if (!title.trim()) {
      setTitleError("필수입력 사항입니다.");
      valid = false;
    }
    if (!content.trim()) {
      setContentError("필수입력 사항입니다.");
      valid = false;
    }

    if (!valid) return;

    try {
      const { data } = await createBoard({
        variables: {
          createBoardInput: {
            writer: name,
            password,
            title,
            contents: content,
          },
        },
      });

      const created = data?.createBoard;
      const boardId = created?.number ?? created?._id;
      alert(`등록 완료! 게시글 번호/ID: ${boardId ?? "확인 필요"}`);

      // 입력값 초기화
      setName("");
      setPassword("");
      setTitle("");
      setContent("");
    } catch (e: any) {
      alert(e?.message ?? "등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.postForm}>
        <h1 className={styles.pageTitle}>게시물 등록</h1>
        {/* 작성자와 비밀번호 */}
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label className={`${styles.formLabel} ${styles.required}`}>
              작성자
            </label>
            <input
              type="text"
              className={styles.formInput}
              placeholder="작성자 명을 입력해 주세요."
              onChange={onChangeName}
            />
            <div className={styles.errorMsg}>{nameError}</div>
          </div>
          <div className={styles.formGroup}>
            <label className={`${styles.formLabel} ${styles.required}`}>
              비밀번호
            </label>
            <input
              type="password"
              className={styles.formInput}
              placeholder="비밀번호를 입력해 주세요."
              onChange={onChangePassword}
            />
            <div className={styles.errorMsg}>{passwordError}</div>
          </div>
        </div>

        <hr className={styles.formDivider} />

        {/* 제목 */}
        <div className={styles.formGroup}>
          <label className={`${styles.formLabel} ${styles.required}`}>
            제목
          </label>
          <input
            type="text"
            className={styles.formInput}
            placeholder="제목을 입력해 주세요."
            onChange={onChangeTitle}
          />
          <div className={styles.errorMsg}>{titleError}</div>
        </div>

        <hr className={styles.formDivider} />

        {/* 내용 */}
        <div className={styles.formGroup}>
          <label className={`${styles.formLabel} required`}>내용</label>
          <textarea
            className={styles.formTextarea}
            placeholder="내용을 입력해 주세요."
            onChange={onChangeContent}
          ></textarea>
          <div className={styles.errorMsg}>{contentError}</div>
        </div>

        {/* 주소 */}
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>주소</label>
          <div className={styles.addressRow}>
            <input
              type="text"
              className={`${styles.formInput} ${styles.postcodeInput}`}
              placeholder="01234"
            />
            <button type="button" className={styles.postcodeBtn}>
              우편번호 검색
            </button>
          </div>
          <input
            type="text"
            className={styles.formInput}
            placeholder="주소를 입력해 주세요."
          />
          <input
            type="text"
            className={styles.formInput}
            placeholder="상세주소"
          />
        </div>

        <hr className={styles.formDivider} />

        {/* 유튜브 링크 */}
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>유튜브 링크</label>
          <input
            type="text"
            className={styles.formInput}
            placeholder="링크를 입력해 주세요."
          />
        </div>

        <hr className={styles.formDivider} />

        {/* 사진 첨부 */}
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>사진 첨부</label>
          <div className={styles.photoUploadContainer}>
            <div className={styles.photoUploadBox}>
              <img src={addIcon.src} alt="추가" className={styles.uploadIcon} />
              <div className={styles.uploadText}>클릭해서 사진 업로드</div>
            </div>
            <div className={styles.photoUploadBox}>
              <img src={addIcon.src} alt="추가" className={styles.uploadIcon} />
              <div className={styles.uploadText}>클릭해서 사진 업로드</div>
            </div>
            <div className={styles.photoUploadBox}>
              <img src={addIcon.src} alt="추가" className={styles.uploadIcon} />
              <div className={styles.uploadText}>클릭해서 사진 업로드</div>
            </div>
          </div>
        </div>

        {/* 버튼 */}
        <div className={styles.formActions}>
          <button type="button" className={styles.cancelBtn}>
            취소
          </button>
          <button
            type="submit"
            className={isSubmitDisabled ? styles.disabled : styles.submitBtn}
            onClick={onClickSignup}
            disabled={isSubmitDisabled}
          >
            등록하기
          </button>
        </div>
      </form>
    </div>
  );
};

export default BoardsNew;
