window.onload = () => {
    console.log("민지의 다이어리에 오신 것을 환영합니다.");

    일기그리기기능();
}
const 등록하기 = document.getElementById("createPostButton");


const 일기그리기기능 = () => {
    
    const 스토리지에저장된일기목록 = localStorage.getItem("전달할것") ?? "[]";

    const 일기목록 = JSON.parse(스토리지에저장된일기목록);

    const HTML_새로운일기도화지 = 일기목록.map(
        (el,index) => ` 
                        <a href="./detail.html?number=${index}">
                        <div class="frame_25">
                                ${el.감정 === "행복해요" ? '<img class="frame_47" src="./assets/happy.png" alt="행복" />' : ""}
                                ${el.감정 === "슬퍼요" ? '<img class="frame_47" src="./assets/sad.png" alt="행복" />' : ""}
                                ${el.감정 === "놀랐어요" ? '<img class="frame_47" src="./assets/surprised.png" alt="행복" />' : ""}
                                ${el.감정 === "화나요" ? '<img class="frame_47" src="./assets/mad.png" alt="행복" />' : ""}
                                ${el.감정 === "기타" ? '<img class="frame_47" src="./assets/etc.png" alt="행복" />' : ""}
                            
                            <div class="frame_26">
                                <div class="frame_27">
                                    <div class="mood">${el.감정}</div>
                                    <div class="작성날짜">${el.날짜}</div>   
                                </div>
                                <div class="frame_24">
                                    ${el.제목}
                                </div>
                            </div>
                        </div>
                        </a>
        `   
    ).join("");
    document.getElementById("frame_106").innerHTML = HTML_새로운일기도화지;
}

const 일기목록 = [];

const 글쓰기기능 = () =>{
    const 감정 = document.getElementsByName('feel');
    let 전달감정 = ''
    for (let i = 0; i < 감정.length; i++) {
        if (감정[i].checked) {
            전달감정 = 감정[i].id
        }
    }
    const 원래있는거 = JSON.parse(localStorage.getItem("전달할것"))

    const 제목 = document.getElementById("input_63").value;
    const 내용 = document.getElementById("input_63_2").value;
    const 날짜 = new Date().toLocaleDateString();
    const newPostId = 원래있는거 === null ? 1 : 원래있는거.length + 1;

    const 전달할것 = {
    'id' : newPostId,
    '감정' : 전달감정,
    '제목' : 제목,
    '내용' : 내용,
    '날짜' : 날짜
    }

    const 로컬스토리지빈지확인 = JSON.parse(localStorage.getItem("전달할것"))
    const 로컬스토리지넣어야지 = 로컬스토리지빈지확인 ?? []

    로컬스토리지넣어야지.push(전달할것)

    localStorage.setItem("전달할것", JSON.stringify(로컬스토리지넣어야지))

    document.getElementById("frame_106").innerHTML = `
                        <div class="frame_25">
                            <div class="frame_47"></div>
                            <div class="frame_26">
                                <div class="frame_27">
                                    <div class="mood">슬퍼요</div>
                                    <div class="작성날짜">2024.03.12</div>   
                                </div>
                                <div class="frame_24">
                                    타이틀 영역 입니다. 한줄까지만 노출 됩니다.
                                </div>
                            </div>
                        </div>
    `
    일기그리기기능();
}

// const JS_필터링기능 = (event) => {
//     const 선택한내용 = event.target.value;
  
//     const 스토리지에저장된일기목록 =
//       window.localStorage.getItem("전달할것") ?? "[]";
//     const 일기목록 = JSON.parse(스토리지에저장된일기목록);
//     let 필터링된일기목록;
  
//     switch (선택한내용) {
//       case "HTML_행복선택": {
//         필터링된일기목록 = 일기목록.filter((el) => el.기분 === "행복");
//         break;
//       }
//       case "HTML_슬픔선택": {
//         필터링된일기목록 = 일기목록.filter((el) => el.기분 === "슬픔");
//         break;
//       }
//       case "HTML_놀람선택": {
//         필터링된일기목록 = 일기목록.filter((el) => el.기분 === "놀람");
//         break;
//       }
//       case "HTML_화남선택": {
//         필터링된일기목록 = 일기목록.filter((el) => el.기분 === "화남");
//         break;
//       }
//       case "HTML_기타선택": {
//         필터링된일기목록 = 일기목록.filter((el) => el.기분 === "기타");
//         break;
//       }
//       default: {
//         필터링된일기목록 = 일기목록;
//         break;
//       }
//     }
  
//     const HTML_새로운일기도화지 = 필터링된일기목록
//       .map(
//         (el, index) => `
//           <a href="./detail.html?number=${index}">
//             <div class="CSS_일기">
//               <div class="CSS_일기사진">
//                 ${el.기분 === "행복"
//             ? '<img class="CSS_기분이미지" src="./assets/images/joy.png" alt="행복" />'
//             : ""
//           }
//                 ${el.기분 === "슬픔"
//             ? '<img class="CSS_기분이미지" src="./assets/images/sadness.png" alt="슬픔" />'
//             : ""
//           }
//                 ${el.기분 === "놀람"
//             ? '<img class="CSS_기분이미지" src="./assets/images/surprised.png" alt="놀람" />'
//             : ""
//           }
//                 ${el.기분 === "화남"
//             ? '<img class="CSS_기분이미지" src="./assets/images/anger.png" alt="화남" />'
//             : ""
//           }
//                 ${el.기분 === "기타"
//             ? '<img class="CSS_기분이미지" src="./assets/images/idontknownothing.png" alt="기타" />'
//             : ""
//           }
//               </div>
//               <div class="CSS_일기정보">
//                 <div class="CSS_일기내용">
//                   ${el.기분 === "행복"
//             ? `<div class="CSS_기분 CSS_행복">행복해요</div>`
//             : ""
//           }
//                   ${el.기분 === "슬픔"
//             ? `<div class="CSS_기분 CSS_슬픔">슬퍼요</div>`
//             : ""
//           }
//                   ${el.기분 === "놀람"
//             ? `<div class="CSS_기분 CSS_놀람">놀랐어요</div>`
//             : ""
//           }
//                   ${el.기분 === "화남"
//             ? `<div class="CSS_기분 CSS_화남">화나요</div>`
//             : ""
//           }
//                   ${el.기분 === "기타"
//             ? `<div class="CSS_기분 CSS_기타">기타</div>`
//             : ""
//           }
//                   <div class="CSS_날짜">${el.작성일}</div>
//                 </div>
//                 <div class="CSS_일기제목"> ${el.제목}</div>
//               </div>
//               <img class="CSS_삭제버튼" src="./assets/images/deleteButton.png" onclick="JS_일기삭제기능(event, ${index})" />
//             </div>
//           </a>
//         `
//       )
//       .join("");
//     window.document.getElementById("HTML_일기보여주는곳").innerHTML =
//       HTML_새로운일기도화지;
//   };