import logo from './logo.svg';
import './App.css';
import { useState } from 'react';


function App() {
  let 인증번호 = '000000'
  const 인증번호만들기 = () => {
    인증번호 = String(Math.floor(Math.random() * 1000000)).padStart(6,"0")
    document.getElementById("인증번호").innerText = 인증번호
  }
  
  const [number, setNumber] = useState("000000")
  const onChangeNumber = () => {
    setNumber(String(Math.floor(Math.random() * 1000000)).padStart(6,"0"))
  }
  
  
  return (
    <>
      <span id='인증번호'>{인증번호}</span>
      <button onClick={인증번호만들기}>인증번호전송</button>
      <span>{number}</span>
      <button onClick={onChangeNumber}>인증번호전송</button>
    </>
  );
}

export default App;
