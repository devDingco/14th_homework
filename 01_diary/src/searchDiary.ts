import { addDiaryDom } from './displayDiary';
import { getData, setParams } from './dataStorage';
import type { TCard } from './types';

const searchDiaryEl = document.querySelector('#search-input') as HTMLInputElement;
const cardListEl = document.querySelector('.cardList')! as HTMLSpanElement;

let setTimer: number;

export const displayDiary = (data: TCard[]) => {
  cardListEl.innerHTML = '';
  console.log(data);
  data?.forEach((card: TCard) => {
    cardListEl.insertAdjacentElement('beforeend', addDiaryDom(card));
  });
  console.log(`working display`);
};

const searchFn = (e: Event) => {
  e.preventDefault();
  clearTimeout(setTimer);

  setTimer = setTimeout(() => {
    const searchParams = (e.target as HTMLInputElement).value;
    setParams('q', searchParams);
  }, 500);

  getData();
};

searchDiaryEl.addEventListener('input', searchFn);
