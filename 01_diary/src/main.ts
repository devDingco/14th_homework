import './filterMenu';
import './dataStorage';
import './tabs';
import { setLocalStorage } from './dataStorage';

import { formatDate } from './utils/utils';

// import { handleCloseModal, handleOpenModal } from './modal';
import { handleOpenModal } from './modal';
import { addDiaryDom } from './displayDiary';
import type { TCard } from './types';
// import './setDummyData';

// const myName = prompt("이름을 입력하세요.");
const myName = '민지';

const LogoEl = document.querySelector('.logo-text')! as HTMLSpanElement;
const CompanyEl = document.querySelector('.a')! as HTMLSpanElement;
const CeoEl = document.querySelector('.ceo')! as HTMLSpanElement;

// Form
const formEl = document.querySelector('form')! as HTMLSpanElement;
const titleInputEl = document.querySelector('#title')! as HTMLInputElement;
const contentInputEl = document.querySelector('#content')! as HTMLInputElement;
const submitDiaryBtnEl = document.querySelector('.submitDiaryBtn')! as HTMLButtonElement;
// const filterDiaryBtnEl = document.querySelector('#dropdown')! as HTMLDivElement;
const filterDiaryBtnEl = document.querySelector('.dropdown-button')! as HTMLButtonElement;
const dropdownEl = document.querySelector('.dropdown-diary')! as HTMLSelectElement;
const dropdownMenuEl = document.querySelector('.dropdown-menu')! as HTMLSelectElement;
// const dropdownMenuItemEl = document.querySelector('.dropdown-menu-item')! as HTMLSelectElement;

const imgDropdownMenuEl = document.querySelector('.dropdown-img')! as HTMLSelectElement;
const imgDropdownMenuItemEl = document.querySelector('.img-dropdown-menu')! as HTMLSelectElement;

const addDiaryBtnEl = document.querySelector('.addDiaryBtn') as HTMLSpanElement;

addDiaryBtnEl.addEventListener('click', handleOpenModal);

dropdownEl.addEventListener('click', () => {
  dropdownMenuEl.style.display = 'block';
});

imgDropdownMenuEl.addEventListener('click', () => {
  imgDropdownMenuItemEl.style.display = 'block';
});

// filterDiaryBtnEl.addEventListener('click', () => {
//   const selectedValue = (e.target as HTMLSelectElement).value;
//   console.log(selectedValue);
// });

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
    // TODO: formEl.elements 찍어보기
    id: Math.floor(Math.random() * 10000),
    imgUrl: titleInputEl.value,
    category: selectedRadio.value,
    date: formatDate(),
    title: titleInputEl.value,
    content: contentInputEl.value,
    comments: [],
  };

  setLocalStorage(newData);
  addDiaryDom(newData);
  initForm();
  submitDiaryBtnEl.disabled = true;
  submitDiaryBtnEl.classList.remove('active');

  // handleCloseModal();
};

formEl.addEventListener('submit', submitForm);

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

const handleScroll = () => {
  const scrollPosition = window.scrollY;

  if (scrollPosition > 0) {
    filterDiaryBtnEl.style.backgroundColor = '#000000';
    filterDiaryBtnEl.style.color = '#ffffff';
  } else {
    filterDiaryBtnEl.style.backgroundColor = '#ffffff';
    filterDiaryBtnEl.style.color = '#000000';
  }
};

window.addEventListener('scroll', handleScroll);
