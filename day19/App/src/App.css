// src/App.js

import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputs, setInputs] = useState({
    writer: '',
    password: '',
    title: '',
    contents: '',
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (value) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = () => {
    const newErrors = {};
    if (!inputs.writer) newErrors.writer = "필수입력 사항입니다.";
    if (!inputs.password) newErrors.password = "필수입력 사항입니다.";
    if (!inputs.title) newErrors.title = "필수입력 사항입니다.";
    if (!inputs.contents) newErrors.contents = "필수입력 사항입니다.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      alert("게시글 등록이 가능한 상태입니다!");
    }
  };

  return (
    <div className="container">
      <h1 className="title">게시물 등록</h1>
      
      <main>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">작성자<span className="required">*</span></label>
            <input 
              name="writer" 
              type="text" 
              className="form-control" 
              placeholder="이름을 입력해주세요." 
              onChange={handleInputChange}
              value={inputs.writer}
            />
            {errors.writer && <div className="error-message">{errors.writer}</div>}
          </div>
          <div className="form-group">
            <label className="form-label">비밀번호<span className="required">*</span></label>
            <input 
              name="password" 
              type="password" 
              className="form-control" 
              placeholder="비밀번호를 입력해주세요."
              onChange={handleInputChange}
              value={inputs.password}
            />
            {errors.password && <div className="error-message">{errors.password}</div>}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">제목<span className="required">*</span></label>
          <input 
            name="title" 
            type="text" 
            className="form-control" 
            placeholder="제목을 입력해주세요."
            onChange={handleInputChange}
            value={inputs.title}
          />
          {errors.title && <div className="error-message">{errors.title}</div>}
        </div>
        
        <div className="form-group">
          <label className="form-label">내용<span className="required">*</span></label>
          <textarea 
            name="contents" 
            className="form-control" 
            placeholder="내용을 입력해주세요."
            onChange={handleInputChange}
            value={inputs.contents}
          ></textarea>
          {errors.contents && <div className="error-message">{errors.contents}</div>}
        </div>
        
        <div className="form-group">
          <label className="form-label">주소</label>
          <div className="zipcode-wrapper">
            <input type="text" className="form-control zipcode-input" placeholder="07250" readOnly />
            <button type="button" className="btn">우편번호 검색</button>
          </div>
          <input type="text" className="form-control" placeholder="주소" readOnly />
          <input type="text" className="form-control" placeholder="상세주소를 입력해주세요." />
        </div>

        <div className="form-group">
          <label className="form-label">유튜브</label>
          <input type="text" className="form-control" placeholder="링크를 복사해주세요." />
        </div>

        <div className="form-group">
          <label className="form-label">사진 첨부</label>
          <div className="photo-uploader">
            <div className="upload-box">+<br />Upload</div>
            <div className="upload-box">+<br />Upload</div>
            <div className="upload-box">+<br />Upload</div>
          </div>
        </div>
      </main>

      <footer className="form-footer">
        <button type="button" className="btn btn-secondary">취소하기</button>
        <button type="button" className="btn btn-primary" onClick={handleSubmit}>
          등록하기
        </button>
      </footer>
    </div>
  );
}

export default App;