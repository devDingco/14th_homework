export type TCard = {
  id: number;
  imgUrl: string;
  state: string;
  date: string;
  title: string;
  content: string;
};

export const initialData: TCard[] = [
  {
    id: 1232132,
    imgUrl: '/assets/images/슬퍼요 (m).png',
    state: '슬퍼요',
    date: '2024. 03. 12',
    title: '타이틀 영역입니다. 한줄까지만 노출됩니다.',
    content:
      '내용 영역입니다. 여러줄이 노출됩니다. 내용 영역입니다. 여러줄이 노출됩니다. 내용 영역입니다. 여러줄이 노출됩니다. 내용 영역입니다. 여러줄이 노출됩니다.내용 영역입니다. 여러줄이 노출됩니다. 내용 영역입니다. 여러줄이 노출됩니다.내용 영역입니다. 여러줄이 노출됩니다. 내용 영역입니다. 여러줄이 노출됩니다.내용 영역입니다. 여러줄이 노출됩니다. 내용 영역입니다. 여러줄이 노출됩니다.',
  },
  {
    id: 123,
    imgUrl: '/assets/images/놀랐어요 (m).png',
    state: '놀랐어요',
    date: '2024. 03. 12',
    title: '타이틀 영역입니다. 한줄까지만 노출됩니다.',
    content:
      '내용 영역입니다. 여러줄이 노출됩니다. 내용 영역입니다. 여러줄이 노출됩니다. 내용 영역입니다. 여러줄이 노출됩니다. 내용 영역입니다. 여러줄이 노출됩니다.내용 영역입니다. 여러줄이 노출됩니다. 내용 영역입니다. 여러줄이 노출됩니다.내용 영역입니다. 여러줄이 노출됩니다. 내용 영역입니다. 여러줄이 노출됩니다.내용 영역입니다. 여러줄이 노출됩니다. 내용 영역입니다. 여러줄이 노출됩니다.',
  },
  {
    id: 345,
    imgUrl: '/assets/images/화나요 (m).png',
    state: '화나요',
    date: '2024. 03. 12',
    title: '타이틀 영역입니다. 한줄까지만 노출됩니다.',
    content:
      '내용 영역입니다. 여러줄이 노출됩니다. 내용 영역입니다. 여러줄이 노출됩니다. 내용 영역입니다. 여러줄이 노출됩니다. 내용 영역입니다. 여러줄이 노출됩니다.내용 영역입니다. 여러줄이 노출됩니다. 내용 영역입니다. 여러줄이 노출됩니다.내용 영역입니다. 여러줄이 노출됩니다. 내용 영역입니다. 여러줄이 노출됩니다.내용 영역입니다. 여러줄이 노출됩니다. 내용 영역입니다. 여러줄이 노출됩니다.',
  },
  {
    id: 213,
    imgUrl: '/assets/images/행복해요 (m).png',
    state: '행복해요',
    date: '2024. 03. 12',
    title: '타이틀 영역입니다. 한줄까지만 노출됩니다.',
    content:
      '내용 영역입니다. 여러줄이 노출됩니다. 내용 영역입니다. 여러줄이 노출됩니다. 내용 영역입니다. 여러줄이 노출됩니다. 내용 영역입니다. 여러줄이 노출됩니다.내용 영역입니다. 여러줄이 노출됩니다. 내용 영역입니다. 여러줄이 노출됩니다.내용 영역입니다. 여러줄이 노출됩니다. 내용 영역입니다. 여러줄이 노출됩니다.내용 영역입니다. 여러줄이 노출됩니다. 내용 영역입니다. 여러줄이 노출됩니다.',
  },
  {
    id: 86574,
    imgUrl: '/assets/images/기타 (m).png',
    state: '기타',
    date: '2024. 03. 12',
    title: '타이틀 영역입니다. 한줄까지만 노출됩니다.',
    content:
      '내용 영역입니다. 여러줄이 노출됩니다. 내용 영역입니다. 여러줄이 노출됩니다. 내용 영역입니다. 여러줄이 노출됩니다. 내용 영역입니다. 여러줄이 노출됩니다.내용 영역입니다. 여러줄이 노출됩니다. 내용 영역입니다. 여러줄이 노출됩니다.내용 영역입니다. 여러줄이 노출됩니다. 내용 영역입니다. 여러줄이 노출됩니다.내용 영역입니다. 여러줄이 노출됩니다. 내용 영역입니다. 여러줄이 노출됩니다.',
  },
];

// 초기데이터 설정
export const initLocalStorage = (data: TCard[]) => {
  const convertString = JSON.stringify(data);
  localStorage.setItem('myDiary', convertString);
};

export const getLocalStorage = () => {
  const myDiary = localStorage.getItem('myDiary')!;
  const parseString = JSON.parse(myDiary);

  if (!myDiary) {
    initLocalStorage(initialData);
  }

  return parseString;
};

export const setLocalStorage = (newData: TCard) => {
  // 데이터 추가
  const prevData = getLocalStorage();
  const updateData = [...prevData, newData];
  const convertString = JSON.stringify(updateData);
  localStorage.setItem('myDiary', convertString);
};

  