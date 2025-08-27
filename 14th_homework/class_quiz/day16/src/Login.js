
import React, { useState } from 'react';

import pizzaImage from './pizza.png';
import map1Image from './map_1.png';
import deleteIcon from './delete.png';
import talkIcon from './talk.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    let valid = true;

    if (email === '' || !email.includes('@')) {
      setEmailError('이메일 주소를 다시 확인해주세요.');
      valid = false;
    } else {
      setEmailError('');
    }

    if (password === '' || password.length < 8) {
      setPasswordError('8-16자의 영문, 숫자, 특수문자만 사용 가능합니다.');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (valid) {
      setEmail('');
      setPassword('');
      alert('로그인 성공!');
    }
  };

  return (
    <div className="login-container">
      {/* Background Image: using imported image with inline style */}
      <div className="background-image" style={{ backgroundImage: `url(${pizzaImage})` }}></div>
      
      {/* Logo and Title */}
      <div className="logo-section">
        <div className="map-icon-front" style={{ backgroundImage: `url(${map1Image})` }}></div>
        <h1 className="app-title">잇츠로드</h1>
      </div>

      {/* Login Form */}
      <form onSubmit={handleLogin} className="login-form">
        <div className="input-group">
          <input
            type="text"
            className="login-input"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {email && <span className="delete-icon" onClick={() => setEmail('')} style={{ backgroundImage: `url(${deleteIcon})` }}></span>}
        </div>
        {emailError && <p className="error-message">{emailError}</p>}

        <div className="input-group">
          <input
            type="password"
            className="login-input"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {password && <span className="delete-icon" onClick={() => setPassword('')} style={{ backgroundImage: `url(${deleteIcon})` }}></span>}
        </div>
        {passwordError && <p className="error-message">{passwordError}</p>}

        <button type="submit" className="login-button">로그인</button>
      </form>

      {/* Links */}
      <div className="links-section">
        <a href="#" className="link">이메일 찾기</a>
        <span className="divider">|</span>
        <a href="#" className="link">비밀번호 찾기</a>
        <span className="divider">|</span>
        <a href="#" className="link">회원가입</a>
      </div>

      {/* Social Login */}
      <div className="social-login">
        <button className="kakao-login-button" style={{ backgroundImage: `url(${talkIcon})` }}>
          <span className="kakao-text">카카오톡으로 로그인</span>
        </button>
      </div>
    </div>
  );
};

export default Login;