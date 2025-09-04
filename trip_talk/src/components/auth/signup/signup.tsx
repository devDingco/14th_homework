'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import './signup.css';
import Modal from '@/components/modal/modal';
import { useCreateUser } from '@/hooks/useGraphQL';

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [emailError, setEmailError] = useState('');
  const [nameError, setNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordCheckError, setPasswordCheckError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // GraphQL 회원가입 뮤테이션
  const [createUser] = useCreateUser();

  const clearEmailError = () => setEmailError('');
  const clearNameError = () => setNameError('');
  const clearPasswordError = () => setPasswordError('');
  const clearPasswordCheckError = () => setPasswordCheckError('');

  const emailValidation = (): boolean => {
    if (email === '') {
      setEmailError('이메일을 입력해주세요.');
      return false;
    }
    if (!email.includes('@')) {
      setEmailError('이메일 형식이 올바르지 않습니다.');
      return false;
    }
    if (!email.includes('.') || email.indexOf('@') > email.lastIndexOf('.')) {
      setEmailError('이메일 형식이 올바르지 않습니다.');
      return false;
    }
    if (email.startsWith('@') || email.endsWith('@')) {
      setEmailError('이메일 형식이 올바르지 않습니다.');
      return false;
    }
    setEmailError('');
    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email === '' || name === '' || password === '' || passwordCheck === '') {
      setEmailError('이메일을 입력해주세요.');
      setNameError('이름을 입력해주세요.');
      setPasswordError('비밀번호를 입력해주세요.');
      setPasswordCheckError('비밀번호를 입력해주세요.');
      return;
    }

    if (!emailValidation()) {
      return;
    }

    if (password !== passwordCheck) {
      setPasswordCheckError('비밀번호가 일치하지 않습니다.');
      return;
    }

    setIsLoading(true);

    try {
      const result = await createUser({
        variables: {
          createUserInput: {
            email,
            password,
            name,
          },
        },
      });

      if (result.data?.createUser) {
        clearEmailError();
        clearNameError();
        clearPasswordError();
        clearPasswordCheckError();
        setModalOpen(true);

        // 성공 후 로그인 페이지로 이동
        setTimeout(() => {
          router.push('/signin');
        }, 2000);
      }
    } catch (error: any) {
      console.error('회원가입 에러:', error);

      // GraphQL 에러 메시지 처리
      if (error.graphQLErrors && error.graphQLErrors.length > 0) {
        const errorMessage = error.graphQLErrors[0].message;

        if (errorMessage.includes('이메일')) {
          setEmailError(errorMessage);
        } else {
          setEmailError(errorMessage);
        }
      } else if (error.message) {
        setEmailError(error.message);
      } else {
        setEmailError('회원가입 중 오류가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (e.target.value !== '') {
      clearEmailError();
    }
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (e.target.value !== '') {
      clearNameError();
    }
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (e.target.value !== '') {
      clearPasswordError();
    }
  };

  const handlePasswordCheckChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordCheck(e.target.value);
    if (e.target.value !== '') {
      if (e.target.value === password) {
        clearPasswordCheckError();
      }
    }
  };

  return (
    <div className="signup_form_wrapper">
      <form className="signup_form" onSubmit={handleSubmit}>
        <div className="signup_form_title">
          <div className="sb_18_24">회원가입</div>
          <div className="me_14_20">회원가입을 위해 아래 빈칸을 모두 채워주세요.</div>
        </div>
        <div className="signup_input_wrapper">
          <div className="signup_input_item">
            <label htmlFor="email" className="signup_label r_12_20">
              이메일<span className="me_16_24">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="이메일을 입력해 주세요."
              className={`signup_form_input ${emailError ? 'error' : ''}`}
              value={email}
              onChange={handleEmailChange}
            />
            {emailError ? <div className="signup_form_error r_12_20">{emailError}</div> : null}
          </div>
          <div className="signup_input_item">
            <label htmlFor="name" className="signup_label r_12_20">
              이름<span className="me_16_24">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="이름을 입력해 주세요."
              className={`signup_form_input ${nameError ? 'error' : ''}`}
              value={name}
              onChange={handleNameChange}
            />
            {nameError ? <div className="signup_form_error r_12_20">{nameError}</div> : null}
          </div>
          <div className="signup_input_item">
            <label htmlFor="password" className="signup_label r_12_20">
              비밀번호<span className="me_16_24">*</span>
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="비밀번호를 입력해 주세요."
              className={`signup_form_input ${passwordError ? 'error' : ''}`}
              value={password}
              onChange={handlePasswordChange}
            />
            {passwordError ? <div className="signup_form_error r_12_20">{passwordError}</div> : null}
          </div>
          <div className="signup_input_item">
            <label htmlFor="passwordCheck" className="signup_label r_12_20">
              비밀번호 확인<span className="me_16_24">*</span>
            </label>
            <input
              id="passwordCheck"
              name="passwordCheck"
              type="password"
              placeholder="비밀번호를 한번 더 입력해 주세요."
              className={`signup_form_input ${passwordCheckError ? 'error' : ''}`}
              value={passwordCheck}
              onChange={handlePasswordCheckChange}
            />
            {passwordCheckError ? <div className="signup_form_error r_12_20">{passwordCheckError}</div> : null}
          </div>
        </div>
        <button type="submit" className="signup_form_button sb_18_24" disabled={isLoading}>
          {isLoading ? '회원가입 중...' : '회원가입'}
        </button>
      </form>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} type="success" />
    </div>
  );
}
