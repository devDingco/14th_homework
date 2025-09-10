'use client';

import { useState } from 'react';
import './passwordModal.css';

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (password: string) => void;
  isLoading?: boolean;
  error?: string;
}

export default function PasswordModal({ isOpen, onClose, onConfirm, isLoading = false, error }: PasswordModalProps) {
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim()) {
      onConfirm(password);
    }
  };

  const handleClose = () => {
    setPassword('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="password_modal_overlay">
      <div className="password_modal_wrapper">
        <div className="password_modal_content">
          <div className="password_modal_header sb_18_24">비밀번호 확인</div>
          <div className="password_modal_description me_14_20">비밀번호를 입력해주세요.</div>

          <form onSubmit={handleSubmit} className="password_modal_form">
            <div className="password_modal_input_group">
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                className={`password_modal_input ${error ? 'error' : ''}`}
                disabled={isLoading}
                autoFocus
              />
            </div>
            {error && <div className="password_modal_error">{error}</div>}
          </form>
        </div>

        <div className="password_modal_button_wrapper">
          <div
            className="password_modal_secondary_button sb_14_20"
            onClick={handleClose}
            style={{ opacity: isLoading ? 0.6 : 1, cursor: isLoading ? 'not-allowed' : 'pointer' }}
          >
            취소
          </div>
          <div
            className="password_modal_primary_button sb_14_20"
            onClick={handleSubmit}
            style={{
              opacity: isLoading || !password.trim() ? 0.6 : 1,
              cursor: isLoading || !password.trim() ? 'not-allowed' : 'pointer',
            }}
          >
            {isLoading ? '확인 중...' : '확인'}
          </div>
        </div>
      </div>
    </div>
  );
}
