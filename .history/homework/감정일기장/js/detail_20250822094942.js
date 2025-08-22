document.addEventListener('DOMContentLoaded', function () {
  const 선택된일기데이터 = localStorage.getItem('선택된일기');
  const 일기객체 = JSON.parse(선택된일기데이터);
  console.log(일기객체);

  const 제목요소 = document.getElementById('detail__title');
  const 감정이미지요소 = document.getElementById('detailEmotionImage');
  const 감정텍스트요소 = document.getElementById('detailEmotion');
  const 날짜요소 = document.getElementById('detailDate');
  const 내용요소 = document.getElementById('detailContent');
  const 삭제버튼 = document.getElementById('delBtn');
  const 회고인풋 = document.getElementById('회고인풋');
  const 회고버튼 = document.getElementById('회고버튼');
  const 회고영역 = document.getElementById('회고영역');
  const 내용복사기능 = () => {
    const 내용 = document.getElementById('detailContent').innerText;
    navigator.clipboard.writeText(내용);
    alert('복사되었습니다');
  };
  window.내용복사기능 = 내용복사기능;
  function 회고목록보여주기() {
    let 기존회고들 = JSON.parse(localStorage.getItem('모든회고') || '[]');

    let 화면내용 = '';
    기존회고들.forEach(function (회고) {
      화면내용 += `<div id="회고항목">
        <div id="회고댓글">${회고.내용}</div>
        <div id="날짜영역">[${회고.날짜}]</div>
      </div>`;
    });
    회고영역.innerHTML = 화면내용;
  }
  회고목록보여주기();

  회고버튼.addEventListener('click', function () {
    const 입력한내용 = 회고인풋.value;
    console.log('입력한내용', 입력한내용);

    let 기존회고들 = JSON.parse(localStorage.getItem('모든회고') || '[]');
    기존회고들.unshift({
      내용: 입력한내용,
      날짜: new Date().toLocaleDateString(),
    });
    localStorage.setItem('모든회고', JSON.stringify(기존회고들));
    console.log('저장됨');

    let 화면내용 = '';
    기존회고들.forEach(function (회고) {
      화면내용 += `<div id="회고항목">
        <div id="회고댓글">${회고.내용}</div>
        <div id="날짜영역">[${회고.날짜}]</div>
      </div>`;
    });
    회고영역.innerHTML = 화면내용;

    회고인풋.value = '';
  });

  function 일기삭제하기(삭제할제목) {
    let diaryList = JSON.parse(localStorage.getItem('저장된일기')) || [];
    diaryList = diaryList.filter((일기) => 일기.title !== 삭제할제목);
    localStorage.setItem('저장된일기', JSON.stringify(diaryList));
    location.href = './index.html';
  }
  삭제버튼.addEventListener('click', function () {
    alert('삭제 되었습니다.');
    const 현재일기 = JSON.parse(localStorage.getItem('선택된일기'));
    일기삭제하기(현재일기.title);
  });
  window.일기삭제하기 = 일기삭제하기;
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
  수정버튼.addEventListener('click', function () {
    location.href = './edit.html';
  });
});
