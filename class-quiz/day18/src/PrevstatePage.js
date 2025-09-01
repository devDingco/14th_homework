import React, { useEffect, useState } from '.pnpm/react@19.1.1/node_modules/react';

export default function PrevstatePage() {
  const [state, setState] = useState(0);

  // 함수식을 사용하면 setState가 호출될 때 가장 최신 상태 값을 인자로 받아 비동기적으로 작동하는 문제를 해결 가능
  function sumAll() {
     // 함수를 전달하면 함수를 호출할 때 '이전 상태 값'을 인자로 넣어줌
    // setState(state + 1);
    // setState(state => `${state} + 2`);
    // setState(state => `${state} + 3`);
    // setState(state => `${state} + 4`);



    setState(state => state + 1); 
    setState(state => state + 2);
    setState(state => state + 3);
    setState(state => state + 4);
  }

  return (
    <>
      <div>결과는: {state}</div>
      <button onClick={sumAll}>실행!</button>
    </>
  );
}