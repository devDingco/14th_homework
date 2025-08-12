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
      date: '25-08-11',
      emotion: '😊',
    };

    diaryList.push(diary);
    console.log('새일기추가', diary);

    const diaryListContainer = document.getElementById('diaryList');
    //현재 빈 배열에 정보(제목,내용)을 담고있지만 화면에는 보여지지 않음
    const 새일기 = document.createElement('div');
    새일기.innerHTML = `<div>${diary.title}</div>`;
  });
});
