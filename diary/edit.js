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
};

const 수정취소기능 = () => {
  const 쿼리스트링 = window.location.search;
  const 잘게나누어담은통 = new URLSearchParams(쿼리스트링);
  const 일기번호 = 잘게나누어담은통.get("number");
  // 다시 돌아가기
  location.replace(`./detail.html?number=${일기번호}`);
};

const 수정하기기능 = () => {
  const 수정된제목 = document.getElementById("제목인풋").value;
  const 수정된내용 = document.getElementById("내용인풋").value;
  // const 수정된감정 = document.getElementsByName("감정");

  일기목록[일기번호] = {
    제목: 수정된제목,
    내용: 수정된내용,
    // 기분: 수정된감정,
    작성일: 일기목록[일기번호].작성일,
  };

  localStorage.setItem("지윤이의일기목록", JSON.stringify(일기목록));

  location.replace(`./detail.html?number=${일기번호}`);
};
