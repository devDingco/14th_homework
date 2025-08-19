window.onload = () => {
    console.log("민지의 다이어리에 오신 것을 환영합니다.");

    // 0.시작하면 일기 목록에 그리기 
 일기그리기기능();



};

//스크롤내릴시필터색반전
window.addEventListener("scroll", () => {
    const 스크롤내려간길이 = window.scrollY;

    if(스크롤내려간길이 > 0) {
        document.getElementById("필터버튼").style = "filter: invert(100%);";
    } else {
        document.getElementById("필터버튼").style = "filter: invert(0%);";
    }
});


// 1. 스토리지에 저장된 일기목록 가져오기
const 일기그리기기능 = () => {
    const 스토리지에저장된일기목록 =
        window.localStorage.getItem("민지의일기보관함") ?? "[]"
    const 일기목록 = JSON.parse(스토리지에저장된일기목록);

//2.일기목록 화면에 새롭게 전체 그리기
    let 새로운일기도화지 = "";                          

    for (let index = 0; index < 일기목록.length; index++) {
        const el = 일기목록[index];
        새로운일기도화지 += `
        <a href="../일기상세/일기상세_메인.html?number=${index}">                
                <div class="메인_바디_일기장_일기저장_">
                    <div class="메인_바디_일기장_일기저장_사진">
                            ${el.기분 === "행복"
                        ? '<img class="메인_바디_일기장_일기저장_사진" src="../images/joy.png" >'
                        : ""
                    }
                            ${el.기분 === "슬픔"
                        ? '<img class="메인_바디_일기장_일기저장_사진" src="../images/sad.png" >'
                        : ""
                    }
                            ${el.기분 === "놀람"
                        ? '<img class="메인_바디_일기장_일기저장_사진" src="../images/surprise.png" >'
                        : ""
                    }
                            ${el.기분 === "화남"
                        ? '<img class="메인_바디_일기장_일기저장_사진" src="../images/angry.png" >'
                        : ""
                    }
                            ${el.기분 === "기타"
                        ? '<img class="메인_바디_일기장_일기저장_사진" src="../images/etc.png" >'
                        : ""
                    }
                    <img class="메인_바디_일기장_삭제버튼" src="../icons/delete.svg" onclick="일기삭제기능(event, ${index})">
                    </div>
                    <div class= "메인_바디_일기장_일기저장_내용_감정과날짜">
                            ${el.기분 === "행복"
                        ? `<div class="메인_바디_일기장_일기저장_내용_감정_행복해요">행복해요</div>`
                        : ""
                    }
                        ${el.기분 === "슬픔"
                        ? `<div class="메인_바디_일기장_일기저장_내용_감정_슬퍼요">슬퍼요</div>`
                        : ""
                    }
                        ${el.기분 === "놀람"
                        ? `<div class="메인_바디_일기장_일기저장_내용_감정_놀랐어요">놀랐어요</div>`
                        : ""
                    }
                        ${el.기분 === "화남"
                        ? `<div class="메인_바디_일기장_일기저장_내용_감정_화나요">화나요</div>`
                        : ""
                    }
                        ${el.기분 === "기타"
                        ? `<div class="메인_바디_일기장_일기저장_내용_감정_기타">기타</div>`
                        : ""
                    } 
                        <div class="메인_바디_일기장_일기저장_내용_날짜"> ${el.작성일} </div>
                    </div>
                    <div class="메인_바디_일기장_일기저장_1_설명_타이틀"> ${el.제목} </div>
                </div>
                
            </div>
        </a>     
    `;
    }

    window.document.getElementById("일기목록").innerHTML =
        새로운일기도화지;

};

const 일기목록 = [];

