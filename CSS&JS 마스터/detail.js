const 쿼리스트링 = window.location.search;
const 잘게나누어담은통 = new URLSearchParams(쿼리스트링);
const 일기번호 = 잘게나누어담은통.get("number");

const 스토리지에저장된일기목록 = window.localStorage.getItem("전달할것") ?? "[]";
const 일기목록 = JSON.parse(스토리지에저장된일기목록);

const 일기담는통 = 일기목록[일기번호];

// console.log(일기담는통.제목)
// console.log(일기담는통.날짜)


document.getElementById("타이틀").innerHTML = 일기담는통.제목;
document.getElementById("내용").innerHTML = 일기담는통.내용;
document.getElementById("date").innerHTML = 일기담는통.날짜;
