import React, { useState } from 'react';
let a = 1
export default function PrevstatePage(){
  const [state, setState] = useState<string>("1");

  function sumAll() {
    a +=1
    setState(state + "+" + String(a));
    }

  return (
    <>
      <div>결과는: {state}</div>
      <button onClick={sumAll}>실행!</button>
    </>
  );
}
