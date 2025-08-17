document.addEventListener('DOMContentLoaded', function () {
  const 선택된일기데이터 = localStorage.getItem('선택된일기');
  const 일기객체 = JSON.parse(선택된일기데이터);
  console.log(일기객체);

  const 제목요소 = document.getElementById('detail__title');
  const 감정이미지요소 = document.getElementById('detailEmotionImage');
  const 감정텍스트요소 = document.getElementById('detailEmotion');
  const 날짜요소 = document.getElementById('detailDate');
  const 내용요소 = document.getElementById('detailContent');

  제목요소.textContent = 일기객체.title;
  감정텍스트요소.textContent = 일기객체.emotion;
  날짜요소.textContent = 일기객체.date;
  내용요소.textContent = 일기객체.content;
});
