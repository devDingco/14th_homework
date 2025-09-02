"use client";

import React, { useState } from "react";

export default function QuizPage() {
  const [이메일, set이메일] = useState("");
  const [비밀번호, set비밀번호] = useState("");
  const [비밀번호확인, set비밀번호확인] = useState("");
  // const[ , ] = useState("")
  const onChange이메일 = () => {};
  const onChange비밀번호 = () => {};
  const onChange비밀번호확인 = () => {};
  const onClick가입하기 = () => {};

  return (
    <>
      이메일
      <input placeholder="입력해주세요" onChange={onChange이메일} />
      <div></div>
      <br />
      <br />
      비밀번호
      <input placeholder="입력해주세요" onChange={onChange비밀번호} />
      <div></div>
      <br />
      <br />
      비밀번호 입력창
      <input placeholder="입력해주세요" onChange={onChange비밀번호확인} />
      <div></div>
      <br />
      <br />
      <button onClick={onClick가입하기}>가입하기</button>
      <div></div>
    </>
  );
}
