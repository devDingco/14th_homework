window.onload = () => {
    console.log("민지의 다이어리에 오신 것을 환영합니다.");

    일기그리기기능();
}
const 등록하기 = document.getElementById("createPostButton");

window.addEventListener("scroll", () => {
    const 스크롤내려간길이 = window.scrollY

    if(스크롤내려간길이 > 0) {
        window.document.getElementById("드롭다운새거").style = "filter: invert(100%);"
    } else {
        document.getElementById("드롭다운새거").style = "filter: invert(0%);"
    }
})

const 위로 = () =>{
    window.scrollTo({top: 0, behavior: "smooth"})
    window.document.getElementById("드롭다운새거").style = "filter: invert(100%);"
}

let 현재삭제할일기번호 = null;

const JS_일기삭제기능 = (event, 일기번호) => {
    event.preventDefault();
    위로();
    document.body.style.overflow = "hidden";
    모달열기("HTML_일기삭제모달그룹")
    // const 스토리지에저장된일기목록 = window.localStorage.getItem("전달할것");
    // const 일기목록 = 스토리지에저장된일기목록 ? JSON.parse(스토리지에저장된일기목록) : [];
    // // 2. 클릭된 일기번호 삭제하기
    // const 삭제후일기목록 = 일기목록.filter((_, index) => index !== 일기번호);
    // // 3. 삭제된 일기목록 다시 저장하기
    // window.localStorage.setItem("전달할것", JSON.stringify(삭제후일기목록));
    // // 4. 삭제된 일기목록 화면에 다시 그리기
    // 일기그리기기능();

    JS_모달열기기능("HTML_일기삭제모달그룹");
    현재삭제할일기번호 = 일기번호;
    }
    
const JS_모달열기기능 = (모달종류) => {
      window.document.getElementById(모달종류).style = "display: block";
      window.scrollTo({
        top: 0,
      });
      document.body.style.overflow = "hidden";
    };
    
    const JS_일기삭제확인기능 = () => {
      const 스토리지에저장된일기목록 =
        window.localStorage.getItem("전달할것") ?? "[]";
      const 일기목록 = JSON.parse(스토리지에저장된일기목록);
    
      if (현재삭제할일기번호 !== null) {
        // 1. 클릭된 일기번호 삭제하기
    
        // 2. 삭제된 일기목록 다시 저장하기
        const 삭제후일기목록 = 일기목록.filter(
          (_, index) => index !== 현재삭제할일기번호
        );
    
        // 2. 삭제된 일기목록 다시 저장하기
        window.localStorage.setItem(
          "전달할것",
          JSON.stringify(삭제후일기목록)
        );
    
        // 3. 삭제된 일기목록 화면에 다시 그리기
        일기그리기기능();
    
        // 4. 모달 닫기
        모달닫기("HTML_일기삭제모달그룹");
    
        // 5. 현재삭제할일기번호 초기화
        현재삭제할일기번호 = null;
      }
    };

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
                        <img class="삭제버튼" src="./assets/deleteButton.png" onclick="JS_일기삭제기능(event, ${index})" />
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

    일기그리기기능(); 
    일기작성모달('일기작성모달그룹ID');
}

const 일기작성모달 = (모달종류) => {
    document.getElementById(모달종류).style = "display: block";
    document.body.style.overflow = 'hidden';
}

const JS_필터링기능 = (event) => {
    const 선택한내용 = event.target.value;
  
    const 스토리지에저장된일기목록 =
      window.localStorage.getItem("전달할것") ?? "[]";
    const 일기목록 = JSON.parse(스토리지에저장된일기목록);
    let 필터링된일기목록;
  
    switch (선택한내용) {
      case "HTML_행복선택": {
        필터링된일기목록 = 일기목록.filter((el) => el.감정 === "행복해요");
        break;
      }
      case "HTML_슬픔선택": {
        필터링된일기목록 = 일기목록.filter((el) => el.감정 === "슬퍼요");
        break;
      }
      case "HTML_놀람선택": {
        필터링된일기목록 = 일기목록.filter((el) => el.감정 === "놀랐어요");
        break;
      }
      case "HTML_화남선택": {
        필터링된일기목록 = 일기목록.filter((el) => el.감정 === "화나요");
        break;
      }
      case "HTML_기타선택": {
        필터링된일기목록 = 일기목록.filter((el) => el.감정 === "기타");
        break;
      }
      default: {
        필터링된일기목록 = 일기목록;
        break;
      }
    }
  
    const HTML_새로운일기도화지 = 필터링된일기목록
      .map(
        (el, index) => `
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
                        <img class="삭제버튼" src="./assets/deleteButton.png" onclick="JS_일기삭제기능(event, ${index})" />
                        </a>
                        
        `
      )
      .join("");  /*JS_일기삭제기능(event, ${index})*/
    window.document.getElementById("frame_106").innerHTML =
      HTML_새로운일기도화지;
  };

  const 모달열기 = (모달종류) => {
    위로();
    document.getElementById(모달종류).style = "display: block";
    document.body.style.overflow = 'hidden';
}

  const 모달닫기 = (모달종류) => {
    document.getElementById(모달종류).style = "display: none"
    if(모달종류 === '등록완료모달그룹ID'){
        document.getElementById('등록모달그룹ID').style = "display: none"
        document.body.style.overflow = 'auto';
    }
    if(모달종류 === '등록취소모달그룹ID'){
      document.getElementById('등록취소모달그룹ID').style = "display: none"
      document.body.style.overflow = 'auto';
    }
    if(모달종류 === '등록닫기모달그룹ID'){
      document.getElementById('등록닫기모달그룹ID').style = "display: none"
      document.body.style.overflow = 'auto';
    }
    if(모달종류 === 'HTML_일기삭제모달그룹'){
      document.getElementById('HTML_일기삭제모달그룹').style = "display: none"
      document.body.style.overflow = 'auto';
    }
}
  const 모달전체닫기 = () => {
    document.getElementById('등록모달그룹ID').style = "display: none"
    document.getElementById('등록취소모달그룹ID').style = "display: none"
    document.getElementById('일기작성모달그룹ID').style = "display: none"
    document.body.style.overflow = 'auto';
  }

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      document.getElementById('등록모달그룹ID').style = "display: none"
      document.getElementById('등록취소모달그룹ID').style = "display: none"
      document.getElementById('일기작성모달그룹ID').style = "display: none"
    }
  });


  const 모달선택닫기 = (모달종류) => {
    document.getElementById(모달종류).style = "display: block";
    
  }
//   <img class="CSS_삭제버튼" src="./assets/images/deleteButton.png" onclick="JS_일기삭제기능(event, ${index})" />

//   const 모달선택닫기 = (모달종류) => {
//     document.getElementById(모달종류).style = "display: block";
//     document.body.style.overflow = 'hidden';
// }