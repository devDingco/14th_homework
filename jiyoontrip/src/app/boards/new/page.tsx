"use client";
import { ChangeEvent, useState } from "react";
import Image from "next/image";
import styles from "./styles.module.css";

export default function NewPage() {
  const [author, setAuthor] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [authorError, setAuthorError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");
  const [isActive, setIsActive] = useState(false);

  const onChangeAuthor = (event: ChangeEvent<HTMLInputElement>) => {
    setAuthor(event.target.value);
    if (event.target.value !== "" && password !== "" && title !== "" && content !== "") {
      setIsActive(true);
    }
  };
  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    if (author !== "" && event.target.value !== "" && title !== "" && content !== "") {
      setIsActive(true);
    }
  };
  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    if (author !== "" && password !== "" && event.target.value !== "" && content !== "") {
      setIsActive(true);
    }
  };
  const onChangeContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
    if (author !== "" && password !== "" && title !== "" && event.target.value !== "") {
      setIsActive(true);
    }
  };

  const onClickSignup = () => {
    if (author === "") {
      setAuthorError("필수입력 사항 입니다.");
    } else {
      setAuthorError("");
    }
    if (password === "") {
      setPasswordError("필수입력 사항 입니다.");
    } else {
      setPasswordError("");
    }
    if (title === "") {
      setTitleError("필수입력 사항 입니다.");
    } else {
      setTitleError("");
    }
    if (content === "") {
      setContentError("필수입력 사항 입니다.");
    } else {
      setContentError("");
    }

    if (author !== "" && password !== "" && title !== "" && content !== "")
      alert("게시글 등록이 가능한 상태입니다!");
  };
  return (
    <>
      <div className={styles.page}>
        <div className={styles.container}>
          <header className={styles.postHeader}>게시물 등록</header>
          <div className={styles.enrollAuthorPassword}>
            <div className={styles.inputArea}>
              <div className={styles.inputArea__enrollLabel}>
                <label
                  htmlFor="author-input-1"
                  className={styles.inputArea__enrollLabel__label}
                >
                  작성자
                </label>
                <span className={styles.inputArea__enrollLabel__star}>*</span>
              </div>
              <input
                id="author-input-1"
                className={styles.inputArea__input}
                type="text"
                placeholder="작성자 명을 입력해 주세요."
                onChange={onChangeAuthor}
              />
              <div className={styles.inputError}>{authorError}</div>
            </div>
            <div className={styles.inputArea}>
              <div className={styles.inputArea__enrollLabel}>
                <label
                  htmlFor="author-input-2"
                  className={styles.inputArea__enrollLabel__label}
                >
                  비밀번호
                </label>
                <span className={styles.inputArea__enrollLabel__star}>*</span>
              </div>
              <input
                id="author-input-2"
                className={styles.inputArea__input}
                type="password"
                placeholder="비밀번호를 입력해 주세요."
                onChange={onChangePassword}
              />
              <div className={styles.inputError}>{passwordError}</div>
            </div>
          </div>
          <hr className={styles.line} />
          <div className={styles.inputArea}>
            <div className={styles.inputArea__enrollLabel}>
              <label
                htmlFor="author-input-3"
                className={styles.inputArea__enrollLabel__label}
              >
                제목
              </label>
              <span className={styles.inputArea__enrollLabel__star}>*</span>
            </div>
            <input
              id="author-input-3"
              className={styles.inputArea__input}
              type="text"
              placeholder="제목을 입력해 주세요."
              onChange={onChangeTitle}
            />
            <div className={styles.inputError}>{titleError}</div>
          </div>
          <hr className={styles.line} />
          <div className={styles.inputArea}>
            <div className={styles.inputArea__enrollLabel}>
              <label
                htmlFor="author-input-4"
                className={styles.inputArea__enrollLabel__label}
              >
                내용
              </label>
              <span className={styles.inputArea__enrollLabel__star}>*</span>
            </div>
            <textarea
              id="author-input-4"
              className={styles.inputArea__textarea}
              placeholder="내용을 입력해 주세요."
              onChange={onChangeContent}
            />
            <div className={styles.inputError}>{contentError}</div>
          </div>
          <div className={styles.addressArea}>
            <div className={styles.addressArea__search}>
              <label
                htmlFor="author-input-5"
                className={styles.inputArea__enrollLabel__label}
              >
                주소
              </label>
              <div className={styles.addressArea__enrollInputButton}>
                <input
                  id="author-input-5"
                  className={styles.inputArea__addressInput}
                  type="text"
                  placeholder="01234"
                />
                <button className={styles.inputArea__button}>우편번호 검색</button>
              </div>
            </div>
            <input
              className={styles.inputArea__input}
              type="text"
              placeholder="주소를 입력해 주세요"
            />
            <input
              className={styles.inputArea__input}
              type="text"
              placeholder="상세주소"
            />
          </div>
          <hr className={styles.line} />
          <div className={styles.inputArea}>
            <div className={styles.inputArea__enrollLabel}>
              <label
                htmlFor="author-input-6"
                className={styles.inputArea__enrollLabel__label}
              >
                유튜브 링크
              </label>
            </div>
            <input
              id="author-input-6"
              className={styles.inputArea__input}
              type="text"
              placeholder="링크를 입력해 주세요."
            />
            <div className={styles.inputError}></div>
          </div>
          <hr className={styles.line} />

          {/* ImageUpload: 사진 첨부 */}
          <div className={styles.imageUploadArea}>
            <label className={styles.inputArea__enrollLabel__label}>사진 첨부</label>
            <div className={styles.imageUploadInput}>
              <label htmlFor="file-upload-1">
                <div className={styles.imageUploadInput__drop}>
                  <Image
                    src="/icons/outline/add.svg"
                    alt="AddIcon"
                    width={24}
                    height={24}
                  />
                  <p>클릭해서 사진 업로드</p>
                  <input
                    type="file"
                    id="file-upload-1"
                    className={styles.imageUploadInput__drop}
                  />
                </div>
              </label>
              <label htmlFor="file-upload-2">
                <div className={styles.imageUploadInput__drop}>
                  <Image
                    src="/icons/outline/add.svg"
                    alt="AddIcon"
                    width={24}
                    height={24}
                  />
                  <p>클릭해서 사진 업로드</p>
                  <input type="file" id="file-upload-2" />
                </div>
              </label>
              <label htmlFor="file-upload-3">
                <div className={styles.imageUploadInput__drop}>
                  <Image
                    src="/icons/outline/add.svg"
                    alt="AddIcon"
                    width={24}
                    height={24}
                    sizes="100vw"
                  />
                  <p>클릭해서 사진 업로드</p>
                  <input type="file" id="file-upload-3" />
                </div>
              </label>
            </div>
          </div>
          <div className={styles.enrollButton}>
            <button className={styles.inputArea__cancelButton}>취소</button>
            <button
              className={styles.inputArea__registerButton}
              onClick={onClickSignup}
              style={{
                backgroundColor: isActive === true ? "#2974E5" : "#C7C7C7",
              }}
            >
              등록하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
