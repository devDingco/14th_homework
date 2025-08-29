import React, { useState } from 'react';

export default function PrevstatePage() {
  const [state, setState] = useState(0);

  function sumAll() {
    setState((a)=>{return a+1})
    setState((state) => { return state + 1});
    setState((state) => { return state + 2});
    setState((state) => { return state + 3});
    setState((state) => { return state + 4});
  }

  return (
    <>
      <div>결과는: {state}</div>
      <button onClick={sumAll}>실행!</button>
    </>
  );
}