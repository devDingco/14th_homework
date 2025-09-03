// src/routes/boards/new/BoardsNew.js

import React, { useState, useEffect } from 'react';
// 이 컴포넌트만을 위한 CSS 파일을 만들어 연결하는 것이 좋습니다.

export default function BoardsNew() {
  // 1. state 관리 로직: inputs와 errors 객체로 상태를 통합 관리합니다.
  const [inputs, setInputs] = useState({
    writer: '',
    password: '',
    title: '',
    contents: '',
  });

  const [errors, setErrors] = useState({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  // 2. 입력값 변경 핸들러: 하나의 함수로 모든 input의 변경을 처리합니다.
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));

    // 입력 시 에러 메시지 제거
    if (value) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // 3. 리팩토링된 제출 핸들러: 배열과 반복문으로 유효성 검사를 간결하게 처리합니다.
  const handleSubmit = () => {
    const newErrors = {};
    const requiredFields = ['writer', 'password', 'title', 'contents'];

    requiredFields.forEach(field => {
      if (!inputs[field]) {
        newErrors[field] = "필수 입력 사항입니다.";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      alert("게시글 등록이 가능한 상태입니다!");
    }
  };

  // 4. useEffect를 사용한 버튼 활성화: inputs가 변경될 때마다 버튼 상태를 자동으로 업데이트합니다.
  useEffect(() => {
    const isAllFilled = inputs.writer && inputs.password && inputs.title && inputs.contents;
    setIsButtonDisabled(!isAllFilled); // 모든 값이 채워졌으면 false(활성화), 아니면 true(비활성화)
  }, [inputs]);


  // 5. JSX 렌더링: state와 핸들러 함수들을 각 input에 연결합니다.
  return (
    <div className="css_부모바디">
      <h1 className="css_헤드">게시물 등록</h1>
      
      {/* 작성자 & 비밀번호 */}
      <div className="css_작성ip">
        <div className="css_작성ip_wrapperleft">
          <label>작성자<span className="css_별">*</span></label>
          <input 
            type="text" 
            name="writer"
            className="css_작성자입력박스" 
            placeholder="작성자 명을 입력해주세요." 
            onChange={handleInputChange}
            value={inputs.writer}
          />
          {errors.writer && <div className="error-message">{errors.writer}</div>}
        </div>
        <div className="css_작성ip_wrapperright">
          <label>비밀번호<span className="css_별">*</span></label>
          <input 
            type="password" 
            name="password"
            className="css_비밀번호입력박스" 
            placeholder="비밀번호를 입력해주세요." 
            onChange={handleInputChange}
            value={inputs.password}
          />
          {errors.password && <div className="error-message">{errors.password}</div>}
        </div>
      </div>

      <hr />

      {/* 제목 */}
      <div className="css_제목">
        <label>제목<span className="css_별">*</span></label>
        <input 
          type="text" 
          name="title"
          className="css_제목입력창" 
          placeholder="제목을 입력해 주세요." 
          onChange={handleInputChange}
          value={inputs.title}
        />
        {errors.title && <div className="error-message">{errors.title}</div>}
      </div>

      <hr />

      {/* 내용 */}
      <div className="css_내용영역">
        <label>내용<span className="css_별">*</span></label>
        <textarea 
          name="contents"
          className="css_내용입력창" 
          placeholder="내용을 입력해 주세요."
          onChange={handleInputChange}
          value={inputs.contents}
        ></textarea>
        {errors.contents && <div className="error-message">{errors.contents}</div>}
      </div>

      {/* ... (이하 주소, 유튜브, 사진 첨부 영역은 그대로 유지) ... */}
      <hr />
  
      <div className="css_주소영역">
         <label>주소</label>
         <div className="css_우편번호검색영역">
           <input type="text" className="css_우편번호입력창"  placeholder="01234"  />
           <button type="button" id="우편번호검색">우편번호 검색</button>
         </div>
         <input type="text" placeholder="주소를 입력해 주세요." />
         <input type="text" placeholder="상세주소" />
      </div>
  
      <hr />
  
      <div className="유튜브링크영역">
        <label>유튜브링크</label>
        <input type="text" className="css_유튜브링크입력창" placeholder="링크를 입력해 주세요." />
      </div>
  
      <hr />
  
      <div className="css_사진첨부영역">
        <label>사진첨부</label>
        <div className="css_이미지업로드영역">
          <div className="css_이미지업로드상자">
            <span className="css_사진첨부더하기">+</span><p>클릭해서 사진 업로드</p>
          </div>
          <div className="css_이미지업로드상자">
            <span className="css_사진첨부더하기">+</span><p>클릭해서 사진 업로드</p>
          </div>
          <div className="css_이미지업로드상자">
            <span className="css_사진첨부더하기">+</span><p>클릭해서 사진 업로드</p>
          </div>
        </div>
      </div>
      
      {/* 푸터 버튼 영역 */}
      <div className="css_푸터영역">
        <button type="button" className="css_취소">취소</button>
        <button 
          type="button" 
          className="css_등록하기"
          onClick={handleSubmit}
          disabled={isButtonDisabled}
        >
          등록하기
        </button>
      </div>
    </div>
  );
}