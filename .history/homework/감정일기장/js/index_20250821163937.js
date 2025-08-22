// 모달 관련 이벤트들만 수정한 부분
document.addEventListener('DOMContentLoaded', function () {
  // HTML 요소들 찾기
  const 모달열기버튼 = document.getElementById('모달열기버튼');
  const 모달배경 = document.getElementById('모달배경');
  const 모달닫기버튼 = document.getElementById('모달닫기버튼');
  const 모달확인버튼 = document.getElementById('모달확인버튼');
  const 모달계속작성버튼 = document.getElementById('모달계속작성버튼');
  const 모달등록취소버튼 = document.getElementById('모달등록취소버튼');

  // 모달 열기/닫기 함수
  function 모달열기(모달ID) {
    document.getElementById(모달ID).style.display = 'block';
  }

  function 모달닫기(모달ID) {
    document.getElementById(모달ID).style.display = 'none';
  }

  // 1. 일기쓰기 버튼 클릭 → 일기쓰기 모달 열기
  모달열기버튼.addEventListener('click', function () {
    모달열기('모달등록');
  });

  // 2. 배경 클릭 → 일기쓰기 모달 닫기
  모달배경.addEventListener('click', function () {
    모달닫기('모달등록');
  });

  // 3. 닫기 버튼 클릭 → 등록취소 확인 모달 열기
  모달닫기버튼.addEventListener('click', function () {
    모달닫기('모달등록'); // 일기쓰기 모달 먼저 닫기
    모달열기('등록취소모달'); // 등록취소 확인 모달 열기
  });

  // 4. 등록완료모달의 확인 버튼
  모달확인버튼.addEventListener('click', function () {
    모달닫기('등록완료모달');
    // 입력창 초기화
    document.getElementById('titleInput').value = '';
    document.getElementById('textInput').value = '';
    // 라디오 버튼 초기화
    const 라디오버튼들 = document.querySelectorAll('input[name="mood"]');
    라디오버튼들.forEach((radio) => (radio.checked = false));
  });

  // 5. 등록취소모달의 "계속 작성" 버튼
  모달계속작성버튼.addEventListener('click', function () {
    모달닫기('등록취소모달'); // 등록취소 모달 닫기
    모달열기('모달등록'); // 일기쓰기 모달 다시 열기
  });

  // 6. 등록취소모달의 "등록 취소" 버튼
  모달등록취소버튼.addEventListener('click', function () {
    모달닫기('등록취소모달'); // 등록취소 모달 닫기
    // 입력창 초기화
    document.getElementById('titleInput').value = '';
    document.getElementById('textInput').value = '';
    // 라디오 버튼 초기화
    const 라디오버튼들 = document.querySelectorAll('input[name="mood"]');
    라디오버튼들.forEach((radio) => (radio.checked = false));
  });

  // 등록 버튼 클릭 이벤트는 기존 코드 그대로...
  // submitBtn.addEventListener('click', function () { ... });
});
