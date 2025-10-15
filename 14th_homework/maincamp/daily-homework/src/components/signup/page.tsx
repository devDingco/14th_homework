'use client';

import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './styles.module.css';

const CREATE_USER = gql`
  mutation createUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      _id
      email
      name
    }
  }
`;

export default function SignupComponent() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [emailError, setEmailError] = useState('');
  const [nameError, setNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordConfirmError, setPasswordConfirmError] = useState('');

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [createUser] = useMutation(CREATE_USER);

  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    if (emailError) setEmailError('');
  };

  const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    if (nameError) setNameError('');
  };

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    if (passwordError) setPasswordError('');
  };

  const onChangePasswordConfirm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirm(event.target.value);
    if (passwordConfirmError) setPasswordConfirmError('');
  };

  const onClickSignup = async () => {
    // 유효성 검사
    let hasError = false;

    if (!email.trim()) {
      setEmailError('이메일을 입력해 주세요.');
      hasError = true;
    }

    if (!name.trim()) {
      setNameError('이름을 입력해 주세요.');
      hasError = true;
    }

    if (!password.trim()) {
      setPasswordError('비밀번호를 입력해 주세요.');
      hasError = true;
    }

    if (!passwordConfirm.trim()) {
      setPasswordConfirmError('비밀번호를 입력해 주세요.');
      hasError = true;
    }

    if (password && passwordConfirm && password !== passwordConfirm) {
      setPasswordConfirmError('비밀번호가 일치하지 않습니다.');
      hasError = true;
    }

    if (hasError) return;

    try {
      await createUser({
        variables: {
          createUserInput: {
            email,
            name,
            password,
          },
        },
      });

      setShowSuccessModal(true);
    } catch (error: any) {
      // 회원가입 실패 시 에러 메시지
      if (error.message.includes('email')) {
        setEmailError('이미 사용 중인 이메일입니다.');
      } else {
        alert('회원가입에 실패했습니다. 다시 시도해 주세요.');
      }
    }
  };

  const onClickLoginRedirect = () => {
    router.push('/login');
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        <div className={styles.signupBox}>
          <div className={styles.header}>
            <div className={styles.title}>회원가입</div>
          </div>

          <div className={styles.signupForm}>
            <div className={styles.description}>회원가입을 위해 아래 빈칸을 모두 채워 주세요.</div>

            <div className={styles.inputGroup}>
              <div className={styles.inputWrapper}>
                <div className={styles.labelArea}>
                  <label className={styles.label}>이메일</label>
                  <span className={styles.required}>*</span>
                </div>
                <input
                  type="email"
                  placeholder="이메일을 입력해 주세요."
                  onChange={onChangeEmail}
                  value={email}
                  className={`${styles.input} ${emailError ? styles.inputError : ''}`}
                />
                {emailError && <div className={styles.errorMessage}>{emailError}</div>}
              </div>

              <div className={styles.inputWrapper}>
                <div className={styles.labelArea}>
                  <label className={styles.label}>이름</label>
                  <span className={styles.required}>*</span>
                </div>
                <input
                  type="text"
                  placeholder="이름을 입력해 주세요."
                  onChange={onChangeName}
                  value={name}
                  className={`${styles.input} ${nameError ? styles.inputError : ''}`}
                />
                {nameError && <div className={styles.errorMessage}>{nameError}</div>}
              </div>

              <div className={styles.inputWrapper}>
                <div className={styles.labelArea}>
                  <label className={styles.label}>비밀번호</label>
                  <span className={styles.required}>*</span>
                </div>
                <input
                  type="password"
                  placeholder="비밀번호를 입력해 주세요."
                  onChange={onChangePassword}
                  value={password}
                  className={`${styles.input} ${passwordError ? styles.inputError : ''}`}
                />
                {passwordError && <div className={styles.errorMessage}>{passwordError}</div>}
              </div>

              <div className={styles.inputWrapper}>
                <div className={styles.labelArea}>
                  <label className={styles.label}>비밀번호 확인</label>
                  <span className={styles.required}>*</span>
                </div>
                <input
                  type="password"
                  placeholder="비밀번호를 한번 더 입력해 주세요."
                  onChange={onChangePasswordConfirm}
                  value={passwordConfirm}
                  className={`${styles.input} ${passwordConfirmError ? styles.inputError : ''}`}
                />
                {passwordConfirmError && (
                  <div className={styles.errorMessage}>{passwordConfirmError}</div>
                )}
              </div>
            </div>

            <button onClick={onClickSignup} className={styles.signupButton}>
              회원가입
            </button>
          </div>
        </div>
      </div>

      <div className={styles.rightSection}></div>

      {/* 회원가입 성공 모달 */}
      {showSuccessModal && (
        <>
          <div className={styles.modalOverlay}></div>
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <div className={styles.modalTitle}>회원가입을 축하 드려요.</div>
            </div>
            <div className={styles.modalButton}>
              <button onClick={onClickLoginRedirect} className={styles.loginButton}>
                로그인 하기
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
