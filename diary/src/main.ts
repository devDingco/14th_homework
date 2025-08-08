import '../assets/styles/global.css';
import '../assets/styles/header.css';
import '../assets/styles/main.css';

type TCard = {
  imgUrl: string;
  state: string;
  date: string;
  title: string;
};

const newCard: TCard[] = [
  {
    imgUrl: './assets/images/images/슬퍼요 (m).png',
    state: '슬퍼요',
    date: '2024. 03. 12',
    title: '타이틀 영역입니다. 한줄까지만 노출됩니다.',
  },
  {
    imgUrl: './assets/images/images/놀랐어요 (m).png',
    state: '놀랐어요',
    date: '2024. 03. 12',
    title: '타이틀 영역입니다. 한줄까지만 노출됩니다.',
  },
  {
    imgUrl: './assets/images/images/화나요 (m).png',
    state: '화나요',
    date: '2024. 03. 12',
    title: '타이틀 영역입니다. 한줄까지만 노출됩니다.',
  },
  {
    imgUrl: './assets/images/images/행복해요 (m).png',
    state: '행복해요',
    date: '2024. 03. 12',
    title: '타이틀 영역입니다. 한줄까지만 노출됩니다.',
  },
  {
    imgUrl: './assets/images/images/기타 (m).png',
    state: '기타',
    date: '2024. 03. 12',
    title: '타이틀 영역입니다. 한줄까지만 노출됩니다.',
  },
  {
    imgUrl: './assets/images/images/행복해요 (m).png',
    state: '행복해요',
    date: '2024. 03. 12',
    title: '타이틀 영역입니다. 한줄까지만 노출됩니다.',
  },
];

// const myName = prompt("이름을 입력하세요.");
const myName = '민지';

const LogoEl = document.querySelector('.myName')! as HTMLSpanElement;
const CompanyEl = document.querySelector('.a')! as HTMLSpanElement;
const CeoEl = document.querySelector('.ceo')! as HTMLSpanElement;
const CardEl = document.querySelector('.content_left')! as HTMLSpanElement;

// Form
const formEl = document.querySelector('form')! as HTMLSpanElement;
const titleInputEl = document.querySelector('#title')! as HTMLInputElement;
const contentInputEl = document.querySelector('#content')! as HTMLInputElement;
const submitDiaryBtnEl = document.querySelector('.submitDiaryBtn')! as HTMLButtonElement;

LogoEl.innerText = `${myName}의 다이어리`;
CompanyEl.innerText = `${myName}의 다이어리`;
CeoEl.innerText = `대표 : ${myName}`;

const initForm = () => {
  titleInputEl.value = '';
  contentInputEl.value = '';
};

const submitForm = (e: SubmitEvent) => {
  e.preventDefault(); // 폼 제출 기본 동작 방지

  const selectedRadio = document.querySelector('input[name="group"]:checked') as HTMLInputElement;

  // console.log(titleInputEl.value);
  // console.log(contentInputEl.value);
  // console.log(selectedRadio.value);
  console.log('submit!');
  const newData = {
    imgUrl: titleInputEl.value,
    state: selectedRadio.value,
    date: `2025. 08. 07`,
    title: titleInputEl.value,
    content: contentInputEl.value,
  };

  console.log(newData);

  newCard.push(newData);
  addDiaryDom(newData);
  initForm();
  submitDiaryBtnEl.disabled = true;
  submitDiaryBtnEl.classList.remove('active');

  console.log(newCard);
};

formEl.addEventListener('submit', submitForm);

/**
 * <div class="card">
 *   <img src="./assets/images/images/행복해요 (m).png" alt="" />
 *   <div class="cardInfo">
 *     <span style="color: #ea5757">행복해요</span>
 *     <span style="color: #919191">2024. 03. 12</span>
 *   </div>
 *   <div class="cardTitle">타이틀 영역입니다. 한줄까지만 노출됩니다.</div>
 * </div>
 */
const addDiaryDom = (props: TCard) => {
  // div
  const container = document.createElement('div');
  container.setAttribute('class', 'card');
  //
  const img = document.createElement('img');
  img.setAttribute('src', `./assets/images/images/${props.state} (m).png`);
  //
  const inner = document.createElement('div');
  inner.setAttribute('class', 'cardInfo');

  const state = document.createElement('span');
  state.innerText = props.state;
  const date = document.createElement('span');
  inner.appendChild(state);
  date.innerText = '2025. 08. 07';
  // state.setAttribute('innerText', '2025. 08. 07');
  inner.appendChild(date);

  const title = document.createElement('div');
  title.innerText = props.title;
  title.setAttribute('class', 'cardTitle');

  container.appendChild(img);
  container.appendChild(inner);
  container.appendChild(title);
  CardEl.insertAdjacentElement('beforeend', container);

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
  const text = `
  ${newCard[index].title}
  ${newCard[index].state}
  ${newCard[index].date}
  `;
  alert(text);
};

const modalCard = () => {
  const CardEls = document.querySelectorAll('.card') as NodeListOf<HTMLDivElement>;

  for (const [index, cardEl] of CardEls.entries()) {
    cardEl.removeEventListener;
    cardEl.addEventListener('click', () => alertFn(index));
  }
};

modalCard();
