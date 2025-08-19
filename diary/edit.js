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

  // 디테일 => 편집 으로 넘어왔을 때 제목인풋과 내용인풋 채우는거
  document.getElementById("제목인풋").value = 일기담는통.제목;
  document.getElementById("내용인풋").value = 일기담는통.내용;

  const 기분라디오목록 = document.getElementsByName("감정");

  for (let i = 0; i < 기분라디오목록.length; i++) {
    if (기분라디오목록[i].value === 일기담는통.감정) {
      기분라디오목록[i].checked = true;
    }
  }
  댓글그리기기능();
};

const 수정취소기능 = () => {
  const 쿼리스트링 = window.location.search;
  const 잘게나누어담은통 = new URLSearchParams(쿼리스트링);
  const 일기번호 = 잘게나누어담은통.get("number");
  // 다시 돌아가기
  location.replace(`./detail.html?number=${일기번호}`);
};

const 수정하기기능 = () => {
  const 쿼리스트링 = window.location.search; // =>  ?number=0
  const 잘게나누어담은통 = new URLSearchParams(쿼리스트링);
  const 일기번호 = 잘게나누어담은통.get("number"); // => 0
  // 스토리지에 저장된 일기목록 불러오기
  const 로컬스토리지에저장된일기목록 =
    localStorage.getItem("지윤이의일기목록") ?? "[]"; // getItem으로 "지윤이의일기목록"(key)의 value를 가져옴 만약 비어있으면  오른쪽 값 "[]"이것을 반환함
  const 일기목록 = JSON.parse(로컬스토리지에저장된일기목록);

  const 수정된제목 = document.getElementById("제목인풋").value;
  const 수정된내용 = document.getElementById("내용인풋").value;
  // let 수정된감정 = document.getElementsByName("감정").forEach((el) => {
  //   if (el.checked === true) {
  //     el.value;
  //   }
  // });
  const 수정된감정 = document.querySelector('input[name="감정"]:checked').value;

  let 수정된이미지담는통 = "";
  if (수정된감정 === "행복해요") {
    수정된이미지담는통 = "./images/happy.png";
  } else if (수정된감정 === "슬퍼요") {
    수정된이미지담는통 = "./images/sad.png";
  } else if (수정된감정 === "놀랐어요") {
    수정된이미지담는통 = "./images/surprised.png";
  } else if (수정된감정 === "화나요") {
    수정된이미지담는통 = "./images/angry.png";
  } else if (수정된감정 === "기타") {
    수정된이미지담는통 = "./images/guitar.png";
  }

  일기목록[일기번호] = {
    감정: 수정된감정,
    제목: 수정된제목,
    내용: 수정된내용,
    작성일: 일기목록[일기번호].작성일,
    이미지: 수정된이미지담는통,
  };

  console.log(수정된감정);
  localStorage.setItem("지윤이의일기목록", JSON.stringify(일기목록));

  location.replace(`./detail.html?number=${일기번호}`);
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
