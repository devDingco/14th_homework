
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
        <a href="./index-detailPage.html?number=${index}" class="기분카드">
            <div><img src="./assets/images/${el.기분}.png" alt=""></div>
            <div>
                <div>${el.기분}</div>
                <div>${el.날짜}</div>
            </div>
            <div>${el.제목}</div>
        </a>
        <button class="일기삭제버튼">X</button>
    </div>
    `).join("")
    

    document.getElementById("일기목록").innerHTML = 일기목록HTML

};

const 플로팅버튼 = () => {
    window.scrollTo({top: 0, behavior:"smooth"})
}

const 기분필터 = (event) => {
    // const 기분 =document.getElementById("기분필터").value
    // console.log(기분)

    const 저장된일기 = localStorage.getItem("일기목록")
    const 일기목록 = JSON.parse(저장된일기 === null ? "[]" : 저장된일기)

    const 셀렉기분 = event.target.value

    let 필터목록 = [];
    if(셀렉기분 === "all"){
        필터목록 = 일기목록;
    }else{
        필터목록 = 일기목록.filter(el => el.기분 === 셀렉기분);
    }

    const 일기목록HTML = 필터목록.map((el,index)=>`
    <div class="일기">
        <a href="./index-detailPage.html?number=${index}" class="기분카드">
            <div><img src="./assets/images/${el.기분}.png" alt=""></div>
            <div>
                <div>${el.기분}</div>
                <div>${el.날짜}</div>
            </div>
            <div>${el.제목}</div>
        </a>
        <button class="일기삭제버튼">X</button>
    </div>
    `).join("")
    

    document.getElementById("일기목록").innerHTML = 일기목록HTML

    }




