import './storageControl';
import { getLocalStorage, initLocalStorage, setLocalStorage } from './storageControl';
import { switchTextColor } from './utils/switchTextColor';
import type { TCard } from './storageControl';
import { formatDate } from './utils/formatDate';
import './filterMenu';
import { handleCloseModal, handleOpenModal } from './modal';

// const myName = prompt("이름을 입력하세요.");
const myName = '민지';

const LogoEl = document.querySelector('.logo-text')! as HTMLSpanElement;
const CompanyEl = document.querySelector('.a')! as HTMLSpanElement;
const CeoEl = document.querySelector('.ceo')! as HTMLSpanElement;
const cardListEl = document.querySelector('.cardList')! as HTMLSpanElement;

// Form
const formEl = document.querySelector('form')! as HTMLSpanElement;
const titleInputEl = document.querySelector('#title')! as HTMLInputElement;
const contentInputEl = document.querySelector('#content')! as HTMLInputElement;
const submitDiaryBtnEl = document.querySelector('.submitDiaryBtn')! as HTMLButtonElement;
// const filterDiaryBtnEl = document.querySelector('#dropdown')! as HTMLDivElement;
const filterDiaryBtnEl = document.querySelector('.dropdown-button')! as HTMLButtonElement;
const dropdownEl = document.querySelector('.dropdown')! as HTMLSelectElement;
const dropdownMenuEl = document.querySelector('.dropdown-menu')! as HTMLSelectElement;
const dropdownMenuItemEl = document.querySelector('.dropdown-menu-item')! as HTMLSelectElement;

const selectedItemEL = document.querySelector('.selected-item') as HTMLSpanElement;
const addDiaryBtnEl = document.querySelector('.addDiaryBtn') as HTMLSpanElement;

addDiaryBtnEl.addEventListener('click', handleOpenModal);

dropdownMenuItemEl.addEventListener('click', () => {
  // const url = new URL('dqdqw/');
  // window.location.replace(url);
});

dropdownEl.addEventListener('click', () => {
  dropdownMenuEl.style.display = 'block';
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
    id: Math.floor(Math.random() * 10000),
    imgUrl: titleInputEl.value,
    state: selectedRadio.value,
    date: formatDate(),
    title: titleInputEl.value,
    content: contentInputEl.value,
  };

  // initialData.push(newData);
  setLocalStorage(newData);
  addDiaryDom(newData);
  initForm();
  submitDiaryBtnEl.disabled = true;
  submitDiaryBtnEl.classList.remove('active');

  handleCloseModal();
};

formEl.addEventListener('submit', submitForm);

const handleDeleteDiary = (e: MouseEvent) => {
  e.preventDefault();
  //
  const parentId = (e.target as HTMLElement).closest('.card')?.id;
  const prevData = getLocalStorage();

  if (parentId) {
    const filteredData = prevData.filter((data: TCard) => data.id !== parseInt(parentId));
    initLocalStorage(filteredData);
    window.location.reload();
  }

  alert('삭제되었습니다.');
};

const addDiaryDom = (props: TCard) => {
  const link = document.createElement('a');
  link.setAttribute('href', `./pages/diaryDetailPage?id=${props.id}`);
  // div
  const container = document.createElement('div');
  container.setAttribute('class', 'card');
  container.setAttribute('id', `${props.id}`);
  //
  const img = document.createElement('img');
  img.setAttribute('src', `./assets/images/${props.state} (m).png`);
  img.style = 'position: relative;';
  //
  const inner = document.createElement('div');
  inner.setAttribute('class', 'cardInfo');

  const state = document.createElement('span');
  state.innerText = props.state;
  state.style.color = switchTextColor(props.state);
  const date = document.createElement('span');
  inner.appendChild(state);
  date.innerText = props.date;
  date.style.color = `#919191`;
  inner.appendChild(date);

  const title = document.createElement('div');
  title.innerText = `${props.title.slice(0, 22)}...`;
  title.setAttribute('class', 'cardTitle');

  // 삭제버튼
  const deleteImg = document.createElement('img');
  deleteImg.setAttribute('src', './assets/icons/close_icon.svg');
  deleteImg.classList.add('deleteDiaryBtn');

  deleteImg.addEventListener('click', handleDeleteDiary);
  // deleteImg.addEventListener('click', handleDeleteDiary.bind(props.id));

  link.appendChild(container);
  container.appendChild(img);
  container.appendChild(inner);
  container.appendChild(title);
  container.appendChild(deleteImg);

  cardListEl.insertAdjacentElement('beforeend', link);

  return link;
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

const displayDiaryDom = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const selectedValue = urlParams.get('select');
  const diaryList = getLocalStorage();
  let filteredData;
  if (selectedValue === '전체') {
    filteredData = diaryList;
  } else {
    filteredData = diaryList.filter((diary: TCard) => {
      selectedItemEL.innerText = selectedValue || '전체';

      return selectedValue ? diary.state === selectedValue : true;
    });

    // 선택 감정 replace
  }

  filteredData.forEach((card: TCard) => {
    cardListEl.insertAdjacentElement('beforeend', addDiaryDom(card));
  });
};

displayDiaryDom();

// ==================== DELETE CODE ====================
// const alertFn = (index: number) => {
//   const curData = getLocalStorage();
//   const text = `
//   ${curData[index].title}
//   ${curData[index].state}
//   ${curData[index].date}
//   `;
//   // alert(text);
// };

// const modalCard = () => {
//   const CardEls = document.querySelectorAll('.cardList') as NodeListOf<HTMLDivElement>;

//   for (const [index, cardEl] of CardEls.entries()) {
//     cardEl.removeEventListener;
//     cardEl.addEventListener('click', () => alertFn(index));
//   }
// };

// modalCard();
// ==================== DELETE CODE ====================

const handleScroll = () => {
  const scrollPosition = window.scrollY;
  console.log(scrollPosition);

  if (scrollPosition > 0) {
    filterDiaryBtnEl.style.backgroundColor = '#000000';
    filterDiaryBtnEl.style.color = '#ffffff';
  } else {
    filterDiaryBtnEl.style.backgroundColor = '#ffffff';
    filterDiaryBtnEl.style.color = '#000000';
  }
};

window.addEventListener('scroll', handleScroll);
