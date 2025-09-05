"use client";

import { useRouter } from "next/navigation";

export const useLoginCheck = () => {
  const router = useRouter();

  const loginCheck = () => {
    // 1. 로그인 검증하기
    // ...

    // 2. 로그인 검증 실패 처리
    alert("로그인을 먼저 해 주세요!");
    router.push("로그인페이지로 이동");
  };

  return {
    loginCheck,
  };
};
