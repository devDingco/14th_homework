const TIME_LIMIT = 10;

import * as El from './dom';
import { randomCode } from './utils/utils';

// validation

// import './style.css'
// console.log('main.ts');
// import { requestAuthCodeBtnEl } from './dom';
import './inputValidation';

// setTimeout(() => {
//   console.log('run funciton');
// }, 1000 * 3);

// let seconds = 0;
// setInterval(() => {
//   seconds++;
//   console.log(seconds);
// }, 1000 * 2);

let time = TIME_LIMIT;
const calTimer = (timer: number): void => {
  const mins = Math.floor(timer / 60);
  const seconds = timer % 60;
  const strSeconds = seconds.toString().padStart(2, '0');
  const resultText = `${mins}분 ${strSeconds}초`;
  // console.log(`${mins}분 ${strSeconds}초`);
  El.displayTimerEl.innerHTML = resultText;
  // return `${mins}분 ${strSeconds}초`;
};

let authCode: string;
El.requestAuthCodeBtnEl.onclick = () => {
  authCode = randomCode();
  alert(`인증번호: ${authCode}`);
  El.requestAuthCodeBtnEl.disabled = true;

  const intervalId = setInterval(() => {
    calTimer(time);
    time--;
    if (time < 0) {
      authCode = '';
      time = TIME_LIMIT;
      calTimer(TIME_LIMIT);
      El.requestAuthCodeBtnEl.disabled = false;
      clearInterval(intervalId);
    }
  }, 1000);

  setTimeout(() => {
    El.requestAuthCodeBtnEl.disabled = false;
  }, 1000 * 60 * 3);
  // intervalId;
};

const isInput = () => {
  const isEmail = El.emailInputEl.value.trim() !== '';
  const isName = El.nameInputEl.value.trim() !== '';
  const ismale = El.maleRatioInputEl.checked;
  const isfemale = El.femaleRatioInputEl.checked;
  const isAgreeCheckEl = El.agreeCheckEl.checked;

  console.log(isEmail, ismale, isfemale, isAgreeCheckEl);
  console.log(!isName);

  if (!isName) {
    El.nameInputEl.classList.add('invalidInput');
  } else {
    El.nameInputEl.classList.remove('invalidInput');
  }

  if (isEmail && (ismale || isfemale) && isAgreeCheckEl) {
    El.joinBtnEl.disabled = false;
  } else {
    El.joinBtnEl.disabled = true;
  }
};

// 회원가입
const signUp = () => {
  const validEmail = El.emailInputEl.value.includes('@');

  validEmail ? alert('회원가입완료') : alert('@@@@@@@@@@@@@@@@@@@@');
};

// 6자리 코드인증
const authCodeCheck = () => {
  const userAuthCodeInput = El.authCodeInputEl.value;
  if (userAuthCodeInput === authCode) {
    alert('인증성공');
  } else {
    alert('인증실패');
  }

  El.authCodeInputEl.value = '';
};

El.nameInputEl.addEventListener('input', isInput);
El.emailInputEl.addEventListener('input', isInput);
El.maleRatioInputEl.addEventListener('input', isInput);
El.femaleRatioInputEl.addEventListener('input', isInput);
El.agreeCheckEl.addEventListener('input', isInput);
El.joinBtnEl.addEventListener('click', signUp);

// authCode

El.authCodeBtnEl.addEventListener('click', authCodeCheck);

// El.nameInputEl.classList.add('invalidInput');
// El.emailInputEl.classList.add('invalidInput');
