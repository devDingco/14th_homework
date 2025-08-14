window.onload = () => {
    console.log("민지의 다이어리에 오신 것을 환영합니다.");

    // 0.시작하면 일기 목록에 그리기 
 일기그리기기능();
};

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
}                                                   // 즉, 데이터 저장 → 화면 반영의 연결 다리 역할       

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
    } else {
        필터링된일기목록 = 일기목록;
    }

 const 새로운일기도화지 = 필터링된일기목록
    .map (
        (el, index) => `
            <a href="../일기상세/일기상세_메인.html?number=${index}">                
            <div class="메인_바디_일기장_일기저장_">
                <div class="메인_바디_일기장_일기저장_사진">
                        ${el.기분 === "행복"
                    ? '<img class="메인_바디_일기장_일기저장_사진" src="../images/joy .png" >'
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
            </div>
            </a>     
    `
    )
    .join("");
    document.getElementById("일기목록").innerHTML =
        새로운일기도화지;
}





// let 일기보관함 = [];
// // 일기장 배열에 새로운 일기 객체들 추가하기

// const 새로운일기 = {
//     기분상태: 기분,
//     제목: 제목,
//     내용: 내용,
// }
// 일기보관함.push(새로운일기);
// console.log(일기보관함)



//추가한 일기 데이터 저장해놓기//


// let 일기목록 = [];

// const 등록버튼 = document.querySelector(".메인_바디_일기장_일기쓰기_등록하기");
//   if (등록버튼) {
//   }

//   일기보관함.push(새일기);


// const 일기상세내용들 = () => {
//     const 기분 = document.getElementsBy ("기분상태")[0].value;
//     const 제목 = document.getElementsByClassName("제목을입력해주세요")[0].value;
//     const 내용 = document.getElementsByClassName("내용을입력해주세요")[0].value;
// }
// console.log(일기상세내용들)

// function 카드클릭시일기보이기 (작성된일기항목) {
//     const 일기장 = [작성된일기항목];
//     alert(
//         `기분: ${일기상세내용들.기분} 
//         제목 : ${일기상세내용들.제목을입력해주세요}
//         내용 : ${일기상세내용들.내용을입력해주세요}
//         `
//     );
//   }

// function 일기뒤에추가하기 (){
    
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



// // const 일기장추가 = [새로운일기]


// // const 일기등록하기 = () => {
// //     document.getElementById("일기장전체틀").innerHTML= `
// //     <div class="메인_바디_일기장_일기저장_A">
// //         <img src="../images/8aed48b7b19da762c846d560f8bfcde81d4efdc5.png" class="메인_바디_일기장_일기저장_사진">
// //         <div class="메인_바디_일기장_일기저장_내용">
// //             <div class="메인_바디_일기장_일기저장_내용_감정과날짜">
// //                 <div class="메인_바디_일기장_일기저장_내용_감정_슬퍼요"> $ </div>
// //                 <div class="메인_바디_일기장_일기저장_내용_날짜"> 2024.03.12 </div>
// //             </div>
// //             <div class="메인_바디_일기장_일기저장_설명_타이틀"> ${일기보관함[0].내용}
// //             </div>
// //         </div>
// //     </div>`

// //     console.log(일기등록하기).data

// }