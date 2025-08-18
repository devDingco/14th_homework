import './App.css';
import { useState } from 'react';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (value.length === 0) {
      setEmailError('이메일을 입력해주세요.');
    } else if (!emailPattern.test(value)) {
      setEmailError('이메일 형식에 맞지 않습니다.');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    const passwordPattern = /^(?=.*[!@#$%^&*])(?=.{10,})/;
    if (value.length === 0) {
      setPasswordError('비밀번호를 입력해주세요.');
    } else if (!passwordPattern.test(value)) {
      setPasswordError('비밀번호는 특수문자를 포함하여 10자 이상이어야 합니다.');
    } else {
      setPasswordError('');
    }
  };

  const handleLogin = () => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordPattern = /^(?=.*[!@#$%^&*])(?=.{10,})/;

    const isEmailValid = emailPattern.test(email);
    const isPasswordValid = passwordPattern.test(password);

    if (!email || !isEmailValid) {
      if (!email) {
        setEmailError('이메일을 입력해주세요.');
      } else {
        setEmailError('이메일 형식에 맞지 않습니다.');
      }
    }

    if (!password || !isPasswordValid) {
      if (!password) {
        setPasswordError('비밀번호를 입력해주세요.');
      } else {
        setPasswordError('비밀번호는 특수문자를 포함하여 10자 이상이어야 합니다.');
      }
    }

    if (isEmailValid && isPasswordValid) {
      alert('로그인이 완료되었습니다.');
    }
  };

  const isFormValid = (() => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordPattern = /^(?=.*[!@#$%^&*])(?=.{10,})/;
    return emailPattern.test(email) && passwordPattern.test(password);
  })();

  const onClickClearEmail = () => {
    setEmail('');
    setEmailError('이메일을 입력해주세요.');
  };

  const onClickClearPassword = () => {
    setPassword('');
    setPasswordError('비밀번호를 입력해주세요.');
  };

  return (
    <div className="App">
      <div className="logo"/>
      <h1 className="title">잇츠로드</h1>
      <div className="input-container">
        <div className="input-wrapper">
          <input type="text" placeholder="이메일을 입력해주세요." value={email} onChange={handleEmailChange} />
          <div className="close-icon" onClick={onClickClearEmail}/>
        </div>
        <div className="error-message">{emailError}</div>
        <div className="input-wrapper">
          <input type="password" placeholder="비밀번호를 입력해주세요." value={password} onChange={handlePasswordChange} />
          <div className="close-icon" onClick={onClickClearPassword}/>
        </div>
        <div className="error-message">{passwordError}</div>
      </div>
      <button className="login-button" onClick={handleLogin} disabled={!isFormValid}>로그인</button>
      <div className="text-menu">
        <div className="text-menu-item">아이디 찾기</div>
        <div className="text-menu-item">|</div>
        <div className="text-menu-item">비밀번호 찾기</div>
        <div className="text-menu-item">|</div>
        <div className="text-menu-item">회원가입</div>
      </div>
      <button className="kakao-login-button">
        <div className="kakao-logo"/>
        카카오톡으로 로그인</button>
    </div>
    
  );
}


export default App;
