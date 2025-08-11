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

    //일기객체만들기(숙제용)
    const diary = {
      title: '첫번째일기',
      content: '자스배우는중입니다',
      date: '25-08-11',
      emotion: '',
    };
  });
});
