'use client';

import React from 'react';

// 인풋 컴포넌트에 전달할 수 있는 속성(props) 정의
interface IProps {
  type: string; // 입력창 종류 (예: "text", "email", "password")
  size?: 'small' | 'medium' | 'large'; // 입력창 크기 (small: 320px, medium: 620px, large: 1280px)
  placeholder?: string; // 입력창이 비어있을 때 보이는 안내 문구
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; // 사용자가 입력할 때마다 실행되는 함수
  disabled?: boolean; // 입력창 비활성화 여부 (true면 입력 불가)
  value?: string; // 입력창의 값을 직접 제어할 때 사용 (제어 컴포넌트)
  defaultValue?: string; // 입력창의 초기값 설정 (비제어 컴포넌트)
  readOnly?: boolean; // 읽기 전용 여부
}

/**
 * 재사용 가능한 입력창 공통 컴포넌트
 *
 * 사용 예시:
 * <MyInput size="small" type="email" placeholder="이메일을 입력해 주세요." onChange={handleEmailChange} />
 * <MyInput size="large" type="text" placeholder="제목을 입력해 주세요." />
 */
export function MyInput(props: IProps) {
  // 모든 입력창에 공통으로 적용되는 기본 스타일
  const baseStyle = 'border border-[#D4D3D3] rounded-lg';

  // size에 따라 다른 크기 적용
  const sizeStyles = {
    small: 'w-[320px] h-[40px] py-2 px-4', // 로그인/회원가입용
    medium: 'w-[620px] h-[48px] py-3 px-4', // 작성자/비밀번호용
    large: 'w-[1280px] h-[48px] py-3 px-4', // 제목/주소/유튜브용
  };

  // size가 없으면 기본값으로 'small' 사용
  const size = props.size || 'small';

  // 기본 스타일 + size 스타일을 합쳐서 최종 className 생성
  const className = `${baseStyle} ${sizeStyles[size]}`;

  return (
    <input
      className={className}
      type={props.type}
      placeholder={props.placeholder}
      onChange={props.onChange}
      disabled={props.disabled}
      value={props.value}
      defaultValue={props.defaultValue}
      readOnly={props.readOnly}
    />
  );
}
