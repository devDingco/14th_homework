
let 일기 = [];

const 입력확인 = () => {
    const 제목 = document.getElementById("제목입력").value.trim();
    const 내용 = document.getElementById("내용입력").value.trim();
    const 기분 = document.querySelector("input[name='기분']:checked");
    const 등록버튼 = document.getElementById("등록하기");
    등록버튼.disabled = !(제목 && 내용 && 기분);
};

const 일기작성__등록 = () => {
    const 제목 = document.getElementById("제목입력").value;
    const 내용 = document.getElementById("내용입력").value;
    const 날짜 = new Date().toLocaleDateString();
    const 기분요소 = document.querySelector("input[name='기분']:checked");
    const 기분 = 기분요소 ? 기분요소.value : "none";

    const 일기저장 = { 제목, 내용, 기분, 날짜 };

    // 기존 데이터 불러오기
    const 저장된일기 = localStorage.getItem("일기목록")
    const 일기목록 = JSON.parse(저장된일기 === null ? "[]" : 저장된일기)

    일기목록.push(일기저장)
   
    localStorage.setItem("일기목록",JSON.stringify(일기목록))
    // 일기.push(일기저장);

    
    const 일기목록HTML = 일기목록.map((el,index)=>`
    <div class="일기">
        <a href="./index-detailPage.html?number=${index}">
            <div><img src="./assets/images/${el.기분}.png" alt=""></div>
            <div>
                <div>${el.기분}</div>
                <div>${el.날짜}</div>
            </div>
            <div>${el.제목}</div>
            </a>
        </div>
    `).join("")
    

    document.getElementById("일기목록").innerHTML = 일기목록HTML

    document.getElementById("제목입력").value = "";
    document.getElementById("내용입력").value = "";
    // document.querySelector("input[name='기분']:checked") = false;
    
    입력확인();

};

window.onload = () => {
    const 저장된일기 = localStorage.getItem("일기목록")
    const 일기목록 = JSON.parse(저장된일기 === null ? "[]" : 저장된일기)

    // localStorage.setItem("일기목록",JSON.stringify(일기목록))
    // 일기.push(일기저장);

    
    const 일기목록HTML = 일기목록.map((el,index)=>`
    <div class="일기">
        <a href="./index-detailPage.html?number=${index}">
            <div><img src="./assets/images/${el.기분}.png" alt=""></div>
            <div>
                <div>${el.기분}</div>
                <div>${el.날짜}</div>
            </div>
            <div>${el.제목}</div>
            </a>
        </div>
    `).join("")
    

    document.getElementById("일기목록").innerHTML = 일기목록HTML

};

// window.onload = () => {
//     입력확인(); // 페이지 로드시 등록 버튼 초기 상태 설정
// };
// const 일기목록 = document.querySelector(".일기목록");
// 일기목록.innerHTML = ""; // 기존 지우기

// for (let i = 0; i < 일기.length; i++){''
//     document.innerHTML = `
//         <div>
//             <div><img src="./assets/images/&{일기[i].기분}.png" alt=""></div>
//             <div>
//                 <div>&{일기[i].기분}</div>
//                 <div>&{일기[i].날짜}</div>
//             </div>
//             <div>&{일기[i].[제목]}</div>
//         </div>
                           
//     `;

// }


