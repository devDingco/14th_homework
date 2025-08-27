
let 일기 = [];
const 저장된일기_페이지 = localStorage.getItem("일기목록");
const 일기목록_페이지 = JSON.parse(저장된일기_페이지 === null ? "[]" : 저장된일기_페이지);
const 마지막페이지 = Math.max(1, Math.ceil(일기목록_페이지.length / 12));

const 입력확인 = () => {
    const 제목 = document.getElementById("제목입력").value.trim();

    const 내용 = document.getElementById("내용입력").value.trim();

    const 기분 = document.querySelector("input[name='기분']:checked");
    const 등록버튼 = document.getElementById("등록하기");
    등록버튼.disabled = !(제목 && 내용 && 기분);
};

const 일기작성__등록 = () => {
    const 제목 = document.getElementById("제목입력").value;
    console.log("제목: " + 제목)

    const 내용 = document.getElementById("내용입력").value;
    console.log("내용: " + 내용)

    const 날짜 = new Date().toLocaleDateString();

    const 기분요소 = document.querySelector("input[name='기분']:checked");
    const 기분 = 기분요소 ? 기분요소.value : "none";

    const 일기저장 = { 제목, 내용, 기분, 날짜 };
    console.log("일기저장: " + 일기저장)

    // 기존 데이터 불러오기
    const 저장된일기 = localStorage.getItem("일기목록")
    console.log("저장된일기: " + 저장된일기)

    const 일기목록 = JSON.parse(저장된일기 === null ? "[]" : 저장된일기)
    console.log("일기목록: " + 일기목록)

    일기목록.push(일기저장)
    console.log(일기목록)

    localStorage.setItem("일기목록", JSON.stringify(일기목록))



    const 일기목록HTML = 일기목록.map((el, index) => `

    <div class="일기">
        <a href="./index-detailPage.html?number=${index}" >
            <div><img src="./assets/images/${el.기분}.png" alt="" class="기분카드"></div>
            <div>
                <div>${el.기분}</div>
                <div>${el.날짜}</div>
            </div>
            <div>${el.제목}</div>
        </a>
        <button class="일기삭제버튼" onclick="일기삭제(event, ${index})">X</button>
    </div>
    `).join("")


    document.getElementById("일기목록").innerHTML = 일기목록HTML

    document.getElementById("제목입력").value = "";
    document.getElementById("내용입력").value = "";
    // document.querySelector("input[name='기분']:checked") = false;
    입력확인();

    document.getElementById("모달등록완료").style.display = "block"

};

window.onload = () => {
    일기사이드바()
    페이지그리기(1)
    일기목록그리기(1)


    document.getElementById("일기보관함").style.textDecoration = "underline red"
    // document.getElementById("일기보관함").style.fontWeight = "700"
    document.getElementById("일기보관함").style.textUnderlineOffset = "8px"
    document.getElementById("일기보관함").style.textDecorationThickness = "2px"


    // 일기사이드바()
    // document.getElementById("일기목록").innerHTML = 일기목록불러오기()
    // const 저장된일기 = localStorage.getItem("일기목록")
    // const 일기목록 = JSON.parse(저장된일기 === null ? "[]" : 저장된일기)

    // // localStorage.setItem("일기목록",JSON.stringify(일기목록))
    // // 일기.push(일기저장);


    // const 일기목록HTML = 일기목록.map((el,index)=>`

    // <div class="일기">
    //     <a href="./index-detailPage.html?number=${index}" >
    //         <div><img src="./assets/images/${el.기분}.png" alt="" class="기분카드"></div>
    //         <div>
    //             <div>${el.기분}</div>
    //             <div>${el.날짜}</div>
    //         </div>
    //         <div>${el.제목}</div>
    //     </a>
    //     <button class="일기삭제버튼">X</button>
    // </div>
    // `).join("")


    // document.getElementById("일기목록").innerHTML = 일기목록HTML

};

const 플로팅버튼 = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
}

const 기분필터 = (event) => {
    // const 기분 =document.getElementById("기분필터").value
    // console.log(기분)

    const 저장된일기 = localStorage.getItem("일기목록")
    const 일기목록 = JSON.parse(저장된일기 === null ? "[]" : 저장된일기)

    const 셀렉기분 = event.target.value

    let 필터목록 = [];
    if (셀렉기분 === "all") {
        필터목록 = 일기목록;
    } else {
        필터목록 = 일기목록.filter(el => el.기분 === 셀렉기분);
    }

    const 일기목록HTML = 필터목록.map((el, index) => `

 <div class="일기">
        <a href="./index-detailPage.html?number=${index}" >
            <div><img src="./assets/images/${el.기분}.png" alt="" class="기분카드"></div>
            <div>
                <div>${el.기분}</div>
                <div>${el.날짜}</div>ㄴ
            </div>
            <div>${el.제목}</div>
        </a>
        <button class="일기삭제버튼" onclick="일기삭제(event, ${index})">X</button>
   </div>
    `).join("")


    document.getElementById("일기목록").innerHTML = 일기목록HTML

}

