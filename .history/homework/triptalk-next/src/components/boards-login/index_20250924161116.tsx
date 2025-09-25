'use client';
import React from 'react';
import Image from 'next/image';
export default function BoardsLogin() {
  return (
    <div className="w-full flex justify-between ">
      <div className="flex flex-col items-center justify-center">
        <Image src="/icons/logo.svg" width={120} height={74.5} alt="" />
        <div className="p-6">트립토크에 오신걸 환영합니다.</div>
        <div className="pb-4">트립토크에 로그인 하세요.</div>
        <div className="flex flex-col">
          <input type="text" placeholder="이메일을 입력해 주세요." />
          <input type="password" placeholder="비밀번호를 입력해 주세요." />
        </div>
        <button>로그인</button>
        <button>회원가입</button>
      </div>
      <div>큰사진</div>
    </div>
  );
}
