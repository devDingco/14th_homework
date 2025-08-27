// const selectedItemEL = document.querySelector('.selected-item') as HTMLSpanElement;
const cardListEl = document.querySelector('.cardList')! as HTMLSpanElement;
const pageBtnEl = document.querySelector('#pageBtnContainer')! as HTMLSpanElement;
const prevBtnEl = document.querySelector('#prevBtn')! as HTMLSpanElement;
const nextBtnEl = document.querySelector('#nextBtn')! as HTMLSpanElement;

import { displayDiary } from './searchDiary';
import { getData, getParams, handleDeleteDiary, setParams } from './dataStorage';
import type { TCard } from './types';
import { switchTextColor } from './utils/utils';

export const addDiaryDom = (props: TCard) => {
  const link = document.createElement('a');
  link.setAttribute('href', `/pages/diaryDetailPage.html?id=${props.id}`);
  // div
  const container = document.createElement('div');
  container.setAttribute('class', 'card');
  container.setAttribute('id', `${props.id}`);
  //
  const img = document.createElement('img');
  img.setAttribute('src', `/images/${props.category} (m).png`);
  img.style = 'position: relative;';
  //
  const inner = document.createElement('div');
  inner.setAttribute('class', 'cardInfo');

  const category = document.createElement('span');
  category.innerText = props.category;
  category.style.color = switchTextColor(props.category);
  const date = document.createElement('span');
  inner.appendChild(category);
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

// export const getParams = (query: string, defaultValue: string) => {
//   const queryString = window.location.search;
//   const urlParams = new URLSearchParams(queryString);
//   const pageNum = urlParams.get(query) || defaultValue;
//   return pageNum;
// };

export const displayDiaryDom = () => {
  const data = getData();
  // const pageNum = getParams('page', '1');
  // const selectedValue = getParams('category', '');
  // console.log(pageNum, selectedValue);
  // // const urlParams = new URLSearchParams(window.location.search);
  // // const selectedValue = urlParams.get('select');
  // // const diaryList = getLocalStorage();
  // // const slicedData = dataSlice(parseInt(pageNum));
  // const slicedData = getData();
  // console.log(slicedData);

  // let filteredData;
  // if (selectedValue === '') {
  //   filteredData = slicedData;
  // } else {
  //   filteredData = slicedData?.filter((diary: TCard) => {
  //     selectedItemEL.innerText = selectedValue || '';

  //     return selectedValue ? diary.category === selectedValue : true;
  //   });
  // }

  displayDiary(data.data);
};

displayDiaryDom();


// =============================================================
// =============================================================
// =============================================================

// let maxData = getData().maxPage;
let endPage = getData().maxPage;

const navPage = (pageNum: number) => {
  const url = new URL(window.location.href);
  url.searchParams.set('page', pageNum.toString());
  window.location.href = url.toString();
};
(window as any).navPage = navPage;

let startPage = 1;
const displayPageBtn = (startPage: number) => {
  // 현재페이지
  let { currentPage, maxPage } = getData();

  pageBtnEl.innerHTML = '';

  const maxBtn = Math.min(startPage + 4, maxPage);

  for (let i = startPage; i <= maxBtn; i++) {
    const pageBtn = document.createElement('span');
    pageBtn.setAttribute('class', 'pageBtn');
    if (currentPage === i) {
      pageBtn.classList.add('navActive');
    }
    pageBtn.innerText = `${i}`;
    pageBtn.addEventListener('click', () => {
      navPage(i);
      // setParams('page', i.toString());
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
  console.log(startPage, endPage);
  const checkPage = startPage + 5;
  if (checkPage > endPage) {
    console.log(startPage, endPage);
    return;
  }

  startPage += 5;
  navPage(startPage);
  setParams('page', startPage.toString());
  displayPageBtn(startPage);
};

prevBtnEl.addEventListener('click', prevPage);
nextBtnEl.addEventListener('click', nextPage);
