const 일기목록 = [];

function 일기등록(){
    const 감정 = document.querySelector('input[name="감정"]:checked').value;
    const 제목 = document.getElementById("입력한제목").value;
    const 내용 = document.getElementById("입력한내용").value;
    
    
    const 오늘 = new Date();
    const 년 = 오늘.getFullYear();
    const 월 = String(오늘.getMonth() + 1).padStart(2, '0');
    const 일 = String(오늘.getDate()).padStart(2, '0');
    
    const 날짜 = `${년}.${월}.${일}`

    const 입력한일기 ={
        감정: 감정, 제목: 제목, 내용: 내용 ,날짜: 날짜 
    }
   일기목록.push(입력한일기)
   console.log("추가되었습니다") 
   
    if(감정 ==="슬픔"){
        document.getElementById("일기칸").innerHTML += `
        <div class="바디__메인섹션__아티클섹션__일기칸__일기1">
         <img 
            src="./assets/images/일기1.png" 
             alt="" 
              onclick='상세정보보기(${JSON.stringify(입력한일기)})'>
          <div>
           <span>${감정}</span> 
           <span>${날짜}</span>
         </div> 
          <h2>${제목}</h2>
        </div>`;
    }else if(감정 ==="놀람"){
        document.getElementById("일기칸").innerHTML += `
        <div class="바디__메인섹션__아티클섹션__일기칸__일기2">
         <img 
            src="./assets/images/일기2.png" 
             alt="" 
              onclick='상세정보보기(${JSON.stringify(입력한일기)})'>
          <div>
           <span>${감정}</span> 
           <span>${날짜}</span>
         </div> 
          <h2>${제목}</h2>
        </div>`;
    }else if(감정 === "화남"){
        document.getElementById("일기칸").innerHTML += `
        <div class="바디__메인섹션__아티클섹션__일기칸__일기3">
         <img 
            src="./assets/images/일기3.png" 
             alt="" 
              onclick='상세정보보기(${JSON.stringify(입력한일기)})'>
          <div>
           <span>${감정}</span> 
           <span>${날짜}</span>
         </div> 
          <h2>${제목}</h2>
        </div>`;
    }else if(감정 === "행복"){
        document.getElementById("일기칸").innerHTML += `
        <div class="바디__메인섹션__아티클섹션__일기칸__일기4">
         <img 
            src="./assets/images/일기4.png" 
             alt="" 
              onclick='상세정보보기(${JSON.stringify(입력한일기)})'>
          <div>
           <span>${감정}</span> 
           <span>${날짜}</span>
         </div> 
          <h2>${제목}</h2>
        </div>`;
    }else{
        document.getElementById("일기칸").innerHTML += `
        <div class="바디__메인섹션__아티클섹션__일기칸__일기5">
         <img 
            src="./assets/images/일기5.png" 
             alt="" 
              onclick='상세정보보기(${JSON.stringify(입력한일기)})'>
          <div>
           <span>${감정}</span> 
           <span>${날짜}</span>
         </div> 
          <h2>${제목}</h2>
        </div>`;
    }


   
}

 function 상세정보보기(일기목록) {
    alert(`제목: ${일기목록.제목}, 내용: ${일기목록.내용}, 날짜: ${일기목록.날짜}, 감정: ${일기목록.감정}`);
}