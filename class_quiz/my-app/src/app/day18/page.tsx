"use client";

import { useState } from "react";

export default function QuizPage() {
  const [state, setState] = useState(0);

  function sumAll() {
    setState((state) => state + 1);
    setState((state) => state + 2);
    setState((state) => state + 3);
    setState((state) => state + 4);
  }

  return (
    <>
      <div>결과는: {state}</div>
      <button onClick={sumAll}>실행!</button>
    </>
  );
}
