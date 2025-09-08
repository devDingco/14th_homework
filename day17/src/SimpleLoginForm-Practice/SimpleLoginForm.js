// src/SimpleLoginForm.js

import React, { useState } from 'react'; // React와 useState hook을 가져옵니다.

// SimpleLoginForm 컴포넌트를 정의합니다.ㄹ
export default function SimpleLoginForm() {
  // 1. 아이디와 비밀번호를 저장할 '상태(state)'를 각각 만듭니다.
  //    초기값은 빈 문자열 "" 입니다.
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  // 2. ⭐ 오늘의 핵심! '파생된 상태' 만들기 ⭐
  //    id나 password 상태값 중 하나라도 비어있으면(falsy), isButtonDisabled는 true가 됩니다.
  //    둘 다 값이 채워져 있으면(truthy), isButtonDisabled는 false가 됩니다.
  const isButtonDisabled = !id || !password;

  // 3. 아이디 input의 내용이 바뀔 때마다 id 상태를 업데이트하는 함수
  const handleIdChange = (event) => {
    setId(event.target.value);
  };

  // 4. 비밀번호 input의 내용이 바뀔 때마다 password 상태를 업데이트하는 함수
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '10px', width: '300px' }}>
      <h1>간단 로그인 폼</h1>

      <div>
        <p>아이디</p>
        <input 
          type="text" 
          value={id} 
          onChange={handleIdChange} // 3번 함수 연결
          placeholder="아이디를 입력하세요" 
        />
      </div>

      <div>
        <p>비밀번호</p>
        <input 
          type="password" 
          value={password}
          onChange={handlePasswordChange} // 4번 함수 연결
          placeholder="비밀번호를 입력하세요"
        />
      </div>

      <hr style={{ margin: '20px 0' }} />

      <button 
        disabled={isButtonDisabled} // 2번에서 계산한 값을 disabled 속성에 연결
        style={{ 
          padding: '10px 15px', 
          cursor: isButtonDisabled ? 'not-allowed' : 'pointer', // 비활성화시 마우스 커서 변경
          backgroundColor: isButtonDisabled ? '#ccc' : '#007bff', // 비활성화시 배경색 변경
          color: 'white',
          border: 'none',
          borderRadius: '5px'
        }}
      >
        로그인
      </button>
    </div>
  );
}