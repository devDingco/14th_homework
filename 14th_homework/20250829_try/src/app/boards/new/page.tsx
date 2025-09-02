'use client';

import React, { useState } from 'react';

const BoardsNew = () => {
  const [author, setAuthor] = useState('');
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [errors, setErrors] = useState({
    author: '',
    password: '',
    title: '',
    content: '',
  });

  // alert()를 대신할 메시지 상태
  const [successMessage, setSuccessMessage] = useState('');

  const isFormValid = author && password && title && content;

  const handleSubmit = () => {
    let hasError = false;
    const newErrors = { author: '', password: '', title: '', content: '' };

    if (!author) {
      newErrors.author = '필수입력 사항입니다.';
      hasError = true;
    }
    if (!password) {
      newErrors.password = '필수입력 사항입니다.';
      hasError = true;
    }
    if (!title) {
      newErrors.title = '필수입력 사항입니다.';
      hasError = true;
    }
    if (!content) {
      newErrors.content = '필수입력 사항입니다.';
      hasError = true;
    }

    setErrors(newErrors);

    if (!hasError) {
      // alert() 대신 메시지 상태 업데이트
      setSuccessMessage('게시글 등록이 가능한 상태입니다!');
    }
  };

  return (
    <div className="content-container">
      <h1 className="post-title">게시글 등록</h1>

      {/* ✅ 성공 메시지 표시 */}
      {successMessage && (
        <div style={{ padding: '12px', backgroundColor: '#f0fff4', color: '#38a169', border: '1px solid #9ae6b4', borderRadius: '4px', marginBottom: '24px' }}>
          {successMessage}
        </div>
      )}

      {/* 작성자/비밀번호 */}
      <div className="form-group first-group form-row-group">
        <div className="flex-1">
          <label className="label-required">작성자</label>
          <input
            type="text"
            className="input-field"
            placeholder="작성자를 입력해 주세요."
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          {errors.author && <div className="error-message">{errors.author}</div>}
        </div>
        <div className="flex-1">
          <label className="label-required">비밀번호</label>
          <input
            type="password"
            className="input-field"
            placeholder="비밀번호를 입력해 주세요."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <div className="error-message">{errors.password}</div>}
        </div>
      </div>

      {/* 제목 */}
      <div className="form-group">
        <label className="label-required">제목</label>
        <input
          type="text"
          className="input-field"
          placeholder="제목을 입력해 주세요."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && <div className="error-message">{errors.title}</div>}
      </div>

      {/* 내용 */}
      <div className="form-group no-border">
        <label className="label-required">내용</label>
        <textarea
          className="textarea-field"
          placeholder="내용을 입력해 주세요."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        {errors.content && <div className="error-message">{errors.content}</div>}
      </div>

      {/* 주소 */}
      <div className="form-group">
        <label>주소</label>
        <div className="flex-gap-8 mb-8">
          <input type="text" className="input-field w-120" placeholder="01234" />
          <button className="button secondary">우편번호 검색</button>
        </div>
        <input type="text" className="input-field mb-8" placeholder="주소를 입력해 주세요." />
        <input type="text" className="input-field" placeholder="상세주소" />
      </div>

      {/* 유튜브 링크 */}
      <div className="form-group">
        <label>유튜브 링크</label>
        <input type="text" className="input-field" placeholder="링크를 입력해 주세요." />
      </div>

      {/* 사진 첨부 */}
      <div className="form-group">
        <label>사진 첨부</label>
        <div className="file-upload-grid">
          <div className="file-upload-box">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
            <span>클릭해서 사진 업로드</span>
          </div>
        </div>
      </div>

      <div className="button-container">
        <button className="button secondary">취소</button>
        <button
          className="button primary"
          onClick={handleSubmit}
          disabled={!isFormValid}
          style={{
            backgroundColor: isFormValid ? '#F26D21' : '#4B5563',
            color: isFormValid ? '#fff' : '#BDBDBD',
            cursor: isFormValid ? 'pointer' : 'not-allowed'
          }}
        >
          등록하기
        </button>
      </div>
    </div>
  );
};

export default BoardsNew;
