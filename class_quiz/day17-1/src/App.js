import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  let 인사 = "안녕하세요"
  const 버튼바꾸기 =() => {
    인사 = "반갑습니다"
    document.getElementById("btn").innerText = 인사
  }
  const [btn, setBtn] = useState("안녕하세요")
  
  const changeBtn = () => {
    setBtn("반갑습니다")
  }
  return (
    <>
     <button onClick={버튼바꾸기} id='btn'>{인사}</button>
     <button onClick={changeBtn}>{btn}</button>
    </>
  );
}

export default App;
