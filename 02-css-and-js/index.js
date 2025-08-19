const 일기들 = [];  

window.onload = () => {
  console.log("민지의 다이어리에 오신 것을 환영합니다.");
  
  // 1. 시작하면 일기 목록에 그리기
  일기입력하기();
};

window.onscroll = function () {
  const selectElement = document.getElementById("드랍다운제목ID");
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
          <div class="바디__메인섹션__아티클섹션__일기칸__일기장__일기정보">
            <div class="바디__메인섹션__아티클섹션__일기칸__일기장__일기정보__감정날짜">
              
              ${el.감정 === "행복해요"
                ? '<span class="바디__메인섹션__아티클섹션__일기칸__일기장__일기정보__감정__행복">행복해요</span>'
                : ""
              }
              ${el.감정 === "슬퍼요"
                ? '<span class="바디__메인섹션__아티클섹션__일기칸__일기장__일기정보__감정__슬픔">슬퍼요</span>'
                : ""
              }
              ${el.감정 === "놀랐어요"
                ? '<span class="바디__메인섹션__아티클섹션__일기칸__일기장__일기정보__감정__놀람">놀랐어요</span>'
                : ""
              }
              ${el.감정 === "화나요"
                ? '<span class="바디__메인섹션__아티클섹션__일기칸__일기장__일기정보__감정__화남">화나요</span>'
                : ""
              }
              ${el.감정 === "기타"
                ? '<span class="바디__메인섹션__아티클섹션__일기칸__일기장__일기정보__감정__기타">기타</span>'
                : ""
              }
              
              <span class="바디__메인섹션__아티클섹션__일기칸__일기장__일기정보__날짜">${el.날짜}</span>
            </div>
            <h2 class="바디__메인섹션__아티클섹션__일기칸__일기장__제목">${el.제목}</h2>
          </div> 
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
const 내가선택한필터 = event.target.value
console.log(event.target) 
let 필터된 = 일기목록배열

if(내가선택한필터 === "전체선택"){
  필터된 = 일기목록배열
  
}
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
          <div class="바디__메인섹션__아티클섹션__일기칸__일기장__일기정보">
            <div class="바디__메인섹션__아티클섹션__일기칸__일기장__일기정보__감정날짜">
              
              ${el.감정 === "행복해요"
                ? '<span class="바디__메인섹션__아티클섹션__일기칸__일기장__일기정보__감정__행복">행복해요</span>'
                : ""
              }
              ${el.감정 === "슬퍼요"
                ? '<span class="바디__메인섹션__아티클섹션__일기칸__일기장__일기정보__감정__슬픔">슬퍼요</span>'
                : ""
              }
              ${el.감정 === "놀랐어요"
                ? '<span class="바디__메인섹션__아티클섹션__일기칸__일기장__일기정보__감정__놀람">놀랐어요</span>'
                : ""
              }
              ${el.감정 === "화나요"
                ? '<span class="바디__메인섹션__아티클섹션__일기칸__일기장__일기정보__감정__화남">화나요</span>'
                : ""
              }
              ${el.감정 === "기타"
                ? '<span class="바디__메인섹션__아티클섹션__일기칸__일기장__일기정보__감정__기타">기타</span>'
                : ""
              }
              
              <span class="바디__메인섹션__아티클섹션__일기칸__일기장__일기정보__날짜">${el.날짜}</span>
            </div>
            <h2 class="바디__메인섹션__아티클섹션__일기칸__일기장__제목">${el.제목}</h2>
          </div> 
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



const 필터바꾸기기능 = (선택한것) => {
  const 필터섹션 = document.querySelector(".바디__메인섹션__필터섹션");
  const 강아지필터섹션 = document.querySelector(".강아지필터섹션");
  
  switch(선택한것){
    case "일기" : 필터섹션.style.display = "flex";
    강아지필터섹션.style.display = "none";
    break
    case "강아지" : 필터섹션.style.display = "none";
    강아지필터섹션.style.display = "flex";
    
  }
};


const 이미지선택변경 = (event) => {
  const 선택값 = event.target.value;
  
  if (선택값 === "기본") {
    이미지불러오는기능();  // 기존 기본형 이미지
  } else if (선택값 === "가로") {
    가로형이미지불러오는기능();
  } else if (선택값 === "세로") {
    세로형이미지불러오는기능();
  }
}


  document.getElementById("이미지형태선택")
  .addEventListener("change", 이미지선택변경);

  
function 이미지불러오는기능(){

  // document.getElementById("이미지나오는곳").innerHTML = `<div class="스켈레톤"></div>`;
    fetch("https://dog.ceo/api/breeds/image/random/10").then((받아온결과) =>{
        받아온결과.json().then((객체만결과)=>{
            console.log(객체만결과)
            // document.getElementById("메뉴보여주는곳").innerHTML = 일기메뉴
            const 이미지다운로드주소배열 = 객체만결과.message
            const 상태 = 객체만결과.status
            console.log(`이미지다운로드주소배열 : ${이미지다운로드주소배열}`)
            console.log(`상태 : ${상태}`)

            document.getElementById("이미지나오는곳").innerHTML = 이미지다운로드주소배열.map(el => { return `
               <img class="바디__메인섹션_아티클섹션__일기칸__일기장__강아지이미지" src="${el}" >`
            }).join("")
            
        })
    })
}

function 가로형이미지불러오는기능(){
  //document.getElementById("이미지나오는곳").innerHTML = `<div class="스켈레톤"></div>`;
    fetch("https://dog.ceo/api/breeds/image/random/10").then((받아온결과) =>{
        받아온결과.json().then((객체만결과)=>{
            console.log(객체만결과)
            // document.getElementById("메뉴보여주는곳").innerHTML = 일기메뉴
            const 이미지다운로드주소배열 = 객체만결과.message
            const 상태 = 객체만결과.status
            console.log(`이미지다운로드주소배열 : ${이미지다운로드주소배열}`)
            console.log(`상태 : ${상태}`)
            document.getElementById("일기칸").innerHTML = `
             <div id="이미지나오는곳">
             </div>`
            document.getElementById("이미지나오는곳").innerHTML = 이미지다운로드주소배열.map(el => { return `
               <img class="바디__메인섹션_아티클섹션__일기칸__일기장__가로형이미지" src="${el}" >`
            }).join("")
            
        })
    })
    
}
function 세로형이미지불러오는기능(){
  //document.getElementById("이미지나오는곳").innerHTML = `<div class="스켈레톤"></div>`;
    fetch("https://dog.ceo/api/breeds/image/random/10").then((받아온결과) =>{
        받아온결과.json().then((객체만결과)=>{
            console.log(객체만결과)
            // document.getElementById("메뉴보여주는곳").innerHTML = 일기메뉴
            const 이미지다운로드주소배열 = 객체만결과.message
            const 상태 = 객체만결과.status
            console.log(`이미지다운로드주소배열 : ${이미지다운로드주소배열}`)
            console.log(`상태 : ${상태}`)
            document.getElementById("일기칸").innerHTML = `
             <div id="이미지나오는곳">
             </div>`

            document.getElementById("이미지나오는곳").innerHTML = 이미지다운로드주소배열.map(el => { return `
               <img class="바디__메인섹션_아티클섹션__일기칸__일기장__세로형이미지" src="${el}" >`
            }).join("")
            
        })
    })
}

const 일기메뉴스타일기능 = () =>{
  document.getElementById("일기메뉴").classList.add("선택된메뉴")
  document.getElementById("강아지메뉴").classList.remove("선택된메뉴")
}
const 강아지메뉴스타일기능 = () =>{
  document.getElementById("강아지메뉴").classList.add("선택된메뉴")
  document.getElementById("일기메뉴").classList.remove("선택된메뉴")
}


function 메뉴이동하기(내가클릭한것){
  switch(내가클릭한것){
    case "일기":
        일기입력하기();
        필터바꾸기기능('일기');
        일기메뉴스타일기능();
        break;
    case "강아지":
   document.getElementById("일기칸").innerHTML = `
    <div id="이미지나오는곳">
    <div class="스켈레톤"></div>
    </div>
  `
   
   이미지불러오는기능();
   필터바꾸기기능('강아지');
   강아지메뉴스타일기능();
}
}

const 선택기능 = (event) => {
  document.getElementById("드랍다운제목ID").style = `--필터변수 : "${event.target.id}"`
  document.getElementById("드랍다운제목ID").click()
}




        
            let 타이머 = "아직실행안함"
const 검색기능 = (event) =>{
            const 일기리스트 = localStorage.getItem("일기목록")
            const 일기목록배열 = JSON.parse(일기리스트 === null ? "[]" : 일기리스트)
            
            clearTimeout(타이머)
            타이머 = setTimeout(() => {
                const 내가검색한단어 = event.target.value
                const 검색결과들 = 일기목록배열.filter( (el) => { return el.제목.includes(내가검색한단어)})
                const 검색된일기목록HTML = 검색결과들.map((el,index)=>`
      <div class="바디__메인섹션__아티클섹션__일기칸__일기장">
        <a href="./sub.html?number=${index}">     
          <img 
            src="./assets/images/${el.감정}.png" alt="">
          <div class="바디__메인섹션__아티클섹션__일기칸__일기장__일기정보">
            <div class="바디__메인섹션__아티클섹션__일기칸__일기장__일기정보__감정날짜">
              
              ${el.감정 === "행복해요"
                ? '<span class="바디__메인섹션__아티클섹션__일기칸__일기장__일기정보__감정__행복">행복해요</span>'
                : ""
              }
              ${el.감정 === "슬퍼요"
                ? '<span class="바디__메인섹션__아티클섹션__일기칸__일기장__일기정보__감정__슬픔">슬퍼요</span>'
                : ""
              }
              ${el.감정 === "놀랐어요"
                ? '<span class="바디__메인섹션__아티클섹션__일기칸__일기장__일기정보__감정__놀람">놀랐어요</span>'
                : ""
              }
              ${el.감정 === "화나요"
                ? '<span class="바디__메인섹션__아티클섹션__일기칸__일기장__일기정보__감정__화남">화나요</span>'
                : ""
              }
              ${el.감정 === "기타"
                ? '<span class="바디__메인섹션__아티클섹션__일기칸__일기장__일기정보__감정__기타">기타</span>'
                : ""
              }
              
              <span class="바디__메인섹션__아티클섹션__일기칸__일기장__일기정보__날짜">${el.날짜}</span>
            </div>
            <h2 class="바디__메인섹션__아티클섹션__일기칸__일기장__제목">${el.제목}</h2>
          </div> 
        </a> 
        <img src="./assets/icons/삭제버튼.png" onclick="일기삭제기능(event, ${index})" class="바디__메인섹션__아티클섹션__일기칸__일기장__삭제버튼">
      </div>
  `).join("") // map 뒤에서 바로 조인하는것도 가능함 => 친구목록html.join("") 동일
  //3. html 최종 삽입하기
    document.getElementById("일기칸").innerHTML = 검색된일기목록HTML
            }, 1000);

        }
        
        
          let 타이머2 = "아직실행안함"
        window.addEventListener("scroll",()=>{
            if(타이머2==="아직실행안함"){
                const 스크롤합 = document.documentElement.scrollTop + document.documentElement.clientHeight
                 
                const 전체스크롤 = document.documentElement.scrollHeight
                
                if(전체스크롤 === 스크롤합){
                  fetch("https://dog.ceo/api/breeds/image/random/10").then((받아온결과) =>{
                                   받아온결과.json().then((이미지다운로드주소배열) =>{
                                     const 이미지배열 = 이미지다운로드주소배열.message;
                                    document.getElementById("이미지나오는곳").innerHTML += 이미지배열.map(el => { return `
                                        <img class="바디__메인섹션_아티클섹션__일기칸__일기장__강아지이미지" src="${el}" >`
                                     }).join("")
            
                                    })
                                })
                }
                타이머 = setTimeout(() => {
                    타이머2 = "아직실행안함"                  
                }, 1000);
            }
        })