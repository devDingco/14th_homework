'use client';
import { useLoginCheck } from '@/hooks/useLoginCheck';

export default function MyPage() {
  const { loginCheck } = useLoginCheck();

  loginCheck();

  return (
    <>
      <h1>Mypage</h1>
      {/* <button onClick={onClickSubmit}>로그인 check</button> */}
    </>
  );
}
