import logo from './logo.svg';
import './App.css';
import active from './active.jpg'
import nomal from './nomal.jpg'
import { useState } from 'react';


function App() {

  const [isActive1, setIsActive1] = useState(false);
  const [isActive2, setIsActive2] = useState(false);
  const [isActive3, setIsActive3] = useState(false);
  const [isActive4, setIsActive4] = useState(false);
  const [isActive5, setIsActive5] = useState(false);

  const activeClick1 = () => {
    setIsActive1(false)
    setIsActive2(false)
    setIsActive3(false)
    setIsActive4(false)
    setIsActive5(false)
    setIsActive1(true);
  }
  const activeClick2 = () => {
    setIsActive1(false)
    setIsActive2(false)
    setIsActive3(false)
    setIsActive4(false)
    setIsActive5(false)
    setIsActive1(true);
    setIsActive2(true);
  }
  const activeClick3 = () => {
    setIsActive1(false);
    setIsActive2(false);
    setIsActive3(false);
    setIsActive4(false);
    setIsActive5(false);
    setIsActive1(true);
    setIsActive2(true);
    setIsActive3(true);
  }

  const activeClick4 = () => {
    setIsActive1(false);
    setIsActive2(false);
    setIsActive3(false);
    setIsActive4(false);
    setIsActive5(false);
    setIsActive1(true);
    setIsActive2(true);
    setIsActive3(true);
    setIsActive4(true);
  }

  const activeClick5 = () => {
    setIsActive1(false);
    setIsActive2(false);
    setIsActive3(false);
    setIsActive4(false);
    setIsActive5(false);
    setIsActive1(true);
    setIsActive2(true);
    setIsActive3(true);
    setIsActive4(true);
    setIsActive5(true);
  }

  const[점수, set점수] = useState(0);

  return (
    <div>
      <div>
        <img onClick={() => { activeClick1(); set점수(1); }} src={isActive1 === true ? active : nomal} alt="" />
        <img onClick={() => { activeClick2(); set점수(2); }} src={isActive2 === true ? active : nomal} alt="" />
        <img onClick={() => { activeClick3(); set점수(3); }} src={isActive3 === true ? active : nomal} alt="" />
        <img onClick={() => { activeClick4(); set점수(4); }} src={isActive4 === true ? active : nomal} alt="" />
        <img onClick={() => { activeClick5(); set점수(5); }} src={isActive5 === true ? active : nomal} alt="" />
      </div>
      <div>{점수}</div>
    </div>
  );
}

export default App;
