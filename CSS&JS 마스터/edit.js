const 버튼비틀어 = () => {
    document.getElementById("1번버튼").style = "transform: rotateZ(30deg);"
}

const 저장된정보 = localStorage.getItem('전달할것')

const 정보 = JSON.parse(저장된정보)

const 쿼리스트링 = location.search
const 잘게나누어담은통 = new URLSearchParams(쿼리스트링)
const 일기번호상자 = 잘게나누어담은통.get("edit")

const 스토리지에저장된일기목록 = window.localStorage.getItem("전달할것") ?? "[]";
const 일기목록 = JSON.parse(스토리지에저장된일기목록);

const 일기담는통 = 일기목록[일기번호상자];

// 로컬 스토리지에서 값 가져오기
const storedValue = 저장된정보.checked

document.getElementsByName("feel").forEach((el) => {
    if (el.id === 일기담는통.감정) 
        el.checked = true;
  });

// const 라디오인풋 = document.querySelectorAll('input[name="feel"]');
const 인풋 = document.getElementById("frame_63");
const 인풋2 = document.getElementById("frame_63_2");


if (일기담는통.제목) {
    인풋.value = 일기담는통.제목;
}

if (일기담는통.내용) {
    인풋2.value = 일기담는통.내용;
}

const 수정완료하기기능 = () => {
    // 1. 주소에서 일기번호 가져오기
    const 쿼리스트링 = window.location.search;
    const 잘게나누어담은통 = new URLSearchParams(쿼리스트링);
    const 일기번호 = 잘게나누어담은통.get("edit");
  
    // 2. 스토리지에 저장된 일기목록 가져오기
    const 스토리지에저장된일기목록 =
      window.localStorage.getItem("전달할것") ?? "[]";
    const 일기목록 = JSON.parse(스토리지에저장된일기목록);
  
    // 3. 변경된 일기 새로운 통에 담기
    const 수정된제목담는통 =
      window.document.getElementById("frame_63").value;
    const 수정된내용담는통 =
      window.document.getElementById("frame_63_2").value;
    let 수정된기분담는통;
    window.document.getElementsByName("feel").forEach((el) => {
      if (el.checked) 
        수정된기분담는통 = el.id;
    });
  
    일기목록[일기번호] = {
      id: 일기목록[일기번호].id,
      제목: 수정된제목담는통,
      내용: 수정된내용담는통,
      감정: 수정된기분담는통,
      날짜: 일기목록[일기번호].날짜,
    };
    window.localStorage.setItem("전달할것", JSON.stringify(일기목록));
  
    // 4. 상세페이지로 돌아가기
    location.replace(`./detail.html?number=${일기번호}`);

    // 5. 비틀어버려 !!!!
    document.getElementById(비틀기).style = "transform: rotateZ(30deg);"
  };