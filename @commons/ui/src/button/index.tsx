'use client';

import React from 'react';

type ReactNode = React.ReactNode;

// 버튼 컴포넌트에 전달할 수 있는 속성(props) 정의
interface IProps {
  children: ReactNode; // 버튼 안에 들어갈 텍스트나 내용 (예: "로그인", "회원가입")
  variant?: 'primary' | 'secondary' | 'cancel'; // 버튼 스타일 종류 (primary: 파란색, secondary: 텍스트, cancel: 취소)
  size?: 'small' | 'medium' | 'large'; // 버튼 크기 (small: 95px, medium: 320px, large: 전체)
  onClick?: () => void; // 버튼을 클릭했을 때 실행할 함수
  disabled?: boolean; // 버튼 비활성화 여부 (true면 클릭 안 됨)
  type?: 'button' | 'submit' | 'reset'; // 버튼 타입 (submit: 폼 제출용, button: 일반 버튼)
}

/**
 * 재사용 가능한 버튼 공통 컴포넌트
 *
 * 사용 예시:
 * <MyButton variant="primary" size="medium" onClick={handleLogin}>로그인</MyButton>
 * <MyButton variant="secondary" onClick={handleSignup}>회원가입</MyButton>
 * <MyButton variant="primary" size="small" type="submit">등록하기</MyButton>
 */
export function MyButton(props: IProps) {
  // 모든 버튼에 공통으로 적용되는 기본 스타일
  const baseStyle = 'border rounded-lg';

  // variant(스타일 종류)에 따라 다르게 적용되는 스타일
  const variantStyles = {
    primary: 'bg-[#2974E5] text-white', // 파란색 버튼
    secondary: 'bg-white hover:underline', // 텍스트 버튼
    cancel: 'bg-white text-black', // 취소 버튼
  };

  // size에 따라 다른 크기 적용
  const sizeStyles = {
    small: 'w-[95px] h-[48px]', // 등록/수정 페이지용
    medium: 'w-[320px] h-[48px] my-[24px]', // 로그인/회원가입용
    large: 'w-full h-[48px]', // 전체 너비
  };

  // variant, size가 없으면 기본값 사용
  const variant = props.variant || 'primary';
  const size = props.size || 'medium';

  // 기본 스타일 + variant 스타일 + size 스타일을 합쳐서 최종 className 생성
  const className = `${baseStyle} ${variantStyles[variant]} ${sizeStyles[size]}`;

  return (
    <button
      className={className}
      onClick={props.onClick}
      disabled={props.disabled}
      type={props.type}
    >
      {props.children}
    </button>
  );
}
