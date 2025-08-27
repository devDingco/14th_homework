import type { TCard, TComment } from './types';
import { dummyData } from './data/dummyData';

// ==================== const define ====================
const PAGE_SIZE = 12;

// ==================== query params ====================
export const getParams = (query: string, defaultValue: string) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const pageNum = urlParams.get(query) || defaultValue;
  return pageNum;
};

export const setParams = (query: string, value: string) => {
  const url = new URL(window.location.href);
  url.searchParams.set(query, value);
  // window.location.href = url.toString();

  window.history.replaceState({}, '', url.toString());
};

// 초기데이터 설정
export const initLocalStorage = () => {
  if (!localStorage.getItem('myDiary')) {
    console.log('none');
    const convertString = JSON.stringify(dummyData);
    localStorage.setItem('myDiary', convertString);
  }

  // const initialData: TCard[] = [];

  // 더미데이터 설정
  // const convertString = JSON.stringify(initialData);
};
initLocalStorage();

// 데이터 가져오기
export const getData = () => {
  const response = localStorage.getItem('myDiary')!;
  const rawData = JSON.parse(response);
  let resultData = rawData;
  const query = getParams('q', '');
  const category = getParams('category', '');
  const page = +getParams('page', '1');

  // 쿼리 필터
  if (query) {
    resultData = rawData.filter((item: TCard) => {
      return item.title.includes(query) || item.content.includes(query);
    });
  }
  console.log(`쿼리: ${resultData.length}`);

  // 카테고리 필터
  if (category) {
    resultData = resultData.filter((item: TCard) => {
      if (category === '전체') {
        return item;
      }
      return item.category === category;
    });
  }

  const maxPage = Math.ceil(resultData.length / PAGE_SIZE);
  console.log(`카테고리: ${resultData.length}`);

  // 페이지 필터
  if (page) {
    const startNum = PAGE_SIZE * (page - 1);
    const endNum = PAGE_SIZE * page;
    const sliceData = resultData.slice(startNum, endNum);
    resultData = sliceData;
  }
  console.log(`검색결과: `, resultData);

  const result = {
    maxPage,
    currentPage: page,
    data: resultData,
  };

  console.log(result);

  return result;
};

getData();
// const emptyDiaryEl = document.querySelector('.empty-diary') as HTMLSpanElement;
// const cardContainerEl = document.querySelector('.cardContainer')! as HTMLSpanElement;

export const getLocalStorage = () => {
  const myDiary = localStorage.getItem('myDiary')!;
  console.log(myDiary);
  const parseString = JSON.parse(myDiary);
  return parseString;
};

// 데이터 추가
export const setLocalStorage = (newData: TCard) => {
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

// 댓글 추가
export const addDiary = (newComment: TComment) => {
  console.log(newComment.id);
  const data = getLocalStorage();

  const updateData = data.map((item: TCard) => {
    if (item.id === newComment.id) {
      return {
        ...item,
        comments: [...item.comments, newComment],
      };
    }
    return item;
  });

  console.log(updateData);

  localStorage.setItem('myDiary', JSON.stringify(updateData));
};
// addDiary({ id: 280, comment: 'test comment', date: '2023-10-01' });

export const getLocalStorageDetail = () => {
  const myDiary = localStorage.getItem('myDiary')!;
  console.log(myDiary);
  const parseString = JSON.parse(myDiary);

  return parseString;
};

// 데이터 삭제 - main
export const handleDeleteDiary = (e: MouseEvent) => {
  e.preventDefault();
  //
  const parentId = (e.target as HTMLElement).closest('.card')?.id;
  const prevData = getLocalStorage();

  if (parentId) {
    const filteredData = prevData.filter((data: TCard) => data.id !== parseInt(parentId));
    const convertString = JSON.stringify(filteredData);
    localStorage.setItem('myDiary', convertString);
    window.location.reload();
  }

  alert('삭제되었습니다.');
};

// 데이터 삭제 - detail
export const handleDeleteDiaryDetail = (e: MouseEvent) => {
  e.preventDefault();
  //
  const params = location.search;
  const parentId = new URLSearchParams(params).get('id') ?? '';

  const myDiary = localStorage.getItem('myDiary')!;
  const prevData = JSON.parse(myDiary);

  if (parentId) {
    const filteredData = prevData.filter((data: TCard) => data.id !== parseInt(parentId));
    const convertString = JSON.stringify(filteredData);
    localStorage.setItem('myDiary', convertString);

    window.location.href = '/';
  }

  alert('삭제되었습니다.');
};
