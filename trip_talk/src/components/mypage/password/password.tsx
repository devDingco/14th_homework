'use client';

import './password.css';
import { useState, ChangeEvent, FormEvent } from 'react';
import Modal from '../../../components/modal/modal';

export default function Password() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNewPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewPassword(value);

    //   if (value && value.length < 6) {
    //     setErrors((prev) => ({ ...prev, newPassword: '비밀번호는 6자 이상 입력해주세요.' }));
    //   } else {
    //     setErrors((prev) => ({ ...prev, newPassword: '' }));
    //   }
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);

    if (value && value !== newPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: '비밀번호가 일치하지 않습니다.' }));
    } else {
      setErrors((prev) => ({ ...prev, confirmPassword: '' }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // 유효성 검사
    if (!newPassword) {
      setErrors((prev) => ({ ...prev, newPassword: '새 비밀번호를 입력해주세요.' }));
      return;
    }

    if (!confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: '새 비밀번호를 확인해주세요.' }));
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: '비밀번호가 일치하지 않습니다.' }));
      return;
    }

    // if (newPassword.length < 6) {
    //   setErrors((prev) => ({ ...prev, newPassword: '비밀번호는 6자 이상 입력해주세요.' }));
    //   return;
    // }

    // 비밀번호 변경 로직 (실제 구현 시 API 호출)
    // console.log('비밀번호 변경:', { newPassword });
    setIsModalOpen(true);
  };

  const isFormValid =
    newPassword &&
    confirmPassword &&
    newPassword === confirmPassword &&
    // newPassword.length >= 6 &&
    !errors.newPassword &&
    !errors.confirmPassword;

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // 모달 닫힐 때 폼 초기화
    setNewPassword('');
    setConfirmPassword('');
    setErrors({ newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="password_container">
      <h2 className="password_title sb_18_24">비밀번호 변경</h2>

      <form className="password_form" onSubmit={handleSubmit}>
        <div className="password_inputs">
          <div className="password_input_group">
            <div className="password_label_wrapper">
              <label className="password_label me_16_24">새 비밀번호</label>
              <span className="password_required">*</span>
            </div>
            <input
              type="password"
              className={`password_input ${errors.newPassword ? 'error' : ''}`}
              placeholder="새 비밀번호를 입력해 주세요."
              value={newPassword}
              onChange={handleNewPasswordChange}
            />
            {errors.newPassword && <div className="password_error r_12_20">{errors.newPassword}</div>}
          </div>

          <div className="password_input_group">
            <div className="password_label_wrapper">
              <label className="password_label me_16_24">새 비밀번호 확인</label>
              <span className="password_required">*</span>
            </div>
            <input
              type="password"
              className={`password_input ${errors.confirmPassword ? 'error' : ''}`}
              placeholder="새 비밀번호를 확인해 주세요."
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            {errors.confirmPassword && <div className="password_error r_12_20">{errors.confirmPassword}</div>}
          </div>
        </div>

        <button
          type="submit"
          className={`password_button sb_18_24 ${!isFormValid ? 'disabled' : ''}`}
          disabled={!isFormValid}
        >
          비밀번호 변경
        </button>
      </form>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} type="passwordChange" />
    </div>
  );
}
