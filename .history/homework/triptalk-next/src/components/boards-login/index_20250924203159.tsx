'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { useAccessTokenStore } from '@/commons/stores/access-token-store';
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
          <input
            onChange={onChangeEmail}
            className="w-[320px] h-[40px] border border-[#D4D3D3] rounded-lg py-2 px-4 "
            type="text"
            placeholder="이메일을 입력해 주세요."
          />
          {emailError && (
            <div className="text-red-500 text-sm">{emailError}</div>
          )}
          <input
            onChange={onChangePassword}
            className="w-[320px] h-[40px] border border-[#D4D3D3] rounded-lg py-2 px-4 "
            type="password"
            placeholder="비밀번호를 입력해 주세요."
          />
        </div>
        <button
          onClick={onClickLogin}
          className="w-[320px] h-[48px] bg-[#2974E5] my-[24px] border rounded-lg text-white "
        >
          로그인
        </button>
        <button onClick={onClickSignUP}>회원가입</button>
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
