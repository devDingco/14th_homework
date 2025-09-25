'use client';
import React from 'react';
import Image from 'next/image';
export default function BoardsSignUp() {
  return (
    <div className="w-full flex h-screen">
      {/* 왼쪽 */}
      <div className="w-[360px] flex flex-col items-center justify-center m-[40px]">
        <div className="p-6">트립토크에 오신걸 환영합니다.</div>
        <div className="pb-4">트립토크에 로그인 하세요.</div>
        <div className="flex flex-col gap-3">
          <input
            className="w-[320px] h-[40px] border border-[#D4D3D3] rounded-lg py-2 px-4 "
            type="text"
            placeholder="이메일을 입력해 주세요."
          />
          <input
            className="w-[320px] h-[40px] border border-[#D4D3D3] rounded-lg py-2 px-4 "
            type="password"
            placeholder="비밀번호를 입력해 주세요."
          />
        </div>
        <button className="w-[320px] h-[48px] bg-[#2974E5] my-[24px] border rounded-lg text-white ">
          로그인
        </button>
        <button>회원가입</button>
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
