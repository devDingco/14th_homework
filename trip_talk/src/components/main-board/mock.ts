export interface BoardItem {
  id: number;
  title: string;
  content: string;
  writer: string;
  createdAt: string;
}

export const mainBoardMock: BoardItem[] = [
  {
    id: 243,
    title: '제주살이 1일차',
    content: '제주살이 1일차 청산별곡이 생각나네요.',
    writer: '홍길동',
    createdAt: '2024.12.16',
  },
  {
    id: 242,
    title: '강남 살이 100년차',
    content: '강남 살이 100년차 청산별곡이 생각나네요.',
    writer: '성시경',
    createdAt: '2025.08.19',
  },
  {
    id: 241,
    title: '길 걷고 있었는데 고양이한테 간택 받았어요',
    content: '길 걷고 있었는데 고양이한테 간택 받았어요.',
    writer: '홍길동',
    createdAt: '2024.11.11',
  },
  {
    id: 240,
    title: '오늘 날씨 너무 좋아서 바다보러 왔어요~',
    content: '오늘 날씨 너무 좋아서 바다보러 왔어요~',
    writer: '홍길동',
    createdAt: '2024.11.11',
  },
  {
    id: 239,
    title: '누가 양양 핫하다고 했어 나 밖에 없는데?',
    content: '누가 양양 핫하다고 했어 나 밖에 없는데?',
    writer: '홍길동',
    createdAt: '2024.11.11',
  },
  {
    id: 238,
    title: '여름에 보드타고 싶은거 저밖에 없나요 🥲',
    content: '누가 양양 핫하다고 했어 나 밖에 없는데?',
    writer: '홍길동',
    createdAt: '2024.11.11',
  },
  {
    id: 237,
    title: '사무실에서 과자 너무 많이 먹은거 같아요 다이어트하러 여행 가야겠어요',
    content: '누가 양양 핫하다고 했어 나 밖에 없는데?',
    writer: '홍길동',
    createdAt: '2024.11.11',
  },
  {
    id: 236,
    title: '여기는 기승전 여행이네요 ㅋㅋㅋ',
    content: '누가 양양 핫하다고 했어 나 밖에 없는데?',
    writer: '홍길동',
    createdAt: '2024.11.11',
  },
  {
    id: 235,
    title: '상여금 들어왔는데 이걸로 다낭갈까 사이판 갈까',
    content: '누가 양양 핫하다고 했어 나 밖에 없는데?',
    writer: '홍길동',
    createdAt: '2024.11.11',
  },
  {
    id: 234,
    title: '강릉 여름바다 보기 좋네요',
    content: '누가 양양 핫하다고 했어 나 밖에 없는데?',
    writer: '홍길동',
    createdAt: '2024.11.11',
  },
];
