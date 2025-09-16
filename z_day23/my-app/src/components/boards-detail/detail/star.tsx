"use client";

import React, { useState } from "react";
import { Rate } from "antd";

const App: React.FC = () => {
  const [value, setValue] = useState(3);

  // === 1단계 방식
  const 함수 = (value: number) => {
    setValue(value); // 함수에 들어오는 변수 value를 사용(스코프)
  };

  return (
    <>
      {/* 1단계 방식 */}
      {/* 진짜 onChange */}
      {/* <button onChange={onChangeInput}></button> */}

      {/* 아래의 onChange는 antd 개발자가 만든 가짜 onChange */}
      <Rate onChange={함수} value={value} />
      <span>점수: {value}점</span>

      {/* 2단계 방식 */}
      <Rate
        onChange={(value: number) => {
          setValue(value);
        }}
        value={value}
      />
      <span>점수: {value}점</span>

      {/* 3단계 방식 */}
      <Rate
        onChange={(value: number) => {
          return setValue(value);
        }}
        value={value}
      />
      <span>점수: {value}점</span>

      {/* 4단계 방식 */}
      <Rate onChange={(value: number) => setValue(value)} value={value} />
      <span>점수: {value}점</span>

      {/* 5단계 방식: setValue뿐만 아니라 어떤 함수던 상관없이 들어오는 변수(ex, value)와 들어가는 변수(ex, value)가 동일하면 생략 가능 */}
      <Rate onChange={setValue} value={value} />
      <span>점수: {value}점</span>
    </>
  );
};

export default App;
