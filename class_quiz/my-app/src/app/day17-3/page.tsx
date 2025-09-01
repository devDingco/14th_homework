"use client";

import { useState } from "react";

export default function QuizPage() {
  const [authCode, setAuthCode] = useState("000000");

  const onClickCreateAuthCode = () => {
    setAuthCode(String(Math.floor(Math.random() * 1000000)).padStart(6, "0"));
  };
  return (
    <>
      <div>{authCode}</div>
      <button onClick={onClickCreateAuthCode}>인증번호 전송</button>
    </>
  );
}