const 모달열기 = (모달종류) => {
    document.getElementById(모달종류).style = "display: block"
    console.log("모달열기호출", 모달종류)
}

const 모달닫기 = (모달종류) => {
    document.getElementById(모달종류).style = "display: none"
}


const 메뉴이동 = (클릭메뉴) => {
    const 일기버튼 = document.getElementById("일기보관함");
    const 사진버튼 = document.getElementById("사진보관함")

    switch (클릭메뉴) {
        case "일기클릭": {
            일기사이드바()
            일기목록불러오기()

            document.getElementById("일기보관함").style.textDecoration = "underline red"
            // document.getElementById("일기보관함").style.fontWeight = "700"
            document.getElementById("일기보관함").style.textUnderlineOffset = "8px"
            document.getElementById("일기보관함").style.textDecorationThickness = "2px"
            document.getElementById("사진보관함").style.textDecoration = "none"
            document.getElementById("사진보관함").style.fontWeight = "0"
            document.getElementById("사진보관함").style.textUnderlineOffset = "none"
            document.getElementById("사진보관함").style.textDecorationThickness = "none"

            break;
        }
        case "강아지클릭": {
            사진사이드바()
            강아지불러오는기능()
            document.getElementById("사진보관함").style.textDecoration = "underline red"
            // document.getElementById("사진보관함").style.fontWeight = "700"
            document.getElementById("사진보관함").style.textUnderlineOffset = "8px"
            document.getElementById("사진보관함").style.textDecorationThickness = "2px"
            document.getElementById("일기보관함").style.textDecoration = "none"
            document.getElementById("일기보관함").style.fontWeight = "0"
            document.getElementById("일기보관함").style.textUnderlineOffset = "none"
            document.getElementById("일기보관함").style.textDecorationThickness = "none"
            break;
        }
    }

}



// const 일기목록불러오기 = () => {
//     const 저장된일기 = localStorage.getItem("일기목록")
//     const 일기목록 = JSON.parse(저장된일기 === null ? "[]" : 저장된일기)

//     // localStorage.setItem("일기목록",JSON.stringify(일기목록))
//     // 일기.push(일기저장);


//     const 일기목록HTML = 일기목록.map((el, index) => `
//  <div class="일기목록" id="일기목록">
//     <div class="일기">
//         <a href="./index-detailPage.html?number=${index}" >
//             <div><img src="./assets/images/${el.기분}.png" alt="" class="기분카드"></div>
//             <div>
//                 <div>${el.기분}</div>
//                 <div>${el.날짜}</div>
//             </div>
//             <div>${el.제목}</div>
//         </a>
//         <button class="일기삭제버튼">X</button>
//     </div>
//       </div>
//     `).join("")


//     document.getElementById("일기메인").innerHTML = 일기목록HTML
// }

const 일기목록불러오기 = () => {
    const 저장된일기 = localStorage.getItem("일기목록")
    const 일기목록 = JSON.parse(저장된일기 === null ? "[]" : 저장된일기)

    // localStorage.setItem("일기목록",JSON.stringify(일기목록))
    // 일기.push(일기저장);


    const 일기목록HTML = `
    <div class="일기목록" id="일기목록">

    ${일기목록.map((el, index) => `
 
    <div class="일기">
        <a href="./index-detailPage.html?number=${index}" >
            <div><img src="./assets/images/${el.기분}.png" alt="" class="기분카드"></div>
            <div>
                <div>${el.기분}</div>
                <div>${el.날짜}</div>
            </div>
            <div>${el.제목}</div>
        </a>
        <button class="일기삭제버튼" onclick="일기삭제(event, ${index})">X</button>
    </div>
     
    `).join("")}
    </div>`;


    document.getElementById("일기메인").innerHTML = 일기목록HTML
}

const 일기사이드바 = () => {
    document.getElementById("필터일기등록").innerHTML =
        `
                <div class="필터서치바">
                    <select name="" id="기분필터" onchange="기분필터(event)">
                        <option value="all">전체</option>
                        <option value="happy">행복해요</option>
                        <option value="sad">슬퍼요</option> 
                        <option value="surprised">놀랐어요</option>
                        <option value="angry">화나요</option>
                        <option value="other">기타</option>
                    </select>
                    <div class="서치바">
                        <img src="./assets/icons/search.png" alt="" class="서치바아이콘">
                        <input type="text" placeholder="검색어를 입력하세요" class="서치바인풋" oninput="검색기능(event)">
                    </div>
                </div>

                    

                    <div>
                        <button onclick="모달열기('일기작성모달')" class="일기쓰기버튼">+ 일기쓰기</button>
                    </div>`

}

