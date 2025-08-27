import logo from './logo.svg';
import './App.css';
import { useState } from 'react';


function App() {
  let 카운트 = 0
  const 카운트증가 = () =>{
    카운트 += 1
    document.getElementById("count").innerText = 카운트
  }

  const [count, setCount] = useState(0)
  
  const onChangeCount = () => {
    setCount(count + 1)   
  }

  return (
    <>
    <span id='count'>{카운트}</span>
    <button onClick={카운트증가}>카운트증가</button>
    <span>{count}</span>
    <button onClick={onChangeCount}>카운트증가</button>
    </>
  );
}

export default App;
