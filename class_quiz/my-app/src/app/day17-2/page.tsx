"use client";

import { useState } from "react";

export default function QuizPage() {
  const [count, setCount] = useState(0);

  const onClickCount = () => {
    setCount(count + 1);
  };

  return (
    <>
      <div>{count}</div>
      <button onClick={onClickCount}>카운트증가</button>
    </>
  );
}
