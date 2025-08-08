//CONSIDER: MOOD 객체 이중 구조 고려 중
const MOOD_IMAGES = {
  happy: "./assets/images/happy.png",
  sad: "./assets/images/sad.png",
  surprise: "./assets/images/surprise.png",
  angry: "./assets/images/angry.png",
  etc: "./assets/images/etc.png",
}

const MOOD_KOR = {
  happy: "행복해요",
  sad: "슬퍼요",
  surprise: "놀랐어요",
  angry: "화나요",
  etc: "기타",
}

const MOOD_FONT_COLOR = {
  happy: '#EA5757',
  sad: '#28B4E1',
  surprise: '#D59029',
  angry: '#777',
  etc: '#A229ED'
};


let diaryList = [
  {
    id: 0,
    mood: "sad",
    date: "2024. 03. 12",
    title: "타이틀 영역 입니다. 한줄까지만 노출 됩니다.",
    contents: "내용내용내용"
  },
  {
    id: 1,
    mood: "surprise",
    date: "2024. 03. 12",
    title: "타이틀 영역 입니다. 한줄까지만 노출 됩니다.",
    contents: "내용내용내용"
  },
  {
    id: 2,
    mood: "angry",
    date: "2024. 03. 12",
    title: "타이틀 영역 입니다. 한줄까지만 노출 됩니다.",
    contents: "내용내용내용"
  },
  {
    id: 3,
    mood: "happy",
    date: "2024. 03. 12",
    title: "타이틀 영역 입니다. 한줄까지만 노출 됩니다.",
    contents: "내용내용내용"
  },
  {
    id: 4,
    mood: "etc",
    date: "2024. 03. 12",
    title: "타이틀 영역 입니다. 한줄까지만 노출 됩니다.",
    contents: "내용내용내용"
  },
  {
    id: 5,
    mood: "happy",
    date: "2024. 03. 12",
    title: "타이틀 영역 입니다. 한줄까지만 노출 됩니다.",
    contents: "내용내용내용"
  },
]