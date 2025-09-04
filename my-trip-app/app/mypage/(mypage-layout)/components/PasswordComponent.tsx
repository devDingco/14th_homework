'use client';

import './PasswordComponent.css';

export default function PasswordComponent() {
  return (
    <div className="password_component">
      <div className="password_form">
        <h2 className="password_title">비밀번호 변경</h2>
        <form className="password_form_container">
          <div className="input_group">
            <label htmlFor="current_password">현재 비밀번호</label>
            <input 
              type="password" 
              id="current_password" 
              name="current_password"
              placeholder="현재 비밀번호를 입력하세요"
            />
          </div>
          <div className="input_group">
            <label htmlFor="new_password">새 비밀번호</label>
            <input 
              type="password" 
              id="new_password" 
              name="new_password"
              placeholder="새 비밀번호를 입력하세요"
            />
          </div>
          <div className="input_group">
            <label htmlFor="confirm_password">새 비밀번호 확인</label>
            <input 
              type="password" 
              id="confirm_password" 
              name="confirm_password"
              placeholder="새 비밀번호를 다시 입력하세요"
            />
          </div>
          <button type="submit" className="password_submit_btn">
            비밀번호 변경
          </button>
        </form>
      </div>
    </div>
  );
}
