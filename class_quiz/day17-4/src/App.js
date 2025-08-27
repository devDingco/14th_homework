import logo from './logo.svg';
import './App.css';
import { useState } from 'react';


function App() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState(0)
  const [passwordCheck, setPasswordCheck] = useState(0)

  const [errorEmail, setErrorEmail] = useState("")
  const [errorPassword, setErrorPassword] = useState("")

  const onChangeEmail = (event) =>{
    setEmail(event.target.value)
    if (!event.target.value.includes("@")){
      setErrorEmail("@를 입력하세요")
    }else{setErrorEmail("")}
  }
  const onChangePassword =(event) =>{
    setPassword(event.target.value)
    if(event.target.value !== passwordCheck){
      setErrorPassword("비밀번호를 확인해주세요")
    }else{setErrorPassword("")}
  }
  const onChangePasswordCheck = (event) =>{
    setPasswordCheck(event.target.value)
    if(password !== event.target.value){
      setErrorPassword("비밀번호를 확인해주세요")
    }else{setErrorPassword("")}
  }
  
  return (
    <>
      <input onChange={onChangeEmail} type="email"/>
      <div className='error'>{errorEmail}</div>
      <input onChange={onChangePassword} type="password"/>
      <div className='error'>{errorPassword}</div>
      <input onChange={onChangePasswordCheck} type="password"/>
      <div className='error'>{errorPassword}</div>
      <button>가입하기</button>
    </>
  );
}

export default App;
