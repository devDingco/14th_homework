"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@apollo/client';
import { graphql } from '@/commons/graphql/gql';
import { Button, Input } from '@triptalk/ui-components';
import styles from './SignupForm.module.css';

// GraphQL mutation 정의
const CREATE_USER = graphql(`
  mutation createUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      _id
      email
      name
    }
  }
`);

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface SignupFormProps {}

const SignupForm: React.FC<SignupFormProps> = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [nameError, setNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [createUser] = useMutation(CREATE_USER);

  const validateForm = () => {
    let isValid = true;
    
    // 이메일 유효성 검사
    if (!email.trim()) {
      setEmailError('이메일을 입력해주세요');
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setEmailError('올바른 이메일 형식을 입력해주세요');
      isValid = false;
    } else {
      setEmailError('');
    }

    // 이름 유효성 검사
    if (!name.trim()) {
      setNameError('이름을 입력해주세요');
      isValid = false;
    } else {
      setNameError('');
    }

    // 비밀번호 유효성 검사
    if (!password.trim()) {
      setPasswordError('비밀번호를 입력해주세요');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('비밀번호는 6자 이상 입력해주세요');
      isValid = false;
    } else {
      setPasswordError('');
    }

    // 비밀번호 확인 유효성 검사
    if (!confirmPassword.trim()) {
      setConfirmPasswordError('비밀번호 확인을 입력해주세요');
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('비밀번호가 일치하지 않습니다');
      isValid = false;
    } else {
      setConfirmPasswordError('');
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const result = await createUser({
        variables: {
          createUserInput: {
            email: email.trim(),
            name: name.trim(),
            password: password.trim()
          }
        }
      });

      if (result.data?.createUser) {
        // 회원가입 성공 시 로그인 페이지로 이동
        alert('회원가입이 완료되었습니다. 로그인해주세요.');
        router.push('/auth/login');
      }
    } catch (error: unknown) {
      console.error('회원가입 실패:', error);
      // 에러 메시지 표시
      const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다';
      if (errorMessage.includes('이메일')) {
        setEmailError('이미 사용 중인 이메일입니다');
      } else {
        setEmailError('회원가입에 실패했습니다');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginClick = () => {
    router.push('/auth/login');
  };

  return (
    <div className={styles.signupContainer}>
      <div className={styles.signupForm}>
        <div className={styles.title}>
          회원가입
        </div>
        
        <div className={styles.instruction}>
          회원가입을 위해 아래 빈칸을 모두 채워 주세요.
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일을 입력해 주세요."
            label="이메일"
            required
            error={!!emailError}
            errorMessage={emailError}
            disabled={isLoading}
            fullWidth
            className={styles.inputGroup}
          />

          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름을 입력해 주세요."
            label="이름"
            required
            error={!!nameError}
            errorMessage={nameError}
            disabled={isLoading}
            fullWidth
            className={styles.inputGroup}
          />

          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력해 주세요."
            label="비밀번호"
            required
            error={!!passwordError}
            errorMessage={passwordError}
            disabled={isLoading}
            fullWidth
            className={styles.inputGroup}
          />

          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="비밀번호를 다시 입력해 주세요."
            label="비밀번호 확인"
            required
            error={!!confirmPasswordError}
            errorMessage={confirmPasswordError}
            disabled={isLoading}
            fullWidth
            className={styles.inputGroup}
          />

          <Button
            type="submit"
            variant="primary"
            size="large"
            disabled={isLoading}
            loading={isLoading}
            fullWidth
            className={styles.signupButton}
          >
            회원가입
          </Button>
        </form>

        <Button
          type="button"
          variant="ghost"
          size="large"
          onClick={handleLoginClick}
          fullWidth
          className={styles.loginButton}
        >
          이미 계정이 있으신가요? 로그인
        </Button>
      </div>
    </div>
  );
};

export default SignupForm;
