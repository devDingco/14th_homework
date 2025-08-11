// 일기 카드 목 데이터
const diaryCardsData = [
  {
    id: 1,
    image: "./public/images/슬퍼요 (m).png",
    tag: "슬퍼요",
    tagId: "card-tag-sad",
    date: "2024.12.15",
    title: "타이틀 영역 입니다. 한줄까지만 노출 됩니다.",
  },
  {
    id: 2,
    image: "./public/images/놀랐어요 (m).png",
    tag: "놀랐어요",
    tagId: "card-tag-surprised",
    date: "2024.12.14",
    title: "타이틀 영역 입니다.",
  },
  {
    id: 3,
    image: "./public/images/화나요 (m).png",
    tag: "화나요",
    tagId: "card-tag-angry",
    date: "2024.12.13",
    title: "타이틀 영역 입니다.",
  },
  {
    id: 4,
    image: "./public/images/행복해요 (m).png",
    tag: "행복해요",
    tagId: "card-tag-happy",
    date: "2024.12.12",
    title: "타이틀 영역 입니다.",
  },
  {
    id: 5,
    image: "./public/images/기타 (m).png",
    tag: "기타",
    tagId: "card-tag-etc",
    date: "2024.12.11",
    title: "타이틀 영역 입니다.",
  },
  {
    id: 6,
    image: "./public/images/놀랐어요 (m).png",
    tag: "놀랐어요",
    tagId: "card-tag-surprised",
    date: "2024.12.10",
    title: "타이틀 영역 입니다.",
  },
  {
    id: 7,
    image: "./public/images/화나요 (m).png",
    tag: "화나요",
    tagId: "card-tag-angry",
    date: "2024.12.09",
    title: "타이틀 영역 입니다.",
  },
  {
    id: 8,
    image: "./public/images/행복해요 (m).png",
    tag: "행복해요",
    tagId: "card-tag-happy",
    date: "2024.12.08",
    title: "타이틀 영역 입니다.",
  },
  {
    id: 9,
    image: "./public/images/슬퍼요 (m).png",
    tag: "슬퍼요",
    tagId: "card-tag-sad",
    date: "2024.12.07",
    title: "타이틀 영역 입니다.",
  },
  {
    id: 10,
    image: "./public/images/놀랐어요 (m).png",
    tag: "놀랐어요",
    tagId: "card-tag-surprised",
    date: "2024.12.06",
    title: "타이틀 영역 입니다.",
  },
  {
    id: 11,
    image: "./public/images/화나요 (m).png",
    tag: "화나요",
    tagId: "card-tag-angry",
    date: "2024.12.05",
    title: "타이틀 영역 입니다.",
  },
  {
    id: 12,
    image: "./public/images/행복해요 (m).png",
    tag: "행복해요",
    tagId: "card-tag-happy",
    date: "2024.12.04",
    title: "타이틀 영역 입니다.",
  },
];

// 감정 태그 색상 매핑
const tagColorMap = {
  슬퍼요: "#28b4e1",
  행복해요: "#ea5757",
  놀랐어요: "#d99000",
  화나요: "var(--gray-60)",
  기타: "#a229ed",
};

window.diaryCardsData = diaryCardsData;
window.tagColorMap = tagColorMap;
