"use client";

import { ChangeEvent } from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  className?: string; // 인풋에 기존 CSS 클래스 적용
}

export default function YoutubeUrl(props: React.InputHTMLAttributes<HTMLInputElement>) {

  return (
    <input
    type="text"
    placeholder="유튜브 링크를 입력해 주세요."
    {...props}
    />
  );
}
