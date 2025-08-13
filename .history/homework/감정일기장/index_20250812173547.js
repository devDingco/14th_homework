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
  //저장된 로컬스토리지를 가져와야서 변수에 저장
  const 저장 = localStorage.getItem('저장된일기');
  if (저장) {
    JSON.parse(저장);
  }
  // 버튼클릭이벤트 추가
  submitBtn.addEventListener('click', function () {
    console.log('버튼이클릭됨');

    //사용자가 입력한 값들 가져오기
    const userTitle = titleInput.value;
    const userContent = textInput.value;

    console.log('사용자가입력한제목', userTitle);
    console.log('사용자가입력한내용', userContent);
    const diary = {
      title: userTitle,
      content: userContent,
      date: new Date().toLocaleDateString(), //오늘날짜
      emotion: '😊',
    };

    diaryList.push(diary);
    console.log('새일기추가', diary);
    //로컬스토리지에 저장하기
    localStorage.setItem('저장될일기', JSON.stringify(diaryList));

    const diaryListContainer = document.getElementById('diaryList');
    //현재 빈 배열에 정보(제목,내용)을 담음
    const 새일기 = document.createElement('div');
    새일기.innerHTML = `<img src="./assets/images/main4.png" alt="" />
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
