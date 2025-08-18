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

  // 감정별 이미지 맵 (index.js에 있던 것과 동일)
  const 이미지맵 = {
    행복해요: 'main4.png',
    슬퍼요: 'main1.png',
    화나요: 'main3.png',
    놀랐어요: 'main2.png',
    기타: 'main5.png',
  };

  // 감정에 맞는 이미지 넣기
  const 일기이미지 = 이미지맵[일기객체.emotion];
  // detail.js에서 이미지 태그에 크기 속성 추가
  감정이미지요소.innerHTML = `<img src="./assets/images/${일기이미지}" alt="" width="32" height="32" />`;


  const 수정버튼 = document.getElementById('editBtn');
  수정버튼.addEventListener('click'function(){
    location.href='./edit.html'
  })
});
