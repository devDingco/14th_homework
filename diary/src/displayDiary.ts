const selectedItemEL = document.querySelector('.selected-item') as HTMLSpanElement;
const cardListEl = document.querySelector('.cardList')! as HTMLSpanElement;

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
  title.innerText = `${props.title.slice(0, 22)}...`;
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

export const displayDiaryDom = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const selectedValue = urlParams.get('select');
  const diaryList = getLocalStorage();
  let filteredData;
  if (selectedValue === '전체') {
    filteredData = diaryList;
  } else {
    filteredData = diaryList?.filter((diary: TCard) => {
      selectedItemEL.innerText = selectedValue || '전체';

      return selectedValue ? diary.state === selectedValue : true;
    });
  }

  displayDiary(filteredData);
};

displayDiaryDom();
