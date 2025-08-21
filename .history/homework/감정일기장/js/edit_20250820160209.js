document.addEventListener('DOMContentLoaded', function () {
  const 선택된일기데이터 = localStorage.getItem('선택된일기');
  const 일기객체 = JSON.parse(선택된일기데이터);
  console.log(일기객체);

  // 입력 요소들 찾기
  const 제목입력창 = document.getElementById('titleInput');
  const 내용입력창 = document.getElementById('textInput');

  // 라디오 버튼들 찾기
  const 행복라디오 = document.getElementById('happy');
  const 슬픔라디오 = document.getElementById('sad');
  const 놀람라디오 = document.getElementById('surprised');
  const 화남라디오 = document.getElementById('angry');
  const 기타라디오 = document.getElementById('other');

  // 버튼들 찾기 (클래스명으로 찾아야 함)
  const 취소버튼 = document.querySelector('.취소버튼');
  const 수정버튼 = document.querySelector('.수정버튼');

  // 입력창에 기존 데이터 채우기
  제목입력창.value = 일기객체.title;
  내용입력창.value = 일기객체.content;

  // 라디오 버튼 선택 상태 설정하기
  if (일기객체.emotion === '행복해요') 행복라디오.checked = true;
  if (일기객체.emotion === '슬퍼요') 슬픔라디오.checked = true;
  if (일기객체.emotion === '놀랐어요') 놀람라디오.checked = true;
  if (일기객체.emotion === '화나요') 화남라디오.checked = true;
  if (일기객체.emotion === '기타') 기타라디오.checked = true;

  수정버튼.addEventListener('click', function () {
    const 새제목 = 제목입력창.value;
    const 새내용 = 내용입력창.value;

    let 새감정 = '';
    if (행복라디오.checked) 새감정 = '행복해요';
    if (슬픔라디오.checked) 새감정 = '슬퍼요';
    if (놀람라디오.checked) 새감정 = '놀랐어요';
    if (화남라디오.checked) 새감정 = '화나요';
    if (기타라디오.checked) 새감정 = '기타';

    console.log('수정된데이터:', 새제목, 새내용, 새감정);
    // 전체일기목록 가져오기
    const 전체일기목록 = JSON.parse(localStorage.getItem('저장된일기'));

    // 현재 수정하는 일기 찾아서 업데이트하기
    // 반복문으로 하나씩 확인하기
    for (let i = 0; i < 전체일기목록.length; i++) {
      // 현재 보고 있는 일기가 수정하려는 일기와 같은가?
      if (전체일기목록[i].title === 일기객체.title) {
        // 제목이 같고
        // 이 일기를 새로운 내용으로 바꾸자
        전체일기목록[i].title = 새제목; // 제목 바꾸기
        전체일기목록[i].content = 새내용; // 내용 바꾸기
        전체일기목록[i].emotion = 새감정; // 감정 바꾸기
        break; // 찾았으니까 멈춤
      }
    }
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
    localStorage.setItem('저장된일기', JSON.stringify(전체일기목록));
    location.href = './index.html';
  });
});

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
