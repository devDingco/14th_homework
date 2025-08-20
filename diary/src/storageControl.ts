import { dummyData } from './data/dummyData';
import type { TCard } from './types';

const emptyDiaryEl = document.querySelector('.empty-diary') as HTMLSpanElement;
const cardContainerEl = document.querySelector('.cardContainer')! as HTMLSpanElement;

export const initialData: TCard[] = [];

// 더미데이터 설정
localStorage.setItem('myDiary', JSON.stringify(dummyData));

// 초기데이터 설정
export const initLocalStorage = (data: TCard[]) => {
  const convertString = JSON.stringify(data);
  localStorage.setItem('myDiary', convertString);
};

export const getLocalStorage = () => {
  const myDiary = localStorage.getItem('myDiary')!;
  const parseString = JSON.parse(myDiary);

  if (!myDiary) {
    emptyDiaryEl.style.display = 'flex';
  } else {
    cardContainerEl.style.display = 'grid';
  }

  return parseString;
};

export const setLocalStorage = (newData: TCard) => {
  // 데이터 추가
  const prevData: TCard[] = getLocalStorage();
  let updateData: TCard[];

  if (!prevData) {
    updateData = [newData];
  } else {
    updateData = [...prevData, newData];
  }

  const convertString = JSON.stringify(updateData);
  localStorage.setItem('myDiary', convertString);
};

export const fetchDogData = async (): Promise<string[]> => {
  console.log('Run fetchDogData');
  // await setTime;

  const res = await fetch('https://dog.ceo/api/breeds/image/random/10');
  const data = await res.json();
  return data.message;
};

export const getLocalStorageDetail = () => {
  const myDiary = localStorage.getItem('myDiary')!;
  const parseString = JSON.parse(myDiary);

  return parseString;
};

//
//
//
