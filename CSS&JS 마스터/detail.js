const 쿼리스트링 = window.location.search;
const 잘게나누어담은통 = new URLSearchParams(쿼리스트링);
const 일기번호 = 잘게나누어담은통.get("number");

const 스토리지에저장된일기목록 = window.localStorage.getItem("전달할것") ?? "[]";
const 일기목록 = JSON.parse(스토리지에저장된일기목록);

const 일기담는통 = 일기목록[일기번호];
console.log(일기담는통)

const 회고작성 = () => {
  const 회고내용담는통 =
    window.document.getElementById("회고인풋").value;

  // 4. 현재 일기에 나머지 모두 그대로 두고, 회고목록에 신규 회고만 추가하기
  const 원래있었던회고목록 = 일기목록[일기번호].회고목록;

  const 날짜 = new Date();

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "Asia/Seoul",
  };

  const 날짜담는통 = 날짜
    .toLocaleDateString("ko-KR", options)
    .replace(/\./g, ".");

  if (원래있었던회고목록 === undefined) {
    일기목록[일기번호].회고목록 = [
      {
        회고내용: 회고내용담는통,
        작성일: 날짜담는통,
      },
    ];
  } else {
    일기목록[일기번호].회고목록.push({
      회고내용: 회고내용담는통,
      작성일: 날짜담는통,
    });
  }
  window.localStorage.setItem("전달할것", JSON.stringify(일기목록));

  // 5. 회고 그리기
  JS_회고그리기기능();
};

const JS_회고그리기기능 = () => {

  const 회고목록 = 일기담는통.회고목록 ?? [];

  // 5. 회고목록 화면에 새롭게 전체 그리기
  let HTML_새로운회고목록 = "";
  회고목록.forEach((회고, index) => {
    const isLast = index === 회고목록.length - 1; // 마지막 요소인지 확인하여 border-bottom x

    HTML_새로운회고목록 += `
        <div class="CSS_회고목록${!isLast ? "" : "_마지막"}">
          <div class="CSS_회고목록_내용영역">${회고.회고내용}</div>
          <div class="CSS_회고목록_날짜영역"> [${회고.작성일}]</div>
        </div>
      `;
  });
  document.getElementById("HTML_회고목록영역").innerHTML = HTML_새로운회고목록;
};



const 수정 = () => {
  let queryString = `?edit=${일기번호}`; // 이동할 페이지에 전달할 쿼리 문자열
  let baseUrl = "./edit.html"; // 이동할 기본 페이지 경로
  window.location.href = baseUrl + queryString; // URL 변경 및 이동
}

const 삭제 = () => {
  현재삭제할일기번호 = 일기번호;
  if (현재삭제할일기번호 !== null) {
    // 1. 클릭된 일기번호 삭제하기
    const 삭제후일기목록 = 일기목록.filter(
      (_, index) => index !== parseInt(일기번호, 10)
    );
    // 2. 삭제된 일기목록 다시 저장하기
    window.localStorage.setItem(
      "전달할것",
      JSON.stringify(삭제후일기목록)
    );
    alert("삭제되었습니다.");
    // 3. 메인페이지로 이동
    location.replace('./index.html') 
}
}



window.onload = () => {
}

let 기분 = 일기담는통.감정;
let 기분메시지;
switch (기분) {
case "행복해요":
  기분메시지 = "행복해요";
  이미지경로 = "./assets/행복해요.png";
  글자색 = "#EA5757";
  break;
case "슬퍼요":
  기분메시지 = "슬퍼요";
  이미지경로 = "./assets/슬퍼요.png";
  글자색 = "#28B4E1";
  break;
case "놀랐어요":
  기분메시지 = "놀랐어요";
  이미지경로 = "./assets/놀랐어요.png";
  글자색 = "#D59029";
  break;
case "화나요":
  기분메시지 = "화나요";
  이미지경로 = "./assets/화나요.png";
  글자색 = "#777";
  break;
default:
  기분메시지 = "기타";
  이미지경로 = "./assets/기타.png";
  글자색 = "#A229ED";
  break;
}

// document.getElementById("frame_84").innerHTML = 일기담는통.감정;
document.getElementById("타이틀").innerHTML = 일기담는통.제목;
document.getElementById("내용").innerHTML = 일기담는통.내용;
document.getElementById("date").innerHTML = 일기담는통.날짜;
document.getElementById("HTML_기분이미지보여주는곳").src = 이미지경로;
document.getElementById("frame_84").innerHTML = 기분메시지;
document.getElementById("frame_84").style.color =
  글자색;
document.getElementById("HTML_회고목록영역").innerHTML = 일기담는통.회고목록;

JS_회고그리기기능();

  // 회고 목록으로 부드럽게 스크롤
  const 회고목록영역 = document.getElementById("HTML_회고목록영역");
  if (회고목록영역) {
    회고목록영역.scrollIntoView({ behavior: "smooth" });
  }