let 타이머 = ""

검색기능 = (event) => {
    clearTimeout(타이머)

    타이머 = setTimeout(() => {
        const 제목검색 = event.target.value

        const 저장된일기 = localStorage.getItem("일기목록")
        const 일기목록 = JSON.parse(저장된일기 === null ? "[]" : 저장된일기)

        const 검색결과 = 일기목록.filter(el => el.제목.includes(제목검색))
        console.log(검색결과)
        const HTML = `
        <div class="일기목록" id="일기목록">
        ${검색결과.map((el, index) => `
            <div class="일기">
        <a href="./index-detailPage.html?number=${index}" >
            <div><img src="./assets/images/${el.기분}.png" alt="" class="기분카드"></div>
            <div>
                <div>${el.기분}</div>
                <div>${el.날짜}</div>
            </div>
            <div>${el.제목}</div>
        </a>
        <button class="일기삭제버튼" onclick="일기삭제(event,${index})">X</button>
    </div>


        `).join("")}
        </div>`

        document.getElementById("일기메인").innerHTML = HTML

    }, 1000)

}

let 삭제할일기 = ""
const 일기삭제 = (event, index) => {
    모달열기('일기삭제모달그룹');
    삭제할일기 = index;
}

const 일기삭제버튼 = () => {

    const 저장된일기 = localStorage.getItem("일기목록")
    const 일기목록 = JSON.parse(저장된일기)
    console.log(일기목록)

    const 삭제후일기목록 = 일기목록.splice(삭제할일기, 1)
    console.log(삭제후일기목록)
    console.log(일기목록)

    localStorage.setItem("일기목록", JSON.stringify(일기목록))

    일기목록불러오기()
}

let 시작페이지 = 1
// const 저장된일기 = localStorage.getItem("일기목록")
// const 일기목록 = JSON.parse(저장된일기 === null ? "[]" : 저장된일기)
// const 마지막페이지 = Math.ceil(일기목록.length / 10)

const 이전페이지 = () => {
    if (시작페이지 === 1) {
        alert("시작페이지입니다.")
    } else {
        시작페이지 = 시작페이지 - 12

        페이지그리기(시작페이지)
        일기목록그리기(시작페이지)
    }
}

const 다음페이지 = () => {
    const 저장된일기 = localStorage.getItem("일기목록")
    const 일기목록 = JSON.parse(저장된일기 === null ? "[]" : 저장된일기)
    const 마지막페이지 = Math.ceil(일기목록.length / 12)
    console.log(일기목록)
    console.log("마지막페이지 = " + 마지막페이지)
    if (시작페이지 + 12 <= 마지막페이지) {
        시작페이지 = 시작페이지 + 12
    } else {
        alert("마지막페이지입니다.")
    }
}

const 페이지그리기 = (클릭한페이지) => {
    const 페이지 = new Array(12).fill("라떼")

    const 페이지들 = 페이지.map((el, index) => {
        const 페이지번호 = 시작페이지 + index

        return 페이지번호 <= 마지막페이지 ? `
            <button onclick="일기목록그리기(${페이지번호}); 페이지그리기(${페이지번호});"
            class=${클릭한페이지 === 페이지번호 ? "빨강색" : ""}
            >
            ${페이지번호}
            </button>
        `
            : ``
    }).join("")

    document.getElementById("페이지네이션").innerHTML = 페이지들

}

const 일기목록그리기 = (클릭한페이지) => {
    const 저장된일기 = localStorage.getItem("일기목록")
    const 저장된일기목록 = JSON.parse(저장된일기 === null ? "[]" : 저장된일기)
    const 일기목록 = 저장된일기목록
    const 시작인덱스 = (클릭한페이지 - 1) * 12;
    const 끝인덱스 = 시작인덱스 + 12;

    // 현재 페이지에 표시할 데이터
    const 페이지목록 = 일기목록.slice(시작인덱스, 끝인덱스);

    // })
    // 목록 HTML
    const 일기목록HTML = `
  <div class="일기목록" id="일기목록">
    ${페이지목록.map((el, idx) => `
      <div class="일기">
        <a href="./index-detailPage.html?number=${시작인덱스 + idx}">
          <div><img src="./assets/images/${el.기분}.png" alt="" class="기분카드"></div>
          <div>
            <div>${el.기분}</div>
            <div>${el.날짜}</div>
          </div>
          <div>${el.제목}</div>
        </a>
        <button class="일기삭제버튼" onclick="일기삭제(event, ${시작인덱스 + idx})">X</button>
      </div>
    `).join("")}
  </div>

`;

    document.getElementById("일기메인").innerHTML = 일기목록HTML;
};



