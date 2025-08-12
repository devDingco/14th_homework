// 1단계: 페이지가 다 로드되면 실행하기
document.addEventListener('DOMContentLoaded', function () {
  // 2단계: HTML 요소들 찾아서 변수에 저장
  const titleInput = document.getElementById('titleinput'); // 제목 입력창 찾기
  const textInput = document.getElementById('textinput'); // 내용 입력창 찾기
  const submitBtn = document.getElementById('submitBtn'); // 등록 버튼 찾기

  // 3단계: 일기들을 저장할 빈 배열 만들기
  let diaryList = [];

  // 4단계: 저장된 일기들 불러오기 (브라우저 껐다 켜도 남아있게)
  const 저장 = localStorage.getItem('저장된일기'); // 브라우저에서 저장된 일기 가져오기
  if (저장) {
    // 저장된 게 있다면
    diaryList = JSON.parse(저장); // 텍스트를 배열로 변환해서 diaryList에 넣기
    console.log('불러온일기들', diaryList);

    // 5단계: 불러온 일기들을 화면에 그리기 (for문 사용)
    for (let 각일기 of diaryList) {
      // 배열에서 일기를 하나씩 꺼내기
      console.log(각일기);
      const diaryListContainer = document.getElementById('diaryList'); // 일기 목록 컨테이너 찾기

     const 새일기 = document.createElement('div'); // 새로운 div 요소 만들기
새일기.innerHTML = `
  <img src="./assets/images/main4.png" alt="" />
  <div class="title__text__main">
    <div class="title__text">
      <div class="title__happy">${각일기.emotion}</div>    
      <div>${각일기.date}</div>                            
    </div>
    <div>${각일기.title}</div>                             
  </div>
`;
`;

      // 클릭하면 상세정보 보여주기
      새일기.addEventListener('click', function () {
        alert(`제목:${diary.title},내용:${diary.content},날짜:${diary.date}`);
      });
      diaryListContainer.appendChild(새일기); // 화면에 추가하기
    }
  }

  // 6단계: 등록 버튼 클릭했을 때 실행될 함수
  submitBtn.addEventListener('click', function () {
    console.log('버튼이클릭됨');

    // 7단계: 사용자가 입력한 값들 가져오기
    const userTitle = titleInput.value; // 제목 입력값
    const userContent = textInput.value; // 내용 입력값

    // 8단계: 선택된 기분 알아내기 (라디오 버튼)
    let userEmotion = 'happy'; // 기본값은 행복
    if (document.getElementById('sad').checked) {
      // 슬픔이 선택되었다면
      userEmotion = 'sad';
    }
    if (document.getElementById('angry').checked) {
      // 화남이 선택되었다면
      userEmotion = 'angry';
    }
    if (document.getElementById('surprised').checked) {
      // 놀람이 선택되었다면
      userEmotion = 'surprised';
    }
    if (document.getElementById('other').checked) {
      // 기타가 선택되었다면
      userEmotion = 'other';
    }
    console.log(userEmotion);

    // 9단계: 기분에 따라 이미지와 텍스트 정하기 (객체 사용)
    const 이미지맵 = {
      // 기분별 이미지 연결
      happy: 'main4.png',
      sad: 'main1.png',
      angry: 'main3.png',
      surprised: 'main2.png',
      other: 'main5.png',
    };
    const 텍스트맵 = {
      // 기분별 텍스트 연결
      happy: '행복해요',
      sad: '슬퍼요',
      angry: '화나요',
      surprised: '놀랐어요',
      other: '기타',
    };

    const 이미지경로 = 이미지맵[userEmotion]; // 선택된 기분의 이미지 가져오기
    const 감정텍스트 = 텍스트맵[userEmotion]; // 선택된 기분의 텍스트 가져오기
    console.log('사용자가입력한제목', userTitle);
    console.log('사용자가입력한내용', userContent);

    // 10단계: 일기 객체 만들기
    const diary = {
      title: userTitle, // 입력받은 제목
      content: userContent, // 입력받은 내용
      date: new Date().toLocaleDateString(), // 오늘 날짜
      emotion: 감정텍스트, // 선택된 기분 텍스트
    };

    // 11단계: 배열에 추가하고 브라우저에 저장하기
    diaryList.push(diary); // diaryList 배열에 새 일기 추가
    console.log('새일기추가', diary);
    localStorage.setItem('저장된일기', JSON.stringify(diaryList)); // 배열을 텍스트로 변환해서 브라우저에 저장

    // 12단계: 새로 등록한 일기를 화면에 그리기
    const diaryListContainer = document.getElementById('diaryList'); // 일기 목록 컨테이너 찾기
    const 새일기 = document.createElement('div'); // 새로운 div 요소 만들기
    새일기.innerHTML = `<img src="./assets/images/${이미지경로}" alt="" />
  <div class="title__text__main">
    <div class="title__text">
      <div class="title__happy">${diary.emotion}</div>      
      <div>${diary.date}</div>                              
    </div>
    <div>${diary.title}</div>                               
  </div>
`;

    // 13단계: 클릭 이벤트 추가하고 화면에 보여주기
    새일기.addEventListener('click', function () {
      // 클릭하면 상세정보 보여주기
      alert(`제목:${diary.title},내용:${diary.content},날짜:${diary.date}`);
    });
    diaryListContainer.appendChild(새일기); // 화면에 추가
    console.log('새일기 추가완료');
  });
});
