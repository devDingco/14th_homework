"use client";

import { ChangeEvent } from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  className?: string; // 인풋에 기존 CSS 클래스 적용
}

export default function YoutubeUrl({ value, onChange, className }: Props) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input
      type="text"
      className={className}
      placeholder="유튜브 링크를 입력해 주세요."
      value={value}
      onChange={handleChange}
    />
  );
}
