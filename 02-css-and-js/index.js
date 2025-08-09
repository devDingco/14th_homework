const 일기들 = [];

const 일기입력하기 = () =>{
const 일기리스트 = localStorage.getItem("일기목록")
  const 일기목록배열 = JSON.parse(일기리스트 === null ? "[]" : 일기리스트)
  // 2. 배열을 반복해서 태그 만들기 (그리기)
  const 일기목록HTML = 일기목록배열.map((el,index)=>`
      <div class="바디__메인섹션__아티클섹션__일기칸__일기장">
        <a href="./sub.html?number=${index}">     
                        <img 
                        src="./assets/images/${el.감정}.png" 
                        alt="">
                        </a> 
          <div>
           <span>${el.감정}</span> 
           <span>${el.날짜}</span>
         </div> 
          <h2>${el.제목}</h2>
        </div>
  `).join("") // map 뒤에서 바로 조인하는것도 가능함 => 친구목록html.join("") 동일
  //3. html 최종 삽입하기
  
    document.getElementById("일기칸").innerHTML = 일기목록HTML
}
 
window.onload = 일기입력하기

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

  일기들.push(입력한일기)
  localStorage.setItem("일기목록",JSON.stringify(일기들))

  일기입력하기()

}
  
  

// const 일기조회기능 = () =>{
//   // 1. 친구목록 로컬스토리지에서 가져오기
//   const 일기들 = localStorage.getItem("일기목록")
//   const 일기목록배열 = JSON.parse(일기들 === null ? "[]" : 일기들)
//   // 2. 배열을 반복해서 태그 만들기 (그리기)
//   const 일기목록HTML = 일기목록배열.map((el,index)=>`
//       <div class="바디__메인섹션__아티클섹션__일기칸__일기장">
//          <img 
//             src="./assets/images/일기1.png" 
//              alt="" 
//               onclick='상세정보보기(${JSON.stringify(입력한일기)})'>
//           <div>
//            <span>${감정}</span> 
//            <span>${날짜}</span>
//          </div> 
//           <h2>${제목}</h2>
//         </div>
//   `).join("") // map 뒤에서 바로 조인하는것도 가능함 => 친구목록html.join("") 동일
//   //3. html 최종 삽입하기
//   document.getElementById("일기칸").innerHTML = 일기목록HTML
// }

// function 일기등록(){
//     const 감정 = document.querySelector('input[name="감정"]:checked').value;
//     const 제목 = document.getElementById("입력한제목").value;
//     const 내용 = document.getElementById("입력한내용").value;
    
    
//     const 오늘 = new Date();
//     const 년 = 오늘.getFullYear();
//     const 월 = String(오늘.getMonth() + 1).padStart(2, '0');
//     const 일 = String(오늘.getDate()).padStart(2, '0');
    
//     const 날짜 = `${년}.${월}.${일}`

//     const 입력한일기 ={
//         감정: 감정, 제목: 제목, 내용: 내용 ,날짜: 날짜 
//     }
//    일기목록.push(입력한일기)
//    console.log("추가되었습니다") 
   
//     if(감정 ==="슬픔"){
//         document.getElementById("일기칸").innerHTML += `
//         <div class="바디__메인섹션__아티클섹션__일기칸__일기장">
//          <img 
//             src="./assets/images/일기1.png" 
//              alt="" 
//               onclick='상세정보보기(${JSON.stringify(입력한일기)})'>
//           <div>
//            <span>${감정}</span> 
//            <span>${날짜}</span>
//          </div> 
//           <h2>${제목}</h2>
//         </div>`;
//     }else if(감정 ==="놀람"){
//         document.getElementById("일기칸").innerHTML += `
//         <div class="바디__메인섹션__아티클섹션__일기칸__일기장">
//          <img  
//             src="./assets/images/일기2.png" 
//              alt="" 
//               onclick='상세정보보기(${JSON.stringify(입력한일기)})'>
//           <div>
//            <span>${감정}</span> 
//            <span>${날짜}</span>
//          </div> 
//           <h2>${제목}</h2>
//         </div>`;
//     }else if(감정 === "화남"){
//         document.getElementById("일기칸").innerHTML += `
//         <div class="바디__메인섹션__아티클섹션__일기칸__일기장">
//          <img 
//             src="./assets/images/일기3.png" 
//              alt="" 
//               onclick='상세정보보기(${JSON.stringify(입력한일기)})'>
//           <div>
//            <span>${감정}</span> 
//            <span>${날짜}</span>
//          </div> 
//           <h2>${제목}</h2>
//         </div>`;
//     }else if(감정 === "행복"){
//         document.getElementById("일기칸").innerHTML += `
//         <div class="바디__메인섹션__아티클섹션__일기칸__일기장">
//          <img 
//             src="./assets/images/일기4.png" 
//              alt="" 
//               onclick='상세정보보기(${JSON.stringify(입력한일기)})'>
//           <div>
//            <span>${감정}</span> 
//            <span>${날짜}</span>
//          </div> 
//           <h2>${제목}</h2>
//         </div>`;
//     }else{
//         document.getElementById("일기칸").innerHTML += `
//         <div class="바디__메인섹션__아티클섹션__일기칸__일기장">
//          <img 
//             src="./assets/images/일기5.png" 
//              alt="" 
//               onclick='상세정보보기(${JSON.stringify(입력한일기)})'>
//           <div>
//            <span>${감정}</span> 
//            <span>${날짜}</span>
//          </div> 
//           <h2>${제목}</h2>
//         </div>`;
//     }


   
// }

 function 상세정보보기(일기목록) {
    alert(`제목: ${일기목록.제목}, 내용: ${일기목록.내용}, 날짜: ${일기목록.날짜}, 감정: ${일기목록.감정}`);
}

localStorage.setItem