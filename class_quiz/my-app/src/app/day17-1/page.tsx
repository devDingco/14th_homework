"use client";

import { useState } from "react";

export default function QuizPage() {
  const [hello, setHello] = useState("안녕하세요");

  const onClickHello = () => {
    setHello("반갑습니다");
  };

  return (
    <>
      <button onClick={onClickHello}>{hello}</button>
    </>
  );
}
