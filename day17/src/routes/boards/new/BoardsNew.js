// src/routes/boards/new/BoardsNew.js
import "./BoardsNew.css";
import React, { useState, useEffect } from 'react';

export default function BoardsNew() {
  // ... (state 및 핸들러 로직은 동일) ...
  const [inputs, setInputs] = useState({ writer: '', password: '', title: '', contents: '' });
  const [errors, setErrors] = useState({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value, }));
    if (value) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = () => { /* ... */ };

  useEffect(() => {
    const isAllFilled = inputs.writer && inputs.password && inputs.title && inputs.contents;
    setIsButtonDisabled(!isAllFilled);
  }, [inputs]);


  return (
    // Block
    <div className="board-new">
      <h1 className="board-new__title">게시물 등록</h1>
      
      {/* Element: section, Modifier: --row */}
      <div className="board-new__section board-new__section--row">
        {/* Element: input-group */}
        <div className="board-new__input-group">
          <label className="board-new__label">작성자<span className="css_별">*</span></label>
          <input 
            type="text" 
            name="writer"
            className="board-new__input" 
            placeholder="작성자 명을 입력해주세요." 
            onChange={handleInputChange}
            value={inputs.writer}
          />
          {errors.writer && <div className="board-new__error-message">{errors.writer}</div>}
        </div>
        <div className="board-new__input-group">
          <label className="board-new__label">비밀번호<span className="css_별">*</span></label>
          <input 
            type="password" 
            name="password"
            className="board-new__input" 
            placeholder="비밀번호를 입력해주세요." 
            onChange={handleInputChange}
            value={inputs.password}
          />
          {errors.password && <div className="board-new__error-message">{errors.password}</div>}
        </div>
      </div>

      <hr />

      <div className="board-new__section">
        <label className="board-new__label">제목<span className="css_별">*</span></label>
        <input 
          type="text" 
          name="title"
          className="board-new__input" 
          placeholder="제목을 입력해 주세요." 
          onChange={handleInputChange}
          value={inputs.title}
        />
        {errors.title && <div className="board-new__error-message">{errors.title}</div>}
      </div>

      <hr />

      <div className="board-new__section">
        <label className="board-new__label">내용<span className="css_별">*</span></label>
        <textarea 
          name="contents"
          className="board-new__input" // <input>과 동일한 스타일 적용 가능
          placeholder="내용을 입력해 주세요."
          onChange={handleInputChange}
          value={inputs.contents}
        ></textarea>
        {errors.contents && <div className="board-new__error-message">{errors.contents}</div>}
      </div>

      {/* ... (이하 주소, 유튜브, 사진 첨부 영역도 동일한 규칙으로 적용) ... */}
      
      <div className="board-new__footer">
        {/* Element: button, Modifier: --cancel */}
        <button type="button" className="board-new__button board-new__button--cancel">
          취소
        </button>
        <button 
          type="button" 
          // 기본 버튼 스타일에, 종류와 상태에 따른 Modifier를 동적으로 추가
          className={`
            board-new__button 
            board-new__button--submit 
            ${isButtonDisabled ? 'board-new__button--disabled' : ''}
          `}
          onClick={handleSubmit}
          disabled={isButtonDisabled}
        >
          등록하기
        </button>
      </div>
    </div>
  );
}