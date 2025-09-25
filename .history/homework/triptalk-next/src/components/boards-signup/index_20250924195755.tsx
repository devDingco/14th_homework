'use client';
import React, { use, useState } from 'react';
import Image from 'next/image';
import { gql } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { on } from 'events';
import { set } from 'lodash';
const SIGNUP_USER = gql`
  mutation createUser($createUserInput: createUserInput!) {
    createUser(createUserInput: $createUserInput) {
      _id
      email
      name
    }
  }
`;

export default function BoardsSignUp() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const onChangeName = (event) => {
    setName(event.target.value);
  };
  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const onChangePasswordConfirm = (event) => {
    setPasswordConfirm(event.target.value);
  };

  const onClickSignUp = async () => {};
  return (
    <div className="w-full flex h-screen">
      {/* 왼쪽 */}
      <div className="w-[360px] flex flex-col items-center justify-center m-[40px]">
        <div className="p-6">회원가입</div>
        <div className="pb-4">
          회원가입을 위해 아래 빈칸을 모두 채워 주세요.
        </div>
        <div className="flex flex-col gap-3">
          이메일
          <input
            onChange={onChangeEmail}
            className="w-[320px] h-[40px] border border-[#D4D3D3] rounded-lg py-2 px-4 "
            type="text"
            placeholder="이메일을 입력해 주세요."
          />
          이름
          <input
            onChange={onChangeName}
            className="w-[320px] h-[40px] border border-[#D4D3D3] rounded-lg py-2 px-4 "
            type="password"
            placeholder="이름을 입력해 주세요."
          />
          비밀번호
          <input
            onChange={onChangePassword}
            className="w-[320px] h-[40px] border border-[#D4D3D3] rounded-lg py-2 px-4 "
            type="password"
            placeholder="비밀번호를 입력해 주세요."
          />
          비밀번호 확인
          <input
            onChange={onChangePasswordConfirm}
            className="w-[320px] h-[40px] border border-[#D4D3D3] rounded-lg py-2 px-4 "
            type="password"
            placeholder="비밀번호를 한번 더 입력해 주세요."
          />
        </div>
        <button
          onClick={onClickSignUp}
          className="w-[320px] h-[48px] bg-[#2974E5] my-[24px] border rounded-lg text-white "
        >
          회원가입
        </button>
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
