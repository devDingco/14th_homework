const 저장된일기 = localStorage.getItem("일기목록")
const 일기목록 = JSON.parse(저장된일기 === null ? "[]" : 저장된일기)

// localStorage.setItem("일기목록",JSON.stringify(일기목록))
// 일기.push(일기저장);
 

const 일기메뉴 = 일기목록.map((el,index)=>`



<div class="일기">
    <a href="./index-detailPage.html?number=${index}" >
        <div><img src="./assets/images/${el.기분}.png" alt="" class="기분카드"></div>
        <div>
            <div>${el.기분}</div>
            <div>${el.날짜}</div>
        </div>
        <div>${el.제목}</div>
    </a>
    <button class="일기삭제버튼">X</button>
</div>
`).join("")


// document.getElementById("일기목록").innerHTML = 일기목록HTML