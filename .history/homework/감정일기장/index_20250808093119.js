// 일기를 저장할 배열
let diaryList = [];

document.addEventListener('DOMContentLoaded', function () {
  // 등록 버튼 찾기
  const 등록버튼 = document.getElementById('clickbutton');

  // 등록 버튼 클릭 시 실행
  등록버튼.addEventListener('click', function () {
    // 입력값 가져오기
    const 제목 = document.getElementById('titleinput').value;
    const 내용 = document.getElementById('textinput').value;

    // 1. 배열에 객체로 일기 push
    const 새일기 = {
      제목: 제목,
      내용: 내용,
      날짜: '2024.08.08',
    };

    diaryList.push(새일기);

    // 2. 일기목록에 마지막 순서로 추가
    const 일기목록 = document.querySelector('.title__images');
    const 새일기요소 = document.createElement('div');
    새일기요소.innerHTML = `
            <img src="./assets/images/main4.png" alt="" />
            <div class="title__text__main">
                <div class="title__text">
                    <div class="title__happy">행복해요</div>
                    <div>${새일기.날짜}</div>
                </div>
                <div>${새일기.제목}</div>
            </div>
        `;

    // 3. 카드 클릭하면 alert으로 상세 정보
    새일기요소.addEventListener('click', function () {
      alert(
        '제목: ' +
          새일기.제목 +
          '\n내용: ' +
          새일기.내용 +
          '\n날짜: ' +
          새일기.날짜
      );
    });

    일기목록.appendChild(새일기요소);

    // 입력칸 비우기
    document.getElementById('titleinput').value = '';
    document.getElementById('textinput').value = '';

    alert('일기가 등록되었습니다!');
  });
});
