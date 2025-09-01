import './App.css'
import { useState } from 'react'
import rectangleIcon from './assets/Rectangle 1.svg'
import closeIcon from './assets/close-icon.svg'
import kakaoIcon from './assets/kakao-icon.svg'
function App() {
  const [email, setEmail] = useState('000000')
  const [password, setPassword] = useState('000000')

  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const handleChangeEmail = (event) => {
    setEmail(event.target.value)
  }
  const handleChangePassword = (event) => {
    setPassword(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!email.includes('@')) setEmailError('이메일에 @가 없습니다.')
    else setEmailError('')

    if (password.length < 8) setPasswordError('8-16자의 영문, 숫자, 특수 문자만 사용 가능합니다.')
    else setPasswordError('')
  }

  return (
    <div className="App">
      <div className="main-icons">
        <img src={rectangleIcon} />
      </div>
      <h1>잇츠로드</h1>
      <form onSubmit={handleSubmit}>
        <div className="signIn-input-group">
          <div className="signIn-input">
            <input placeholder="simplelife@gmail.com" type="text" onChange={handleChangeEmail} />
            <img src={closeIcon} />
          </div>
          <span className="error-message">{emailError}</span>
        </div>
        <div className="signIn-input-group">
          <div className="signIn-input">
            <input placeholder="●●●●●●●●" type="password" onChange={handleChangePassword} />
            <img src={closeIcon} />
          </div>
          <span className="error-message">{passwordError}</span>
        </div>
        <button className="pink-btn" type="submit">
          로그인
        </button>
        <div className="extra-actions">
          <p>이메일 찾기</p>|<p>비밀번호 찾기</p>|<p>회원가입</p>
        </div>
        <button className="yellow-btn" type="submit">
          <img src={kakaoIcon} />
          카카오톡으로 로그인
        </button>
      </form>
    </div>
  )
}

export default App
