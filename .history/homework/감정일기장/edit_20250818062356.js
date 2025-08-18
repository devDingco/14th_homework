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
});
