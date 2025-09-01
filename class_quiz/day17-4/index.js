const App = () => {
  const [email, setEmail] = React.useState('000000')
  const [password, setPassword] = React.useState('000000')
  const [confirmPassword, setConfirmPassword] = React.useState('000000')

  const [emailError, setEmailError] = React.useState('')
  // const [passwordError, setPasswordError] = React.useState('')
  const [confirmPasswordError, setConfirmPasswordError] = React.useState('')

  const handelChangeEmail = (event) => {
    setEmail(event.target.value)
  }
  const handelChangePassword = (event) => {
    setPassword(event.target.value)
  }
  const handelChangeConfirmPassword = (event) => {
    setConfirmPassword(event.target.value)
  }
  const handleSubmit = () => {
    if (!email.includes('@')) setEmailError('이메일에 @가 없습니다.')
    else setEmailError('')

    if (password !== confirmPassword) setConfirmPasswordError('비밀번호와 입력값이 다릅니다.')
    else setConfirmPasswordError('')
  }

  return (
    <div>
      {/* 이메일 */}
      <div>
        <label htmlFor="이메일">이메일</label>
        <input id="이메일" onChange={handelChangeEmail} />
        <div className="error-message">{emailError}</div>
      </div>
      {/* 비밀번호 */}
      <div>
        <label htmlFor="비밀번호">비밀번호</label>
        <input id="비밀번호" onChange={handelChangePassword} />
        {/* <div className="error-message">{passwordError}</div> */}
      </div>
      {/* 비밀번호 확인 */}
      <div>
        <label htmlFor="비밀번호확인">비밀번호확인</label>
        <input id="비밀번호확인" onChange={handelChangeConfirmPassword} />
        <div className="error-message">{confirmPasswordError}</div>
      </div>
      <button onClick={handleSubmit}>가입하기</button>
    </div>
  )
}