const 글쓰기기능 = () => {
    
    const date = new Date();                                //날짜 자동으로 가져오는거

   // 0.글쓰는 날의 날짜 자동추가 
    const 날짜자동추가 = {
        year: date.getFullYear(),
        month: (date.getMonth() + 1).toString().padStart(2, "0"),
        date: date.getDate(),
    };


    // 1. 내가 쓴 일기내용 가져오기

    const 제목담는박스 = document.getElementById("제목입력창").value;
    const 내용담는박스 = document.getElementById("내용입력창").value;
    const 날짜담는박스 = 날짜자동추가.year + ". " + 날짜자동추가.month + ". " + 날짜자동추가.date;
    
    let 기분담는박스;
    const 기분선택버튼목록 = document.querySelectorAll('#기분상태체크 input[name="기분상태"]');

    for (let i = 0; i < 기분선택버튼목록.length; i++) {
        const el = 기분선택버튼목록[i]
        if (el.checked) 기분담는박스 = el.value;
    }

    
    // 2.일기목록에 일기 추가하기
    const 일기담는박스 = {
        제목: 제목담는박스,
        내용: 내용담는박스,
        기분: 기분담는박스,
        작성일: 날짜담는박스,
    };

    const 스토리지에저장된일기목록 =
        window.localStorage.getItem("민지의일기보관함") ?? "[]";
    const 일기목록 = JSON.parse(스토리지에저장된일기목록);
    일기목록.push(일기담는박스);
    window.localStorage.setItem("민지의일기보관함", JSON.stringify(일기목록));

    일기그리기기능();                                // ->화면에서 목록을 새로그리면서 새로고침없이 바로 업데이트 된 일기 내용 확인 가능하게 하는 기능
                                                  // 즉, 데이터 저장 → 화면 반영의 연결 다리 역할 
    
    window.document.getElementById("기분상태체크").value = "행복"
    window.document.getElementById("제목입력창").value = ""
    window.document.getElementById("내용입력창").value = ""                                         
}

const 글보기기능 = (일기번호받기) => {
    const 일기담는박스 = 일기목록[일기번호받기];
    const 제목담는박스 = 일기담는박스.제목;
    const 내용담는박스 = 일기담는박스.내용;

    alert(`
        제목: ${제목담는박스}
        내용: ${내용담는박스}
    `)

    location.href = `../일기상세/일기상세_메인.html?일기번호=${일기번호받기}`;
};

