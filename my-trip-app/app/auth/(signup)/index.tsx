"use client";

import "../../global.css";
import "./index.css";
import { useState } from 'react';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { signUpApi } from '../../commons/apis/auth.api';
export default function SignUp({ onClickSignin }: { onClickSignin?: () => void }) {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState<{ email: string; name: string; password: string; confirm: string }>({ email: '', name: '', password: '', confirm: '' });
    const [submitting, setSubmitting] = useState(false);
    const [apiError, setApiError] = useState('');
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[!@#$%^&*]).{10,}$/;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const nextErrors = { email: '', name: '', password: '', confirm: '' };
      if (!email) nextErrors.email = '이메일을 입력해 주세요.';
      else if (!emailRegex.test(email)) nextErrors.email = '이메일 형식에 맞지 않습니다.';
      
      if (!name) nextErrors.name = '이름을 입력해 주세요.';
      
      if (!password) nextErrors.password = '비밀번호를 입력해 주세요.';
      else if (!passwordRegex.test(password)) nextErrors.password = '비밀번호는 특수문자를 포함하여 10자 이상이어야 합니다.';
      
      if (!confirmPassword) nextErrors.confirm = '비밀번호를 확인해 주세요.';
      else if (password !== confirmPassword) nextErrors.confirm = '비밀번호가 일치하지 않습니다.';
      
      setErrors(nextErrors);
      const hasError = Object.values(nextErrors).some(Boolean);
      if (hasError) return;

      try {
        setSubmitting(true);
        setApiError('');
        await signUpApi({ email, name, password });
        alert('회원가입이 완료되었습니다.');
        router.push('/auth');
      } catch (err: any) {
        setApiError(err?.message ?? '회원가입에 실패했습니다.');
      } finally {
        setSubmitting(false);
      }
    };


  return (
    <div className="signin_page">
        <div className="signin_left_panel">
            <Image className="logo_mark" src="/logo/text-logo.png" alt="logo" width={120} height={80} priority={false}/>
            <h2 className="sb_18_24">회원가입</h2>
            <p className="me_13_20">회원가입을 위해 아래 정보를 모두 채워 주세요.</p>
            <form className="signin_form" onSubmit={handleSubmit} noValidate>
              <div className="form_group">
                <label htmlFor="email">이메일 <p className="me_16_24">*</p></label>
                <input
                  className={`form_input r_14_20 ${errors.email ? 'form_input_error' : ''}`}
                  type="email"
                  placeholder="이메일을 입력해 주세요."
                  value={email}
                  onChange={(e)=>{ setEmail(e.target.value); if (errors.email) setErrors({ ...errors, email: '' }); }}
                />
                {errors.email && <p className="error_message me_12_20">{errors.email}</p>}
              </div>
              <div className="form_group">
                <label htmlFor="name">이름 <p className="me_16_24">*</p></label>
                <input
                  className={`form_input r_14_20 ${errors.name ? 'form_input_error' : ''}`}
                  type="text"
                  placeholder="이름을 입력해 주세요."
                  value={name}
                  onChange={(e)=>{ setName(e.target.value); if (errors.name) setErrors({ ...errors, name: '' }); }}
                />
                {errors.name && <p className="error_message me_12_20">{errors.name}</p>}
              </div>
              <div className="form_group">
                <label htmlFor="password">비밀번호 <p className="me_16_24">*</p></label>
                <input
                  id="password_input"
                  className={`form_input r_14_20 ${errors.password ? 'form_input_error' : ''}`}
                  type="password"
                  placeholder="비밀번호를 입력해 주세요."
                  value={password}
                  onChange={(e)=>{ setPassword(e.target.value); if (errors.password) setErrors({ ...errors, password: '' }); }}
                />
                {errors.password && <p className="error_message me_12_20">{errors.password}</p>}
              </div>
              <div className="form_group">
                <label htmlFor="confirm">비밀번호 확인 <p className="me_16_24">*</p></label>
                <input
                  className={`form_input r_14_20 ${errors.confirm ? 'form_input_error' : ''}`}
                  type="password"
                  placeholder="비밀번호를 한번 더 입력해 주세요."
                  value={confirmPassword}
                  onChange={(e)=>{ setConfirmPassword(e.target.value); if (errors.confirm) setErrors({ ...errors, confirm: '' }); }}
                />
                {errors.confirm && <p className="error_message me_12_20">{errors.confirm}</p>}
              </div>
              <button className="submit_btn sb_18_24" type="submit" disabled={submitting}>{submitting ? '가입 중...' : '회원가입'}</button>
            {apiError && <p className="error_message me_12_20" role="alert">{apiError}</p>}
            <div className="form_footer">
              <button type="button" className="link_btn r_14_20" onClick={onClickSignin}>로그인으로</button>
            </div>
            </form>
        </div>
    </div>
);
}


