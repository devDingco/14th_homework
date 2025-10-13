"use client";

import styles from "./styles.module.css";
import addIcon from "@/assets/icons/add.svg";
import { useBoardsWrite } from "./hook"
import { BoardsWriteProps } from "./types";

export default function BoardsComponentWrite(props: BoardsWriteProps) {

  const {
    nameError,
    passwordError,
    titleError,
    contentError,
    isSubmitDisabled,
    onChangeName,
    onChangePassword,
    onChangeTitle,
    onChangeContent,
    onClickSignup,
  } = useBoardsWrite(props);

  return (
    <div className={styles.container}>
      <form className={styles.postForm}>
        <h1 className={styles.pageTitle}>
          게시물 {props.isEdit ? "수정" : "등록"}
        </h1>
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
              disabled={props.isEdit}
              defaultValue={
                props.isEdit ? props.data?.fetchBoard?.writer ?? "" : ""
              }
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
              disabled={props.isEdit}
              defaultValue={props.isEdit ? "*********" : ""}
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
            defaultValue={
              props.isEdit ? props.data?.fetchBoard?.title ?? "" : ""
            }
          />
          <div className={styles.errorMsg}>{titleError}</div>
        </div>

        <hr className={styles.formDivider} />

        {/* 내용 */}
        <div className={styles.formGroup}>
          <label className={`${styles.formLabel} ${styles.required}`}>내용</label>
          <textarea
            className={styles.formTextarea}
            placeholder="내용을 입력해 주세요."
            onChange={onChangeContent}
            defaultValue={
              props.isEdit ? props.data?.fetchBoard?.contents ?? "" : ""
            }
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
            {props.isEdit ? "수정" : "등록"}하기
          </button>
        </div>
      </form>
    </div>
  );
}
