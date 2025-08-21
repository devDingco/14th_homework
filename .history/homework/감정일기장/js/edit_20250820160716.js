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
  const 회고영역 = document.getElementById('회고영역');

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
    localStorage.setItem('저장된일기', JSON.stringify(전체일기목록));
    location.href = './index.html';
  });
});
