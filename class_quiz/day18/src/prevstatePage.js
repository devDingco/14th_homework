//prevstatePage.js
import React, { useState } from 'react';

export default function PrevstatePage() {
  const defaultNum = 0
  const [state, setState] = useState(defaultNum);

  function sumAll() {
    // 배열테스트 완
    // const text = "1 + 2 + 3 + 4 + 5";
    // const textSplit = Number(text.split("+").slice(-1));
    // setState(textSplit)
    state === defaultNum ? setState(state + 1) : state === 1 ? setState(state + ` + ${state + 1}`) : setState(state + ` + ${Number(state.split("+").slice(-1)) + 1}`)
  }

  return (
    <>
      <div>결과는: {state}</div>
      <button onClick={sumAll}>실행!</button>
    </>
  );
}

