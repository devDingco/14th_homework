"use client";

import "../../../app/global.css";
import "./index.css";
import { useState } from 'react';
import Image from "next/image";
import { useRouter } from 'next/navigation';

export default function SignIn({ onClickSignup }) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // 저장된 계정 값 (예시)
  const storedEmail = "user@example.com";
  const storedPassword = "P@ssword123!";

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (loginError) setLoginError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (loginError) setLoginError('');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const isMatched = email === storedEmail && password === storedPassword;
    if (!isMatched) {
      setLoginError("아이디 또는 비밀번호를 확인해 주세요.");
      return;
    }
    try {
      localStorage.setItem('auth_token', 'fake-token-123');
      localStorage.setItem('auth_user_email', email);
    } catch (err) {
      // noop
    }
    router.push('/');
  };


  return (
    <div className="signin_page">
        <div className="signin_left_panel">
            <Image className="logo_mark" src="/logo/text-logo.png" alt="logo" width={120} height={80} />
            <h2 className="sb_18_24">트립트립에 오신걸 환영합니다.</h2>
            <form className="signin_form" onSubmit={handleLogin} noValidate>
            <div className="form_group">
            <h3 className="me_14_20">트립트립에 로그인 하세요</h3>
                <input
                className={`form_input r_14_20 ${loginError ? 'form_input_error' : ''}`}
                type="email"
                placeholder="이메일을 입력해주세요."
                value={email}
                onChange={handleEmailChange}
                required
                />
            </div>
            <div className="form_group">
                <input
                id="password_input"
                className={`form_input r_14_20 ${loginError ? 'form_input_error' : ''}`}
                type="password"
                placeholder="비밀번호를 입력해주세요."
                value={password}
                onChange={handlePasswordChange}
                required
                />
                {loginError && <p className="error_message me_12_20">{loginError}</p>}
            </div>
            <button className="submit_btn sb_18_24" type="submit">로그인</button>
            <div className="form_footer">
                <button type="button" className="link_btn r_14_20" onClick={onClickSignup}>회원가입</button>
            </div>
            </form>
        </div>
    </div>
);
}


