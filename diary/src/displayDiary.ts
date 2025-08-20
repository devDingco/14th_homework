const selectedItemEL = document.querySelector('.selected-item') as HTMLSpanElement;
const cardListEl = document.querySelector('.cardList')! as HTMLSpanElement;
const pageBtnEl = document.querySelector('#pageBtnContainer')! as HTMLSpanElement;
const prevBtnEl = document.querySelector('#prevBtn')! as HTMLSpanElement;
const nextBtnEl = document.querySelector('#nextBtn')! as HTMLSpanElement;

import { dummyData } from './data/dummyData';
import { displayDiary } from './searchDiary';
import { getLocalStorage, initLocalStorage } from './storageControl';
import type { TCard } from './types';
import { switchTextColor } from './utils/switchTextColor';

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

export const addDiaryDom = (props: TCard) => {
  const link = document.createElement('a');
  link.setAttribute('href', `/pages/diaryDetailPage.html?id=${props.id}`);
  // div
  const container = document.createElement('div');
  container.setAttribute('class', 'card');
  container.setAttribute('id', `${props.id}`);
  //
  const img = document.createElement('img');
  img.setAttribute('src', `/images/${props.state} (m).png`);
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
  title.innerText = `${props.title}`;
  title.setAttribute('class', 'cardTitle');

  // 삭제버튼
  const deleteImg = document.createElement('img');
  deleteImg.setAttribute('src', './icons/close_icon.svg');
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

// =============================================================
// =============================================================
// =============================================================

export const getParams = (query: string, defaultValue: string) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const pageNum = urlParams.get(query) || defaultValue;
  return pageNum;
};

const dataSlice = (page: number) => {
  const allData = getLocalStorage();
  const startNum = 12 * (page - 1);
  const endNum = 12 * page;

  const sliceData = allData.slice(startNum, endNum);

  return sliceData;
};

export const displayDiaryDom = () => {
  const pageNum = getParams('page', '1');
  const selectedValue = getParams('select', '전체');
  console.log(pageNum, selectedValue);
  // const urlParams = new URLSearchParams(window.location.search);
  // const selectedValue = urlParams.get('select');
  // const diaryList = getLocalStorage();
  const slicedData = dataSlice(parseInt(pageNum));
  console.log(slicedData);

  let filteredData;
  if (selectedValue === '전체') {
    filteredData = slicedData;
  } else {
    filteredData = slicedData?.filter((diary: TCard) => {
      selectedItemEL.innerText = selectedValue || '전체';

      return selectedValue ? diary.state === selectedValue : true;
    });
  }

  displayDiary(filteredData);
};

displayDiaryDom();

// =============================================================
// =============================================================
// =============================================================

let startPage = 1;
let maxData = Math.max(getLocalStorage().length, dummyData.length);
console.log(`maxData: ${maxData}`);
let endPage = Math.ceil(maxData / 12);

const navPage = (pageNum: number) => {
  const url = new URL(window.location.href);
  url.searchParams.set('page', pageNum.toString());
  window.location.href = url.toString();
};
(window as any).navPage = navPage;

const displayPageBtn = (startPage: number) => {
  const currPage = parseInt(getParams('page', '1'));
  console.log(`run ${startPage}`);

  pageBtnEl.innerHTML = '';

  const maxBtn = Math.min(startPage + 4, endPage);
  console.log(`maxBtn: ${maxBtn}`);

  for (let i = startPage; i <= maxBtn; i++) {
    const pageBtn = document.createElement('span');
    pageBtn.setAttribute('class', 'pageBtn');
    if (currPage === i) {
      pageBtn.classList.add('navActive');
    }
    pageBtn.innerText = `${i}`;
    pageBtn.addEventListener('click', () => {
      navPage(i);
    });
    pageBtnEl.insertAdjacentElement('beforeend', pageBtn);
  }
};

const initPageBtn = () => {
  const currPage = parseInt(getParams('page', '1'));
  startPage = Math.floor((currPage - 1) / 5) * 5 + 1; // ex: 7페이지 → 6~10
  displayPageBtn(startPage);
};

initPageBtn();

const prevPage = () => {
  if (startPage <= 1) {
    return;
  }
  startPage -= 5;
  console.log(startPage, endPage);
  navPage(startPage);
  displayPageBtn(startPage);
};
const nextPage = () => {
  startPage += 5;
  console.log(startPage, endPage);
  if (startPage > endPage) {
    return;
  }
  navPage(startPage);
  displayPageBtn(startPage);
};

prevBtnEl.addEventListener('click', prevPage);
nextBtnEl.addEventListener('click', nextPage);
