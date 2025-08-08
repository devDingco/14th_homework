// 새로운 일기를 등록받아 보자

let 일기들 = []; // 등록한 일기 데이터 저장

// 일기등록하기 함수
function WriteNewDiary() {
    // 입력값 가져오기
    const feeling = document.querySelector('input[name="feel"]:checked').value
    const title = document.getElementById("제목__내용입력").value
    const blabla = document.getElementById("내용__내용입력").value
    const date = new Date().toLocaleDateString()

    // 데이터 객체 만들기
    const 새로운일기 = {
        feeling: feeling,
        title: title,
        content: blabla,
        date: date
    }

    // 배열에 저장
    일기들.push(새로운일기);

    // 안내 문구 요소가 있다면 제거
    const emptyMsg = document.querySelector(".empty-message");
    if (emptyMsg) {
        emptyMsg.remove();
    }    

    // 화면에 표시할 DOM 만들기
    const 일기틀 = document.createElement('div');
    일기틀.className = '일기틀';
    일기틀.innerHTML =`
    <div class="감정이미지"></div>
    <div class="일기속성">
        <div class="일기속성1">
            <div class="감정">슬퍼요</div>
            <div class="날짜표시">2025. 8. 7.</div>
        </div>
        <div class="일기속성2">
            <div class="타이틀">
                타이틀 영역입니다. 한줄까지만 노출 됩니다.
            </div>
        </div>
    </div>`
;

    // 요소 선택 (해당 일기틀 범위에서만)
    const 감정El = 일기틀.querySelector(".감정");
    const 감정이미지El = 일기틀.querySelector(".감정이미지");
    const 날짜El = 일기틀.querySelector(".날짜표시");
    const 타이틀El = 일기틀.querySelector(".타이틀");

    // 데이터 넣기
    감정El.innerText = feeling;
    날짜El.innerText = date;
    타이틀El.innerText = title;

    // 감정별 스타일 & 이미지
    if (feeling === "행복해요") {
        감정El.style.color = "#EA5757";
        감정이미지El.style.backgroundImage = "url(./asset/image/happy.png)";
    } else if (feeling === "슬퍼요") {
        감정El.style.color = "#28B4E1";
        감정이미지El.style.backgroundImage = "url(./asset/image/sad.png)";
    } else if (feeling === "놀랐어요") {
        감정El.style.color = "#D59029";
        감정이미지El.style.backgroundImage = "url(./asset/image/surprised.png)";
    } else if (feeling === "화나요") {
        감정El.style.color = "#777";
        감정이미지El.style.backgroundImage = "url(./asset/image/mad.png)";
    } else {
        // 기타 감정 기본 스타일
        감정El.style.color = "#000";
        감정이미지El.style.backgroundImage = "none";
    }

    // 페이지에 추가
    document.querySelector(".일기보관함").appendChild(일기틀);

    // 입력창 초기화
    document.getElementById("제목__내용입력").value = "";
    document.getElementById("내용__내용입력").value = "";

    // 기분 선택 해제
    const checkedRadio = document.querySelector('input[name="feel"]:checked');
    if (checkedRadio) checkedRadio.checked = false;

    일기틀.addEventListener("click", () => {
        alert(
          `감정: ${새로운일기.feeling}\n` +
          `날짜: ${새로운일기.date}\n` +
          `제목: ${새로운일기.title}\n` +
          `내용: ${새로운일기.content}`
        );
      });

}
