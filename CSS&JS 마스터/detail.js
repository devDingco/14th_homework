const 쿼리스트링 = window.location.search;
const 잘게나누어담은통 = new URLSearchParams(쿼리스트링);
console.log(잘게나누어담은통)
const 일기번호 = 잘게나누어담은통.get("number");

const 스토리지에저장된일기목록 = window.localStorage.getItem("전달할것") ?? "[]";
const 일기목록 = JSON.parse(스토리지에저장된일기목록);

const 일기담는통 = 일기목록[일기번호];

function movePageWithQueryString() {
  let queryString = "?name=edit"; // 이동할 페이지에 전달할 쿼리 문자열
  let baseUrl = "./edit.html"; // 이동할 기본 페이지 경로
  window.location.href = baseUrl + queryString; // URL 변경 및 이동
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

// console.log(일기담는통.제목)
// console.log(일기담는통.날짜)

// document.getElementById("frame_84").innerHTML = 일기담는통.감정;
document.getElementById("타이틀").innerHTML = 일기담는통.제목;
document.getElementById("내용").innerHTML = 일기담는통.내용;
document.getElementById("date").innerHTML = 일기담는통.날짜;
document.getElementById("HTML_기분이미지보여주는곳").src = 이미지경로;
document.getElementById("frame_84").innerHTML = 기분메시지;
document.getElementById("frame_84").style.color =
  글자색;
