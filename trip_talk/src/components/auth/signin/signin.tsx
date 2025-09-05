'use client';

import Image from 'next/image';
import './signin.css';
import { useRouter } from 'next/navigation';
import { useState, FormEvent, ChangeEvent } from 'react';
import { useLoginUser } from '@/hooks/useGraphQL';
import { useAuth } from '@/contexts/AuthContext';

export default function Signin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // GraphQL 로그인 뮤테이션
  const [loginUser] = useLoginUser();

  // Auth Context 사용
  const { login } = useAuth();

  const handleSignup = () => {
    router.push('/signup');
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email === '' || password === '') {
      setError('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const result = await loginUser({
        variables: {
          email,
          password,
        },
      });

      console.log(result);

      if (result.data?.loginUser?.accessToken) {
        // AuthContext의 login 함수 사용 (토큰 저장 + 사용자 정보 가져오기)
        await login(result.data.loginUser.accessToken);

        // 로그인 성공 시 홈으로 이동
        router.push('/');
      } else {
        setError('로그인에 실패했습니다.');
      }
    } catch (error: any) {
      console.error('로그인 에러:', error);

      // GraphQL 에러 메시지 처리
      if (error.graphQLErrors && error.graphQLErrors.length > 0) {
        setError(error.graphQLErrors[0].message);
      } else if (error.message) {
        setError(error.message);
      } else {
        setError('로그인 중 오류가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError(''); // 에러 메시지 초기화
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (error) setError(''); // 에러 메시지 초기화
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
        <button type="submit" className="login_form_button sb_18_24" disabled={isLoading}>
          {isLoading ? '로그인 중...' : '로그인'}
        </button>
        <div className="login_form_signup_button r_14_20" onClick={handleSignup}>
          회원가입
        </div>
      </div>
    </form>
  );
}
