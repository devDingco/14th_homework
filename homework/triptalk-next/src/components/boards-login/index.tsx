'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { useAccessTokenStore } from '@/commons/stores/access-token-store';
import { MyInput, MyButton } from '@commons/ui';
const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      accessToken
    }
  }
`;
export default function BoardsLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginUser] = useMutation(LOGIN_USER);

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const { setAccessToken } = useAccessTokenStore();

  const onClickLogin = async () => {
    console.log('로그인 클릭');
    // 에러 메시지 초기화
    setEmailError('');
    setPasswordError('');
    // 1. 빈칸확인
    if (!email) {
      setEmailError('이메일을 입력해주세요');
      return;
    }
    if (!password) {
      setPasswordError('비밀번호를 입력해주세요');
      return;
    }
    // 2.로그인 실행
    try {
      const result = await loginUser({
        variables: { email, password },
      });
      const accessToken = result.data?.loginUser.accessToken;
      console.log(accessToken);

      setAccessToken(accessToken);
      localStorage.setItem('accessToken', accessToken); // 임시사용 나중에 refreshToken으로 대체예정

      router.push('/boards/');
    } catch (error) {
      console.log(error);
      alert('로그인에 실패했습니다. 다시 시도해 주세요.');
    }
  };
  const onClickSignUP = () => {
    router.push('/boards/signup');
  };
  return (
    <div className="w-full flex h-screen">
      {/* 왼쪽 */}
      <div className="w-[360px] flex flex-col items-center justify-center m-[40px]">
        <Image src="/icons/logo.svg" width={120} height={74.5} alt="" />
        <div className="p-6">트립토크에 오신걸 환영합니다.</div>
        <div className="pb-4">트립토크에 로그인 하세요.</div>
        <div className="flex flex-col gap-3">
          <MyInput
            onChange={onChangeEmail}
            type="text"
            placeholder="이메일을 입력해 주세요."
          />
          {emailError && (
            <div className="text-red-500 text-sm">{emailError}</div>
          )}
          <MyInput
            onChange={onChangePassword}
            type="password"
            placeholder="비밀번호를 입력해 주세요."
          />
          {passwordError && (
            <div className="text-red-500 text-sm">{emailError}</div>
          )}
        </div>
        <MyButton onClick={onClickLogin} variant="primary">
          로그인
        </MyButton>
        <MyButton onClick={onClickSignUP} variant="secondary">
          회원가입
        </MyButton>
      </div>
      {/* 오른쪽 */}
      <div className="relative flex-1 h-full">
        <Image
          src="/icons/login.png"
          fill
          style={{ objectFit: 'cover' }}
          alt=""
          priority
        />
      </div>
    </div>
  );
}
