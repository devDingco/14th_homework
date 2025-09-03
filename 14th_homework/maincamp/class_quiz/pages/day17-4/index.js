const App = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [checkPw, setCheckPw] = React.useState('');

  const [errors, setErrors] = React.useState({
    email: '',
    password: '',
    checkPw: '',
  });

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
    if (errors.email) setErrors((prev) => ({ ...prev, password: '' }));
  };
  const onChangeCheckPw = (e) => {
    setCheckPw(e.target.value);
    if (errors.email) setErrors((prev) => ({ ...prev, checkPw: '' }));
  };

  const onClickSignIn = () => {
    const nextErrors = { ...errors };

    if (!email.includes('@')) {
      nextErrors.email = '이메일에 @가 없습니다.';
    } else {
      nextErrors.email = '';
    }

    if (password !== checkPw) {
      const msg = '비밀번호가 일치하지 않습니다.';
      nextErrors.password = msg;
      nextErrors.checkPw = msg;
    } else {
      nextErrors.password = '';
      nextErrors.checkPw = '';
    }

    setErrors(nextErrors);

    const hasError = Object.values(nextErrors).some((v) => v);
    if (!hasError) {
      alert('회원가입 입력이 가능합니다!');
    }
  };

  return (
    <>
      <div>
        <input
          type="email"
          placeholder="이메일을 입력해 주세요."
          value={email}
          onChange={onChangeEmail}
        />
        {errors.email && <span>{errors.email}</span>}
      </div>

      <br />
      <div>
        <input
          type="password"
          placeholder="비밀번호를 입력해 주세요."
          value={password}
          onChange={onChangePassword}
        />
        {errors.password && <span>{errors.password}</span>}
      </div>
      <br />
      <div>
        <input
          type="password"
          placeholder="비밀번호를 확인해 주세요."
          value={checkPw}
          onChange={onChangeCheckPw}
        />
        {errors.checkPw && <span>{errors.checkPw}</span>}
      </div>

      <br />
      <button onClick={onClickSignIn}>가입하기</button>
    </>
  );
};
