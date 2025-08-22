window.onload = () => {
  // URL주소에서 일기번호가져오기
  일기그리기기능();
  댓글그리기기능();
};

const 일기그리기기능 = () => {
  const 쿼리스트링 = window.location.search; // =>  ?number=0
  const 잘게나누어담은통 = new URLSearchParams(쿼리스트링);
  const 일기번호 = 잘게나누어담은통.get("number"); // => 0
  // 스토리지에 저장된 일기목록 불러오기
  const 로컬스토리지에저장된일기목록 =
    localStorage.getItem("지윤이의일기목록") ?? "[]"; // getItem으로 "지윤이의일기목록"(key)의 value를 가져옴 만약 비어있으면  오른쪽 값 "[]"이것을 반환함
  const 일기목록 = JSON.parse(로컬스토리지에저장된일기목록);
  const 일기담는통 = 일기목록[일기번호];

  let 감정 = 일기담는통.감정;
  let 이미지경로 = "";
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

const 댓글등록기능 = () => {
  const date = new Date();

  const options = {
    year: date.getFullYear(),
    // toString <= 문자열로 반환  padStart(2,"0") <= 문자열의 길이가 2가 안되면 문자열 앞에 "0"을 붙여라
    month: (date.getMonth() + 1).toString().padStart(2, "0"),
    date: date.getDate().toString().padStart(2, "0"),
  };

  const 댓글담는통 = document.getElementById("댓글입력인풋").value;
  const 날짜담는통 = `[${options.year}. ${options.month}. ${options.date}]`;
  const 쿼리스트링 = window.location.search;
  const 잘게나누어담은통 = new URLSearchParams(쿼리스트링);
  const 일기번호 = 잘게나누어담은통.get("number");
  const 전체회고담는통 = {
    일기번호,
    댓글: 댓글담는통,
    날짜: 날짜담는통,
  };

  const 스토리지에저장된회고목록 =
    localStorage.getItem("지윤이의회고목록") ?? "[]";
  const 회고목록 = JSON.parse(스토리지에저장된회고목록);
  회고목록.push(전체회고담는통);
  localStorage.setItem("지윤이의회고목록", JSON.stringify(회고목록));

  const 회고번호 = 회고목록.length - 1;

  document.getElementById("댓글보이는곳").innerHTML = `
  <div class="댓글창__정렬__댓글">
  <div class="댓글창__정렬__댓글__추가">${회고목록[회고번호].댓글}</div>
          <div class="댓글창__정렬__댓글__날짜">${회고목록[회고번호].날짜}</div>
          </div>

          <div
            style="
              max-width: 1168px;
              width: 100%;
              height: 1px;
              background-color: #e4e4e4;
              margin-bottom: 12px;
            "></div>
  `;
  location.reload(true);
};

const 댓글그리기기능 = () => {
  const 쿼리스트링 = window.location.search; // =>  ?number=0
  const 잘게나누어담은통 = new URLSearchParams(쿼리스트링);
  const 일기번호 = 잘게나누어담은통.get("number");

  const 스토리지에저장된회고목록 =
    localStorage.getItem("지윤이의회고목록") ?? "[]";
  const 회고목록 = JSON.parse(스토리지에저장된회고목록);

  const 해당일기댓글 = 회고목록.filter((el) => el.일기번호 == 일기번호);

  document.getElementById("댓글보이는곳").innerHTML += 해당일기댓글
    .map(
      (el) => `
   <div class="댓글창__정렬__댓글">
    <div class="댓글창__정렬__댓글__추가">${el.댓글}</div>
    <div class="댓글창__정렬__댓글__날짜">${el.날짜}</div>
    </div>
    <div
    style="
       max-width: 1168px;
       width: 100%;
       height: 1px;
      background-color: #e4e4e4;
       margin-bottom: 12px;
        "></div>
    `
    )
    .join("");
};

const 복사하기기능 = () => {
  // 로컬스토리지에 저장된 일기목록 불러오기
  const 스토리지에저장된일기목록 =
    localStorage.getItem("지윤이의일기목록") ?? "[]";
  const 일기목록 = JSON.parse(스토리지에저장된일기목록);
  // 일기번호 불러오기
  const 쿼리스트링 = window.location.search; // =>  ?number=0
  const 잘게나누어담은통 = new URLSearchParams(쿼리스트링);
  const 일기번호 = 잘게나누어담은통.get("number");

  const 일기담는통 = 일기목록[일기번호];

  navigator.clipboard.writeText(일기담는통.내용);
  console.log(navigator.clipboard.writeText(일기담는통.내용));
  토스트메시지띄우기기능();
};

const 토스트메시지띄우기기능 = () => {
  document.getElementById("토스트메세지ID").style = "display:flex";

  setTimeout(() => {
    document.getElementById("토스트메세지ID").style = "display: none";
  }, 1000);
};

const 상세페이지일기삭제기능 = () => {
  const 쿼리스트링 = window.location.search;
  const 잘게나누어담은통 = new URLSearchParams(쿼리스트링);
  const 일기번호 = 잘게나누어담은통.get("number");
  const 삭제할일기번호 = 일기번호;
  console.log(typeof 삭제할일기번호);

  const 로컬스토리지에저장된일기목록 =
    localStorage.getItem("지윤이의일기목록") ?? "[]";
  const 일기목록 = JSON.parse(로컬스토리지에저장된일기목록);
  const 삭제하고남은일기목록 = 일기목록.filter((_, index) => {
    return index !== +삭제할일기번호; // + <= 숫자열로 바꾸는 방법
  });
  localStorage.setItem(
    "지윤이의일기목록",
    JSON.stringify(삭제하고남은일기목록)
  );

  location.href = "./index.html";
};

const 모달열기기능 = (모달종류) => {
  event.preventDefault();
  document.getElementById(모달종류).style = "display: block";
  // 스크롤 맨 위로 올리기
  scrollTo({
    top: 0,
  });
  document.body.style.overflow = "hidden";
};

const 모달닫기기능 = (모달종류) => {
  document.getElementById(모달종류).style = "display: none";
  scrollTo({
    top: 0,
  });
  document.body.style.overflow = "auto";
};
