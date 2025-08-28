import "./App.css";
import { useState } from "react";

import AddIcon from "./assets/icon/outline/add.svg";

function PostForm() {
  const [author, setAuthor] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [authorError, setAuthorError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");

  const onChangeAuthor = (event) => {
    setAuthor(event.target.value);
  };
  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  };
  const onChangeContent = (event) => {
    setContent(event.target.value);
  };

  const onClickSignup = (event) => {
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
    <div className="page">
      <div className="container">
        <header className="post-header">게시물 등록</header>
        <div className="author-password-group">
          <div className="input-area">
            <div className="input-area__label__group">
              <label htmlFor="author-input-1" className="input-area__label">
                작성자
              </label>
              <span>*</span>
            </div>
            <input
              id="author-input-1"
              className="input-area__input"
              type="text"
              placeholder="작성자 명을 입력해 주세요."
              onChange={onChangeAuthor}
            />
            <div className="input-error">{authorError}</div>
          </div>
          <div className="input-area">
            <div className="input-area__label__group">
              <label htmlFor="author-input-2" className="input-area__label">
                비밀번호
              </label>
              <span>*</span>
            </div>
            <input
              id="author-input-2"
              className="input-area__input"
              type="password"
              placeholder="비밀번호를 입력해 주세요."
              onChange={onChangePassword}
            />
            <div className="input-error">{passwordError}</div>
          </div>
        </div>
        <hr className="line" />
        <div className="input-area">
          <div className="input-area__label__group">
            <label htmlFor="author-input-3" className="input-area__label">
              제목
            </label>
            <span>*</span>
          </div>
          <input
            id="author-input-3"
            className="input-area__input"
            type="text"
            placeholder="제목을 입력해 주세요."
            onChange={onChangeTitle}
          />
          <div className="input-error">{titleError}</div>
        </div>
        <hr className="line" />
        <div className="input-area">
          <div className="input-area__label__group">
            <label htmlFor="author-input-4" className="input-area__label">
              내용
            </label>
            <span>*</span>
          </div>
          <textarea
            className="input-area__textarea"
            placeholder="내용을 입력해 주세요."
            onChange={onChangeContent}
          />
          <div className="input-error">{contentError}</div>
        </div>
        <div className="address-area">
          <div className="address-area__search">
            <label className="input-area__label">주소</label>
            <div className="address-area__input-button-group">
              <input
                className="input-area__input__address"
                type="text"
                placeholder="01234"
              />
              <button className="input-area__button">우편번호 검색</button>
            </div>
          </div>
          <input
            className="input-area__input"
            type="text"
            placeholder="주소를 입력해 주세요"
          />
          <input
            className="input-area__input"
            type="text"
            placeholder="상세주소"
          />
        </div>
        <hr className="line" />
        <div className="input-area">
          <div className="input-area__label__group">
            <label htmlFor="author-input-5" className="input-area__label">
              유튜브 링크
            </label>
          </div>
          <input
            id="author-input-5"
            className="input-area__input"
            type="text"
            placeholder="링크를 입력해 주세요."
          />
          <div className="input-error"></div>
        </div>
        <hr className="line" />

        {/* ImageUpload: 사진 첨부 */}
        <div className="image-upload-area">
          <label className="input-area__label">사진 첨부</label>
          <div className="image-upload-input">
            <label htmlFor="file-upload-1">
              <div className="image-upload-input__drop">
                <img src={AddIcon} alt="Add Icon" />
                <p>클릭해서 사진 업로드</p>
                <input type="file" id="file-upload-1" />
              </div>
            </label>
            <label htmlFor="file-upload-2">
              <div className="image-upload-input__drop">
                <img src={AddIcon} alt="Add Icon" />
                <p>클릭해서 사진 업로드</p>
                <input type="file" id="file-upload-2" />
              </div>
            </label>
            <label htmlFor="file-upload-3">
              <div className="image-upload-input__drop">
                <img src={AddIcon} alt="Add Icon" />
                <p>클릭해서 사진 업로드</p>
                <input type="file" id="file-upload-3" />
              </div>
            </label>
          </div>
        </div>
        <div className="button-group">
          <button className="input-area__button-cancel">취소</button>
          <button
            className="input-area__button-register"
            onClick={onClickSignup}>
            등록하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostForm;
