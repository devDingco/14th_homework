"use client";

import React, { useState } from "react";

export default function QuizPage() {
  const [인증번호, set인증번호] = useState("000000");
  const onClick인증번호전송 = () => {
    set인증번호(String(Math.floor(Math.random() * 1000000)).padStart(6, "0"));
  };

  return (
    <>
      <div>{인증번호}</div>
      <button onClick={onClick인증번호전송}>인증번호전송</button>
    </>
  );
}
