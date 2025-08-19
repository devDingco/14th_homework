import { addDiaryDom } from './displayDiary';
import { getLocalStorage } from './storageControl';
import type { TCard } from './types';

const searchDiaryEl = document.querySelector('#search-input') as HTMLInputElement;
const cardListEl = document.querySelector('.cardList')! as HTMLSpanElement;

let setTimer: number;

export const displayDiary = (data: TCard[]) => {
  cardListEl.innerHTML = '';
  data?.forEach((card: TCard) => {
    cardListEl.insertAdjacentElement('beforeend', addDiaryDom(card));
  });
  console.log(`working display`);
};

const searchFn = (e: Event) => {
  clearTimeout(setTimer);

  setTimer = setTimeout(() => {
    // const searchResult = itemList.filter((x) => x.includes(e.target.value));
    const searchResult = (e.target as HTMLInputElement).value;
    const allData = getLocalStorage();

    const filteredData = allData.filter((item: TCard) => {
      return item.title.includes(searchResult) || item.content.includes(searchResult);
    });

    displayDiary(filteredData);
  }, 3000);
};

searchDiaryEl.addEventListener('input', searchFn);
