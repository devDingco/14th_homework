'use client';

import React from 'react';

// 인풋 컴포넌트에 전달할 수 있는 속성(props) 정의
interface IProps {
  type: string; // 입력창 종류 (예: "text", "email", "password")
  placeholder?: string; // 입력창이 비어있을 때 보이는 안내 문구
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; // 사용자가 입력할 때마다 실행되는 함수
  disabled?: boolean; // 입력창 비활성화 여부 (true면 입력 불가)
  value?: string; // 입력창의 값을 직접 제어할 때 사용 (제어 컴포넌트)
  defaultValue?: string; // 입력창의 초기값 설정 (비제어 컴포넌트)
}

/**
 * 재사용 가능한 입력창 공통 컴포넌트
 *
 * 사용 예시:
 * <MyInput type="email" placeholder="이메일을 입력해 주세요." onChange={handleEmailChange} />
 * <MyInput type="password" placeholder="비밀번호를 입력해 주세요." onChange={handlePasswordChange} />
 */
export function MyInput(props: IProps) {
  const className =
    'w-[320px] h-[40px] border border-[#D4D3D3] rounded-lg py-2 px-4';

  return (
    <input
      className={className}
      type={props.type}
      placeholder={props.placeholder}
      onChange={props.onChange}
      disabled={props.disabled}
      value={props.value}
      defaultValue={props.defaultValue}
    />
  );
}
