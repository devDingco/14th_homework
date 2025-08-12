// 1단계: 페이지가 다 로드되면 실행하기
document.addEventListener('DOMContentLoaded', function () {
  // 2단계: HTML 요소들 찾아서 변수에 저장
  const titleInput = document.getElementById('titleinput');
  const textInput = document.getElementById('textinput');
  const submitBtn = document.getElementById('submitBtn');

  // 3단계: 일기들을 저장할 빈 배열 만들기
  let diaryList = [];

  // 공통 함수: 일기를 화면에 그리는 함수
  function 일기를화면에그리기(일기데이터) {
    // 감정에 따른 이미지 매핑
    const 이미지맵 = {
      행복해요: 'main4.png',
      슬퍼요: 'main1.png',
      화나요: 'main3.png',
      놀랐어요: 'main2.png',
      기타: 'main5.png',
    };

    const 일기이미지 = 이미지맵[일기데이터.emotion];
    const diaryListContainer = document.getElementById('diaryList');

    const 새일기 = document.createElement('div');
    새일기.innerHTML = `
      <img src="./assets/images/${일기이미지}" alt="" />
      <div class="title__text__main">
        <div class="title__text">
          <div class="title__happy">${일기데이터.emotion}</div>    
          <div>${일기데이터.date}</div>                            
        </div>
        <div>${일기데이터.title}</div>                             
      </div>
    `;

    새일기.addEventListener('click', function () {
      alert(
        `제목:${일기데이터.title},내용:${일기데이터.content},날짜:${일기데이터.date}`
      );
    });

    diaryListContainer.appendChild(새일기);
  }

  // 4단계: 저장된 일기들 불러오기
  const 저장 = localStorage.getItem('저장된일기');
  if (저장) {
    diaryList = JSON.parse(저장);
    console.log('불러온일기들', diaryList);

    // 5단계: 불러온 일기들을 화면에 그리기 (함수 사용!)
    for (let 각일기 of diaryList) {
      console.log(각일기);
      일기를화면에그리기(각일기); // ← 함수 호출
    }
  }

  // 6단계: 등록 버튼 클릭했을 때 실행될 함수
  submitBtn.addEventListener('click', function () {
    console.log('버튼이클릭됨');

    // 7단계: 사용자가 입력한 값들 가져오기
    const userTitle = titleInput.value;
    const userContent = textInput.value;

    // 8단계: 선택된 기분 알아내기
    let userEmotion = 'happy';
    if (document.getElementById('sad').checked) {
      userEmotion = 'sad';
    }
    if (document.getElementById('angry').checked) {
      userEmotion = 'angry';
    }
    if (document.getElementById('surprised').checked) {
      userEmotion = 'surprised';
    }
    if (document.getElementById('other').checked) {
      userEmotion = 'other';
    }

    // 9단계: 기분에 따라 텍스트 정하기
    const 텍스트맵 = {
      happy: '행복해요',
      sad: '슬퍼요',
      angry: '화나요',
      surprised: '놀랐어요',
      other: '기타',
    };

    const 감정텍스트 = 텍스트맵[userEmotion];

    // 10단계: 일기 객체 만들기
    const diary = {
      title: userTitle,
      content: userContent,
      date: new Date().toLocaleDateString(),
      emotion: 감정텍스트,
    };

    // 11단계: 배열에 추가하고 브라우저에 저장하기
    diaryList.push(diary);
    localStorage.setItem('저장된일기', JSON.stringify(diaryList));

    // 12단계: 새로 등록한 일기를 화면에 그리기 (함수 사용!)
    일기를화면에그리기(diary); // ← 함수 호출

    console.log('새일기 추가완료');
  });
});
