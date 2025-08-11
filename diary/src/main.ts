import '../assets/styles/global.css';
import '../assets/styles/header.css';
import '../assets/styles/main.css';
import '../assets/styles/detail.css';
import './storageControl';
import { getLocalStorage, setLocalStorage } from './storageControl';
import { switchTextColor } from './utils/switchTextColor';
import type { TCard } from './storageControl';

// const myName = prompt("이름을 입력하세요.");
const myName = '민지';

const LogoEl = document.querySelector('.myName')! as HTMLSpanElement;
const CompanyEl = document.querySelector('.a')! as HTMLSpanElement;
const CeoEl = document.querySelector('.ceo')! as HTMLSpanElement;
const cardListEl = document.querySelector('.cardList')! as HTMLSpanElement;

// Form
const formEl = document.querySelector('form')! as HTMLSpanElement;
const titleInputEl = document.querySelector('#title')! as HTMLInputElement;
const contentInputEl = document.querySelector('#content')! as HTMLInputElement;
const submitDiaryBtnEl = document.querySelector('.submitDiaryBtn')! as HTMLButtonElement;

// const cardListEl = document.querySelector('.cardList')! as HTMLButtonElement;

LogoEl.innerText = `${myName}의 다이어리`;
CompanyEl.innerText = `${myName}의 다이어리`;
CeoEl.innerText = `대표 : ${myName}`;

const initForm = () => {
  titleInputEl.value = '';
  contentInputEl.value = '';
};

const submitForm = (e: SubmitEvent) => {
  e.preventDefault();

  const selectedRadio = document.querySelector('input[name="group"]:checked') as HTMLInputElement;

  const newData: TCard = {
    id: Math.floor(Math.random() * 10000),
    imgUrl: titleInputEl.value,
    state: selectedRadio.value,
    date: `2025. 08. 07`,
    title: titleInputEl.value,
    content: contentInputEl.value,
  };

  // initialData.push(newData);
  setLocalStorage(newData);
  addDiaryDom(newData);
  initForm();
  submitDiaryBtnEl.disabled = true;
  submitDiaryBtnEl.classList.remove('active');
};

formEl.addEventListener('submit', submitForm);

const addDiaryDom = (props: TCard) => {
  const link = document.createElement('a');
  link.setAttribute('href', `./pages/diaryDetailPage?id=${props.id}`);
  // div
  const container = document.createElement('div');
  container.setAttribute('class', 'card');
  //
  const img = document.createElement('img');
  img.setAttribute('src', `./assets/images/${props.state} (m).png`);
  //
  const inner = document.createElement('div');
  inner.setAttribute('class', 'cardInfo');

  const state = document.createElement('span');
  state.innerText = props.state;
  state.style.color = switchTextColor(props.state);
  const date = document.createElement('span');
  inner.appendChild(state);
  date.innerText = '2025. 08. 07';
  date.style.color = `#919191`;
  inner.appendChild(date);

  const title = document.createElement('div');
  title.innerText = `${props.title.slice(0, 22)}...`;
  title.setAttribute('class', 'cardTitle');

  link.appendChild(container);
  container.appendChild(img);
  container.appendChild(inner);
  container.appendChild(title);
  cardListEl.insertAdjacentElement('beforeend', link);

  modalCard();
};

const checkInput = () => {
  const istitle = titleInputEl.value.trim() !== '';
  const iscontent = contentInputEl.value.trim() !== '';

  istitle ? titleInputEl.classList.remove('invalidInput') : titleInputEl.classList.add('invalidInput');
  iscontent ? contentInputEl.classList.remove('invalidInput') : contentInputEl.classList.add('invalidInput');

  if (istitle && iscontent) {
    submitDiaryBtnEl.classList.add('active');
    submitDiaryBtnEl.disabled = false;
  } else {
    submitDiaryBtnEl.classList.remove('active');
    submitDiaryBtnEl.disabled = true;
  }
};

titleInputEl.addEventListener('input', checkInput);
contentInputEl.addEventListener('input', checkInput);

const alertFn = (index: number) => {
  const curData = getLocalStorage();
  const text = `
  ${curData[index].title}
  ${curData[index].state}
  ${curData[index].date}
  `;
  // alert(text);
};

const modalCard = () => {
  const CardEls = document.querySelectorAll('.cardList') as NodeListOf<HTMLDivElement>;

  for (const [index, cardEl] of CardEls.entries()) {
    cardEl.removeEventListener;
    cardEl.addEventListener('click', () => alertFn(index));
  }
};

modalCard();

const displayDiaryDom = () => {
  const diaryList = getLocalStorage();

  // diaryList.forEach((card: TCard) => {
  //   addDiaryDom(card);
  // });

  const displayDom = diaryList.map((card: TCard) => {
    addDiaryDom(card);
  });

  cardListEl.insertAdjacentElement('beforeend', displayDom);
};

displayDiaryDom();
