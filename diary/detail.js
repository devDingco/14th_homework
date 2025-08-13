window.onload = () => {
  // URL주소에서 일기번호가져오기
  const 쿼리스트링 = window.location.search; // =>  ?number=0
  const 잘게나누어담은통 = new URLSearchParams(쿼리스트링);
  const 일기번호 = 잘게나누어담은통.get("number"); // => 0
  // 스토리지에 저장된 일기목록 불러오기
  const 로컬스토리지에저장된일기목록 =
    localStorage.getItem("지윤이의일기목록") ?? "[]"; // getItem으로 "지윤이의일기목록"(key)의 value를 가져옴 만약 비어있으면  오른쪽 값 "[]"이것을 반환함
  const 일기목록 = JSON.parse(로컬스토리지에저장된일기목록);
  const 일기담는통 = 일기목록[일기번호];

  let 감정 = 일기담는통.감정;
  if (감정 === "행복해요") {
    이미지경로 = "./images/minihappy.png";
  } else if (감정 === "슬퍼요") {
    이미지경로 = "./images/minisad.png";
  } else if (감정 === "놀랐어요") {
    이미지경로 = "./images/minisurprised.png";
  } else if (감정 === "화나요") {
    이미지경로 = "./images/miniangry.png";
  } else if (감정 === "기타") {
    이미지경로 = "./images/miniguitar.png";
  }
  window.document.getElementById("디테일제목").innerHTML = 일기담는통.제목;
  window.document.getElementById("디테일감정").innerHTML = 일기담는통.감정;
  window.document.getElementById("디테일날짜").innerHTML = 일기담는통.작성일;
  window.document.getElementById("디테일내용").innerHTML = 일기담는통.내용;
  window.document.getElementById("이모지").src = 이미지경로;
};
const 수정하기기능 = () => {
  const 쿼리스트링 = window.location.search;
  const 잘게나누어담은통 = new URLSearchParams(쿼리스트링);
  const 일기번호 = 잘게나누어담은통.get("number");

  window.location.href = `./edit.html?number=${일기번호}`;
};
