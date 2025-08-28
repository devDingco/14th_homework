'use client';

import Image from 'next/image';
import './signin.css';
import { useRouter } from 'next/navigation';
import { useState, FormEvent, ChangeEvent } from 'react';

export default function Signin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = () => {
    router.push('/signup');
  };

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email === '' || password === '') {
      setError('이메일과 비밀번호를 입력해주세요.');
      return;
    }
    if (email !== 'test@test.com' || password !== '1234') {
      setError('이메일 또는 비밀번호가 일치하지 않습니다.');
      return;
    }
    setError('');
    // router.push("/");
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <form className="login_form" onSubmit={handleLogin}>
      <div className="login_form_title_wrapper">
        <Image
          src={'/images/logo.png'}
          alt="logo"
          width={120}
          height={80}
          onClick={() => router.push('/')}
          style={{ cursor: 'pointer' }}
        />
        <div className="login_form_title sb_18_24">트립트립에 오신걸 환영합니다.</div>
      </div>
      <div className="login_form_body_wrapper">
        <div className="me_14_20">트립트립에 로그인 하세요.</div>
        <div className="login_form_input_wrapper">
          <input
            type="text"
            placeholder="이메일을 입력해 주세요."
            className={`login_form_input ${error ? 'error' : ''}`}
            value={email}
            onChange={handleEmailChange}
          />
          <input
            type="password"
            placeholder="비밀번호를 입력해 주세요."
            className={`login_form_input ${error ? 'error' : ''}`}
            value={password}
            onChange={handlePasswordChange}
          />
          {error ? <div className="login_form_error r_12_20">{error}</div> : null}
        </div>
      </div>
      <div className="login_form_button_wrapper">
        <button type="submit" className="login_form_button sb_18_24">
          로그인
        </button>
        <div className="login_form_signup_button r_14_20" onClick={handleSignup}>
          회원가입
        </div>
      </div>
    </form>
  );
}