const 필터링기능 = (event) => {
 const 선택한내용 = event.target.value;

 const 스토리지에저장된일기목록 = 
    window.localStorage.getItem("민지의일기보관함") ?? "[]"
 const 일기목록 = JSON.parse(스토리지에저장된일기목록);
 let 필터링된일기목록;

 if (선택한내용 === "행복선택" ) {
        필터링된일기목록 = 일기목록.filter ((el) => el.기분 === "행복")
    } else if (선택한내용 === "슬픔선택") {
        필터링된일기목록 = 일기목록.filter ((el) => el.기분 === "슬픔")
    } else if (선택한내용 === "놀람선택") {
        필터링된일기목록 = 일기목록.filter ((el) => el.기분 === "놀람")
    } else if (선택한내용 === "화남선택") {
        필터링된일기목록 = 일기목록.filter ((el) => el.기분 === "화남")
    } else if (선택한내용 === "기타선택") {
        필터링된일기목록 = 일기목록.filter ((el) => el.기분 === "기타")
    } else {
        필터링된일기목록 = 일기목록
    };

 const 새로운일기도화지 = 필터링된일기목록
    .map (
        (el, index) => `
            <a href="../일기상세/일기상세_메인.html?number=${index}">                
            <div class="메인_바디_일기장_일기저장_">
                <div class="메인_바디_일기장_일기저장_사진">
                        ${el.기분 === "행복"
                    ? '<img class="메인_바디_일기장_일기저장_사진" src="../images/joy.png" >'
                    : ""
                    }
                        ${el.기분 === "슬픔"
                    ? '<img class="메인_바디_일기장_일기저장_사진" src="../images/sad.png" >'
                    : ""
                    }
                        ${el.기분 === "놀람"
                    ? '<img class="메인_바디_일기장_일기저장_사진" src="../images/surprise.png" >'
                    : ""
                    }
                        ${el.기분 === "화남"
                    ? '<img class="메인_바디_일기장_일기저장_사진" src="../images/angry.png" >'
                    : ""
                    }
                        ${el.기분 === "기타"
                    ? '<img class="메인_바디_일기장_일기저장_사진" src="../images/etc.png" >'
                    : ""
                    }
                </div>
                <div class= "메인_바디_일기장_일기저장_내용_감정과날짜">
                        ${el.기분 === "행복"
                    ? `<div class="메인_바디_일기장_일기저장_내용_감정_행복해요">행복해요</div>`
                    : ""
                    }
                    ${el.기분 === "슬픔"
                    ? `<div class="메인_바디_일기장_일기저장_내용_감정_슬퍼요">슬퍼요</div>`
                    : ""
                    }
                    ${el.기분 === "놀람"
                    ? `<div class="메인_바디_일기장_일기저장_내용_감정_놀랐어요">놀랐어요</div>`
                    : ""
                    }
                    ${el.기분 === "화남"
                    ? `<div class="메인_바디_일기장_일기저장_내용_감정_화나요">화나요</div>`
                    : ""
                    }
                    ${el.기분 === "기타"
                    ? `<div class="메인_바디_일기장_일기저장_내용_감정_기타">기타</div>`
                    : ""
                    } 
                    <div class="메인_바디_일기장_일기저장_내용_날짜"> ${el.작성일} </div>
                </div>
                <div class="메인_바디_일기장_일기저장_1_설명_타이틀"> ${el.제목} </div>
                <img class="메인_바디_일기장_삭제버튼" src="../icons/delete.svg" onclick="일기삭제기능(event, ${index})">
            </div>
            
            </a>     
    `
    )
    .join("");
    document.getElementById("일기목록").innerHTML =
        새로운일기도화지;
};

const 화면맨위로올리기기능 = () => {
    window.scrollTo({ top:0, behavior: "smooth"});
};



const 일기삭제기능 = (event, 일기번호) => {
// 1. 하위 태그들한테 기능 적용되는 거 막기 
    event.preventDefault();
//저장되어 있는 일기목록 불러오기
    const 스토리지에저장된일기목록 =
      window.localStorage.getItem("민지의일기보관함");
    const 일기목록 = 스토리지에저장된일기목록 
    ? JSON.parse(스토리지에저장된일기목록) : [];

//2.클릭된 일기번호 삭제하기
    const 삭제후일기목록 = 일기목록.filter((_, index) => index !== 일기번호);

//3.삭제후 남은 목록들 다시 저장하기
    window.localStorage.setItem("민지의일기보관함", JSON.stringify(삭제후일기목록));
    alert("삭제되었습니다.");

//4.삭제후 남은 목록들 화면에 다시 띄우기
    일기그리기기능();
}









    
// // 일기쓰기 칸에 들어가는 내용들 변수명 추가
// const 기분선택 = document.querySelectorAll('input[name="기분상태"]');
// const 제목 = document.getElementById('제목을입력해주세요');
// const 내용 = document.getElementById('내용을입력해주세요');
// const 등록하기버튼 = document.getElementById('메인_바디_일기장_일기쓰기_등록하기')

// // // 버튼 활성화 여부를 위한 체크
// function 버튼활성화를위한체크폼() {
//     const 기분버튼 = document.querySelector('input[name="기분상태"]:checked')
//     const 제목입력체크 = 제목.value.trim()!== '';
//     const 내용입력체크 = 내용.value.trim()!== '';
    
//     if (기분버튼 && 제목입력체크 && 내용입력체크) {
//         등록하기버튼.disabled = false;
//         등록하기버튼.style.backgroundColor = 'red'
//     } else {
//         등록하기버튼.disabled = true;
//         등록하기버튼.style.backgroundColor = 'black'
//     }
// }

