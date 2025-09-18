import React, { useState } from "react";
import "./App.css";
import addIcon from "./assets/icons/add.svg";

const App = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");

  const onChangeName = (event) => {
    setName(event.target.value);
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

    // 3) 전부 통과 시
    if (valid) alert("게시글 등록이 가능한 상태입니다!");
  };

  return (
    <div className="container">
      <form className="post-form">
        <h1 className="page-title">게시물 등록</h1>
        {/* 작성자와 비밀번호 */}
        <div className="form-row">
          <div className="form-group">
            <label className="form-label required">작성자</label>
            <input
              type="text"
              className="form-input"
              placeholder="작성자 명을 입력해 주세요."
              onChange={onChangeName}
            />
            <div className="error-msg">{nameError}</div>
          </div>
          <div className="form-group">
            <label className="form-label required">비밀번호</label>
            <input
              type="password"
              className="form-input"
              placeholder="비밀번호를 입력해 주세요."
              onChange={onChangePassword}
            />
            <div className="error-msg">{passwordError}</div>
          </div>
        </div>

        <hr className="form-divider" />

        {/* 제목 */}
        <div className="form-group">
          <label className="form-label required">제목</label>
          <input
            type="text"
            className="form-input"
            placeholder="제목을 입력해 주세요."
            onChange={onChangeTitle}
          />
          <div className="error-msg">{titleError}</div>
        </div>

        <hr className="form-divider" />

        {/* 내용 */}
        <div className="form-group">
          <label className="form-label required">내용</label>
          <textarea
            className="form-textarea"
            placeholder="내용을 입력해 주세요."
            onChange={onChangeContent}
          ></textarea>
          <div className="error-msg">{contentError}</div>
        </div>

        {/* 주소 */}
        <div className="form-group">
          <label className="form-label">주소</label>
          <div className="address-row">
            <input
              type="text"
              className="form-input postcode-input"
              placeholder="01234"
            />
            <button type="button" className="postcode-btn">
              우편번호 검색
            </button>
          </div>
          <input
            type="text"
            className="form-input"
            placeholder="주소를 입력해 주세요."
          />
          <input type="text" className="form-input" placeholder="상세주소" />
        </div>

        <hr className="form-divider" />

        {/* 유튜브 링크 */}
        <div className="form-group">
          <label className="form-label">유튜브 링크</label>
          <input
            type="text"
            className="form-input"
            placeholder="링크를 입력해 주세요."
          />
        </div>

        <hr className="form-divider" />

        {/* 사진 첨부 */}
        <div className="form-group">
          <label className="form-label">사진 첨부</label>
          <div className="photo-upload-container">
            <div className="photo-upload-box">
              <img src={addIcon} alt="추가" className="upload-icon" />
              <div className="upload-text">클릭해서 사진 업로드</div>
            </div>
            <div className="photo-upload-box">
              <img src={addIcon} alt="추가" className="upload-icon" />
              <div className="upload-text">클릭해서 사진 업로드</div>
            </div>
            <div className="photo-upload-box">
              <img src={addIcon} alt="추가" className="upload-icon" />
              <div className="upload-text">클릭해서 사진 업로드</div>
            </div>
          </div>
        </div>

        {/* 버튼 */}
        <div className="form-actions">
          <button type="button" className="cancel-btn">
            취소
          </button>
          <button type="submit" className="submit-btn" onClick={onClickSignup}>
            등록하기
          </button>
        </div>
      </form>
    </div>
  );
};

export default App;
