const 일기들 = [];  

window.onload = () => {
  console.log("민지의 다이어리에 오신 것을 환영합니다.");
  
  // 1. 시작하면 일기 목록에 그리기
  일기입력하기();
};

window.onscroll = function () {
  const selectElement = document.getElementById("필터");
  if (document.body.scrollTop > 60 || document.documentElement.scrollTop > 60) {
    
    selectElement.classList.add("색상반전");
  } else {
    selectElement.classList.remove("색상반전");
  }
};

function 스크롤맨위로기능() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}




const 일기입력하기 = () =>{
const 일기리스트 = localStorage.getItem("일기목록")
  const 일기목록배열 = JSON.parse(일기리스트 === null ? "[]" : 일기리스트)
  // 2. 배열을 반복해서 태그 만들기 (그리기)
  const 일기목록HTML = 일기목록배열.map((el,index)=>`
      <div class="바디__메인섹션__아티클섹션__일기칸__일기장">
        <a href="./sub.html?number=${index}">     
          <img 
            src="./assets/images/${el.감정}.png" alt="">
          <div>
           <span>${el.감정}</span> 
           <span>${el.날짜}</span>
          </div> 
          <h2>${el.제목}</h2>
          </a> 
          <img src="./assets/icons/삭제버튼.png" onclick="일기삭제기능(event, ${index})" class="바디__메인섹션__아티클섹션__일기칸__일기장__삭제버튼">
      </div>
  `).join("") // map 뒤에서 바로 조인하는것도 가능함 => 친구목록html.join("") 동일
  //3. html 최종 삽입하기
  
    document.getElementById("일기칸").innerHTML = 일기목록HTML
}

const 필터링기능 = (event) =>{
  const 일기리스트 = localStorage.getItem("일기목록")
  const 일기목록배열 = JSON.parse(일기리스트 === null ? "[]" : 일기리스트)
  
  console.log(event.target) //내가 행동한 태그 => 셀렉트태그
  console.log(event.target.value) // 태그에서 밸류 선택
  console.log(일기들)
// const 일기들 = [ 
//   {감정 : "" , 날짜 ::"" 제목:""" 내용:""},


// ]
const 내가선택한필터 = event.target.value
console.log(event.target) 
let 필터된 = 일기목록배열

if(내가선택한필터 === "행복선택"){
  필터된 = 일기목록배열.filter(el => el.감정 === "행복해요")
  
}
if(내가선택한필터 === "슬픔선택"){
  필터된 = 일기목록배열.filter(el => el.감정 === "슬퍼요")
}
if(내가선택한필터 === "놀람선택"){
  필터된 = 일기목록배열.filter(el => el.감정 === "놀랐어요")
}
if(내가선택한필터 === "화남선택"){
  필터된 = 일기목록배열.filter(el => el.감정 === "화나요")
}
if(내가선택한필터 === "기타선택"){
  필터된 = 일기목록배열.filter(el => el.감정 === "기타")
}

const 필터된일기목록HTML = 필터된.map((el,index)=>`
      <div class="바디__메인섹션__아티클섹션__일기칸__일기장">
        <a href="./sub.html?number=${index}">     
          <img 
            src="./assets/images/${el.감정}.png" alt="">
          <div>
           <span>${el.감정}</span> 
           <span>${el.날짜}</span>
          </div> 
          <h2>${el.제목}</h2>
          </a> 
          <img src="./assets/icons/삭제버튼.png" onclick="일기삭제기능(event, ${index})" class="바디__메인섹션__아티클섹션__일기칸__일기장__삭제버튼">
      </div>
  `).join("") // map 뒤에서 바로 조인하는것도 가능함 => 친구목록html.join("") 동일
  //3. html 최종 삽입하기
    document.getElementById("일기칸").innerHTML = 필터된일기목록HTML
}

const 일기등록기능 = () =>{
    const 감정 = document.querySelector('input[name="감정"]:checked').value;
    const 제목 = document.getElementById("입력한제목").value;
    const 내용 = document.getElementById("입력한내용").value;

    const 오늘 = new Date();
    const 년 = 오늘.getFullYear();
    const 월 = String(오늘.getMonth() + 1).padStart(2, '0');
    const 일 = String(오늘.getDate()).padStart(2, '0');
    
    const 날짜 = `${년}.${월}.${일}`

    const 입력한일기 = {
      감정: 감정,
      제목: 제목,
      내용: 내용,
      날짜: 날짜
    }
    const 기존일기목록 = JSON.parse(localStorage.getItem("일기목록") || "[]");
    기존일기목록.push(입력한일기)
    localStorage.setItem("일기목록", JSON.stringify(기존일기목록));

    일기입력하기()

}
// 등록모달
const 등록모달열기 = () => {
  document.getElementById("등록모달ID").style = "display : block"
  document.body.style.overflow = "hidden";
}
const 등록모달닫기 = () => {
  document.getElementById("등록모달ID").style = "display : none" 
  document.body.style.overflow = "scroll";
}

//등록완료모달
const 등록완료모달열기 = () => {
  document.getElementById("등록완료모달ID").style = "display : block"
}
const 등록완료모달닫기 = () => {
  document.getElementById("등록완료모달ID").style = "display : none" 
}

//등록취소모달
const 등록취소모달열기 = () => {
  document.getElementById("등록취소모달ID").style = "display : block"
}
const 등록취소모달닫기 = () => {
  document.getElementById("등록취소모달ID").style = "display : none" 
}


// document.getElementById('등록완료버튼').addEventListener('click', () => {
//   일기등록기능();
//   등록완료모달닫기();
// });

//  function 상세정보보기(일기목록) {
//     alert(`제목: ${일기목록.제목}, 내용: ${일기목록.내용}, 날짜: ${일기목록.날짜}, 감정: ${일기목록.감정}`);
// }

function 일기삭제기능(event, 일기인덱스) {

  // 1. 이 버튼 하위에 있는 모든 태그들의 기본기능 막기 => <a /> 태그 이동 막기
  event.preventDefault();

  const 스토리지에저장된일기목록 =
    localStorage.getItem("일기목록");
  const 일기목록 = 스토리지에저장된일기목록
    ? JSON.parse(스토리지에저장된일기목록)
    : [];
  // 2. 클릭된 일기번호 삭제하기
  const 삭제후일기목록 = 일기목록.filter((_, index) => index !== 일기인덱스);
  // 3. 삭제된 일기목록 다시 저장하기
  localStorage.setItem("일기목록", JSON.stringify(삭제후일기목록));
  alert("삭제되었습니다.");
  // 4. 삭제된 일기목록 화면에 다시 그리기
  일기입력하기();
}

window.addEventListener("keydown",(event)=>{
  if(event.key === "Escape") {
    등록모달닫기();
  }
})

const 스크롤위로기능 = () => {
  window.scrollTo({
    top: 0,
  });
};