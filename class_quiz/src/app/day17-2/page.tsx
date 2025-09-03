"use client";
import React, { useState } from "react";

export default function QuizPage() {
  const [카운트, set카운트] = useState(0);

  const onClick카운트증가 = () => {
    set카운트(카운트 + 1);
  };

  return (
    <>
      <div>{카운트}</div>
      <button onClick={onClick카운트증가}>카운트증가</button>
    </>
  );
}
