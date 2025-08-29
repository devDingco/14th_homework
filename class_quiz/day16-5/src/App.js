import './App.css'
import { useState } from 'react'
import rectangleIcon from './assets/Rectangle 1.svg'
import closeIcon from './assets/close-icon.svg'
import kakaoIcon from './assets/kakao-icon.svg'
function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const handleChange = () => {}
  return (
    <div className="App">
      <div className="main-icons">
        <img src={rectangleIcon} />
      </div>
      <h1>잇츠로드</h1>
      <form>
        <div className="signIn-input-group">
          <div className="signIn-input">
            <input value="simplelife@gmail.com" type="text" />
            <img src={closeIcon} />
          </div>
          <span className="error-message">이메일 주소를 다시 확인해주세요.</span>
        </div>
        <div className="signIn-input-group">
          <div className="signIn-input">
            <input value="●●●●●●●●" type="password" />
            <img src={closeIcon} />
          </div>
          <span className="error-message">8~16자의 영문, 숫자, 특수 문자만 사용 가능합니다.</span>
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
