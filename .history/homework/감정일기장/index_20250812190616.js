document.addEventListener('DOMContentLoaded', function () {
  // 콘솔로그 지우고 function아래부터 기능을 추가해야함
  // 순서는 HTML 요소들 찾아서 변수에 저장
  // 일기들을 저장할 배열만들기
  // 버튼클릭 이벤트 추가

  // html요소들 찾아서 변수에저장
  const titleInput = document.getElementById('titleinput');
  const textInput = document.getElementById('textinput');
  const submitBtn = document.getElementById('submitBtn');

  // 일기를 저장할 빈배열만들기
  let diaryList = [];

  //저장된 로컬스토리지를 불러와 변수에 저장해야함 하지만 저장이 안되어있을 수 있기때문에 변수를 만들고 만약 저장이 있으면 저장을 가져와서 JSON.parse해라
  const 저장 = localStorage.getItem('저장된일기');
  if (저장) {
    diaryList = JSON.parse(저장);
    console.log('불러온일기들', diaryList);
    //현재 일기1 일기2 일기3이 배열에 담겨있는상태
    //그걸 화면에 그려줘야함 하나씩 그리는것보다 반복문을 써서 그려주기
    for (let 각일기 of diaryList) {
      console.log(각일기);
      const diaryListContainer = document.getElementById('diaryList');

      //현재 빈 배열에 정보(제목,내용)을 담음
      const 새일기 = document.createElement('div');
      새일기.innerHTML = `<img src="./assets/images/main4.png" alt="" />
  <div class="title__text__main">
    <div class="title__text">
      <div class="title__happy">${각일기.emotion}</div>
      <div>${각일기.date}</div>
    </div>
    <div>${각일기.title}</div>
  </div>
`;

      // 새 일기를 클릭했을때 보여짐
      새일기.addEventListener('click', function () {
        alert(`제목:${diary.title},내용:${diary.content},날짜:${diary.date}`);
      });
      diaryListContainer.appendChild(새일기);
    }
  }

  // 버튼클릭이벤트 추가
  submitBtn.addEventListener('click', function () {
    console.log('버튼이클릭됨');

    //사용자가 입력한 값들 가져오기
    const userTitle = titleInput.value;
    const userContent = textInput.value;

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
    console.log(userEmotion);

    const 이미지맵 = {
      happy: 'main4.png',
      sad: 'main1.png',
      angry: 'main3.png',
      surprised: 'main2.png',
      other: 'main5.png',
    };
    const 텍스트맵 = {
      happy: '행복해요',
      sad: '슬퍼요',
      angry: '화나요',
      surprised: '놀랐어요',
      other: '기타',
    };

    const 이미지경로 = 이미지맵[userEmotion];
    const 감정텍스트 = 텍스트맵[userEmotion];
    console.log('사용자가입력한제목', userTitle);
    console.log('사용자가입력한내용', userContent);

    const diary = {
      title: userTitle,
      content: userContent,
      date: new Date().toLocaleDateString(), //오늘날짜
      emotion: 감정텍스트,,
    };

    // diaryList의 뒤에 밀어넣기 뭐를? 위에 선언한 변수 diary를
    diaryList.push(diary);
    console.log('새일기추가', diary);

    //로컬스토리지에 저장하기
    localStorage.setItem('저장된일기', JSON.stringify(diaryList));

    const diaryListContainer = document.getElementById('diaryList');

    //현재 빈 배열에 정보(제목,내용)을 담음
    const 새일기 = document.createElement('div');
    새일기.innerHTML = `<img src="./assets/images/${이미지경로}" alt="" />
  <div class="title__text__main">
    <div class="title__text">
      <div class="title__happy">${diary.emotion}</div>
      <div>${diary.date}</div>
    </div>
    <div>${diary.title}</div>
  </div>
`;

    // 새 일기를 클릭했을때 보여짐
    새일기.addEventListener('click', function () {
      alert(`제목:${diary.title},내용:${diary.content},날짜:${diary.date}`);
    });
    diaryListContainer.appendChild(새일기);
    console.log('새일기 추가완료');
  });
});
