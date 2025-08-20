window.onload = () => {
    console.log("민지의 다이어리에 오신 것을 환영합니다.");
  
    // 1. 시작하면 일기 목록에 그리기
    JS_메뉴이동("일기");
  };
  
  window.onscroll = function () {
    const selectElement = document.querySelector(".filter");
  
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
      // 2. 스크롤이 조금이라도 내려갔으면? 배경색 변경하기
      selectElement.classList.add("inverted");
    } else {
      selectElement.classList.remove("inverted"); // 스크롤이 맨 위로 올라가면 원래 색으으로 복귀
    }
  };
  
window.addEventListener("scroll", () => {  
  const 보이는화면길이 = window.innerHeight
  const 위에서푸터까지길이 = document
    .getElementById("HTML_푸터")
    .getBoundingClientRect().top

  // 1. 푸터가 보일 때는, 화면과 상관없이 사진에 고정시키기
  if (보이는화면길이 >= 위에서푸터까지길이) {
    document.getElementById("HTML_플로팅버튼").style = `
      position: relative;
      bottom: 16rem;
      left: 47%;
    `;

    // 2. 푸터가 안보일 때는, 사진과 상관없이 화면에 고정시키기
  } else {
    document.getElementById("HTML_플로팅버튼").style = `
      position: fixed;
      bottom: 4rem;
      right: 2rem;
    `;
  }
});
  
const 스크롤길이 = () => {
  const 스크롤내려간길이 =
    window.document.getElementById("HTML_메인").scrollTop;

  // 2. 스크롤이 조금이라도 내려갔으면? 배경색 변경하기
  if (스크롤내려간길이 == 0) {
    window.document.getElementById("HTML_필터").style =
      "background-color: gray;";
  } else {
    window.document.getElementById("HTML_필터").style =
      "background-color: red;";
  }
};
  
const JS_일기그리기기능 = () => {
  // 1. 스토리지에 저장된 일기목록 가져오기
  const 스토리지에저장된일기목록 =
    window.localStorage.getItem("민지의일기목록") ?? "[]";
  const 일기목록 = JSON.parse(스토리지에저장된일기목록);

  // 2. 일기목록 화면에 새롭게 전체 그리기
  let HTML_새로운일기도화지 = "";

  for (let index = 0; index < 일기목록.length; index++) {
    const el = 일기목록[index];
    HTML_새로운일기도화지 += `
    <a href="./detail.html?number=${index}">
      <div class="card_area">
        <div class="diary_image">
          ${el.기분 === "행복"
            ? '<img class="mood_image" src="./assets/images/mood_happy.png" alt="행복" />'
            : ""}
          ${el.기분 === "슬픔"
            ? '<img class="mood_image" src="./assets/images/mood_sad.png" alt="슬픔" />'
            : ""}
          ${el.기분 === "놀람"
            ? '<img class="mood_image" src="./assets/images/mood_surprise.png" alt="놀람" />'
            : ""}
          ${el.기분 === "화남"
            ? '<img class="mood_image" src="./assets/images/mood_mad.png" alt="화남" />'
            : ""}
          ${el.기분 === "기타"
            ? '<img class="mood_image" src="./assets/images/mood_think.png" alt="기타" />'
            : ""}
        </div>
        <div class="diary_info">
          <div class="diary_content">
            ${el.기분 === "행복" ? `<div class="diary_mood CSS_행복">행복해요</div>` : ""}
            ${el.기분 === "슬픔" ? `<div class="diary_mood CSS_슬픔">슬퍼요</div>` : ""}
            ${el.기분 === "놀람" ? `<div class="diary_mood CSS_놀람">놀랐어요</div>` : ""}
            ${el.기분 === "화남" ? `<div class="diary_mood CSS_화남">화나요</div>` : ""}
            ${el.기분 === "기타" ? `<div class="diary_mood CSS_기타">기타</div>` : ""}
            <div class="diary_date">${el.작성일}</div>
          </div>
          <div class="diary_title">${el.제목}</div>
        </div>      

          <img class="delete_button" src="./assets/images/close_icon.png" onclick="JS_일기삭제기능(event, ${index})" />
      </div>
    </a>  
    `
  }

  window.document.getElementById("HTML_일기보여주는곳").innerHTML =
    HTML_새로운일기도화지;
  
};
  
  
const 일기목록 = [];

const JS_글쓰기기능 = () => {

  // 0. 현재 날짜 가져오기
  const date = new Date();

  const options = {
    year: date.getFullYear(),
    month: (date.getMonth()+ 1).toString().padStart(2, "0"),
    date: (date.getDate()).toString().padStart(2,"0"),
  };

  const date_area = options.year + ". "+ options.month + ". " + options.date;
  const title_area = window.document.getElementById("HTML_제목입력창").value;
  const content_area = window.document.getElementById("HTML_내용입력창").value; 

  let mood_area; 

  window.document.getElementsByName("HTML_기분선택버튼").forEach((el) => {
    if(el.checked) mood_area = el.value;
  })
  // const 기분선택버튼목록 =window.document.getElementsByName("HTML_기분선택버튼");

  // for (let i= 0; i< 기분선택버튼목록.length; i++) {
  //   const el = 기분선택버튼목록[i];
  //   if (el.checked) mood_area =el.value;
  // }

  const diary_area = {
    제목: title_area,
    내용: content_area,
    기분: mood_area,
    작성일: date_area
  };

  const 스토리지에저장된일기목록 =
    window.localStorage.getItem("민지의일기목록") ?? "[]";
  const 일기목록 = JSON.parse(스토리지에저장된일기목록);
  일기목록.push(diary_area);
  window.localStorage.setItem("민지의일기목록", JSON.stringify(일기목록));

  JS_일기그리기기능();
};

const JS_글보기기능 = (일기번호받는통) => {
  const diary_area = 일기목록[일기번호받는통];
  const title_area = diary_area.제목;
  const content_area = diary_area.내용;

  alert(`
    제목: ${title_area}
    내용: ${content_area}
  `);

  location.href = `./detail.html?일기번호=${일기번호받는통}`;
};
  
const JS_필터링기능 = (event) => {
  const 선택한내용 = event.target.value;

  const 스토리지에저장된일기목록 =
    window.localStorage.getItem("민지의일기목록") ?? "[]";
  const 일기목록 = JSON.parse(스토리지에저장된일기목록);
  let 필터링된일기목록;

  switch (선택한내용) {
    case "HTML_행복선택": {
      필터링된일기목록 = 일기목록.filter((el) => el.기분 === "행복");
      break;
    }
    case "HTML_슬픔선택": {
      필터링된일기목록 = 일기목록.filter((el) => el.기분 === "슬픔");
      break;
    }
    case "HTML_놀람선택": {
      필터링된일기목록 = 일기목록.filter((el) => el.기분 === "놀람");
      break;
    }
    case "HTML_화남선택": {
      필터링된일기목록 = 일기목록.filter((el) => el.기분 === "화남");
      break;
    }
    case "HTML_기타선택": {
      필터링된일기목록 = 일기목록.filter((el) => el.기분 === "기타");
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
          <div class="card_area">
            <div class="diary_image">
              ${
                el.기분 === "행복"
                  ? '<img class="CSS_mood_image" src="./assets/images/mood_happy.png" alt="행복" />'
                  : ""
              }
              ${
                el.기분 === "슬픔"
                  ? '<img class="CSS_mood_image" src="./assets/images/mood_sad.png" alt="슬픔" />'
                  : ""
              }
              ${
                el.기분 === "놀람"
                  ? '<img class="CSS_mood_image" src="./assets/images/mood_surprise.png" alt="놀람" />'
                  : ""
              }
              ${
                el.기분 === "화남"
                  ? '<img class="CSS_mood_image" src="./assets/images/mood_mad.png" alt="화남" />'
                  : ""
              }
              ${
                el.기분 === "기타"
                  ? '<img class="CSS_mood_image" src="./assets/images/mood_think.png" alt="기타" />'
                  : ""
              }
            </div>
            <div class="diary_info"> <div class="diary_content">
                ${
                  el.기분 === "행복"
                    ? `<div class="diary_mood CSS_행복">행복해요</div>`
                    : ""
                }
                ${
                  el.기분 === "슬픔"
                    ? `<div class="diary_mood CSS_슬픔">슬퍼요</div>`
                    : ""
                }
                ${
                  el.기분 === "놀람"
                    ? `<div class="diary_mood CSS_놀람">놀랐어요</div>`
                    : ""
                }
                ${
                  el.기분 === "화남"
                    ? `<div class="diary_mood CSS_화남">화나요</div>`
                    : ""
                }
                ${
                  el.기분 === "기타"
                    ? `<div class="diary_mood CSS_기타">기타</div>`
                    : ""
                }
                <div class="diary_date">${el.작성일}</div>
              </div>
              <div class="diary_title"> ${el.제목}</div>
            </div> <img class="delete_button" src="./assets/images/close_icon.png" onclick="JS_일기삭제기능(event, ${index})" />
          </div>
        </a>
      `
    )
    .join("");
  window.document.getElementById("HTML_일기보여주는곳").innerHTML =
    HTML_새로운일기도화지;
};
  
const JS_메뉴이동 = (메뉴) => {
  switch (메뉴) {
    case "일기": {
      window.document.getElementById("HTML_일기보관함메인").style =
      "display: block;";
      window.document.getElementById("HTML_사진보관함메인").style =
      "display: none;";
      window.document.getElementById("HTML_일기보관함필터").style =
      "display: flex";
      window.document.getElementById("HTML_사진보관함필터").style =
      "display: none;";
      window.document.getElementById("HTML_일기보관함탭").style = 
      "border-bottom: 0.2rem solid #000;";
      window.document.getElementById("HTML_사진보관함탭").style = 
      "color: #ababab;";
      JS_일기그리기기능();
      break;
    }
    case "사진": {
      window.document.getElementById("HTML_일기보관함메인").style =
      "display: none;";
      window.document.getElementById("HTML_사진보관함메인").style =
      "display: block;";
      window.document.getElementById("HTML_일기보관함필터").style =
      "display: none";
      window.document.getElementById("HTML_사진보관함필터").style =
      "display: block;";
      window.document.getElementById("HTML_사진보관함탭").style = 
      "border-bottom: 0.2rem solid #000;";
      window.document.getElementById("HTML_일기보관함탭").style = 
      "color: #ababab;";
      JS_강아지사진그리기기능();
      break;
    }
  }
}; 

const JS_사진비율필터링기능 = (event) => {
  const 선택한내용 = event.target.value;
  const 사진목록 = document.querySelectorAll(".CSS_강아지사진")

  사진목록.forEach((사진) => {
    switch (선택한내용) {
      case "HTML_가로형선택":
        사진.style.aspectRatio = "4 / 3";
        사진.style.maxWidth = "63rem";
        사진.style.width = "100%";
        break;
      case "HTML_세로형선택":
        사진.style.aspectRatio = "3 / 4";
        사진.style.maxWidth = "48rem";
        사진.style.width = "100%";
        break;
      default:
        사진.style.aspectRatio = "1 / 1";
        사진.style.maxWidth = "63rem";
        사진.style.width = "100%";
        break;
    }
  })
}

const JS_강아지사진그리기기능 = () => {
  
  fetch("https://dog.ceo/api/breeds/image/random/10").then((받아온결과)=>{
    받아온결과.json().then((객체만뽑힌결과) => {

      const 이미지주소 = 객체만뽑힌결과.message;

      const HTML_강아지사진리스트 = 이미지주소
        .map(
          (el, index) => `
            <img class="CSS_강아지사진" src="${el}" alt="강아지사진${index}" />
          `
        ).join("");  

      // console.log(`이미지다운로드주소들: ${이미지다운로드주소들}`)
      // console.log(`상태: ${상태}`)
      
      document.getElementById("HTML_강아지사진보여주는곳").innerHTML =
        HTML_강아지사진리스트;
      
      document.getElementById("HTML_스켈레톤").style = "display: none";                 
    })
  })
}

const 스크롤기능 = () => { 
  window.scrollTo({top:0, behavior:"smooth"}) 
}

let 현재삭제할일기번호 = null;

const JS_일기삭제기능 = (event, 일기번호) => {
  // 1. 이 버튼 하위에 있는 모든 태그들의 기본기능 막기 => <a /> 태그 이동 막기
  event.preventDefault();
  스크롤기능();
  document.body.style.overflow = "hidden";
  모달열기("일기삭제모달그룹ID");
  현재삭제할일기번호 = 일기번호;
};
  
const JS_일기삭제확인기능 = (일기번호) =>{
  const 스토리지에저장된일기목록 =
    window.localStorage.getItem("민지의일기목록") ?? "[]" ;
  const 일기목록 =  JSON.parse(스토리지에저장된일기목록);
  
  if(현재삭제할일기번호 !== null) {
  // 1. 클릭된 일기번호 삭제하기
    const 삭제후일기목록 = 일기목록.filter((_, index) => index !== 현재삭제할일기번호);

  // 2. 삭제된 일기목록 다시 저장하기
    window.localStorage.setItem("민지의일기목록", JSON.stringify(삭제후일기목록));

  // 3. 삭제된 일기목록 화면에 다시 그리기
    JS_일기그리기기능();

  // 4. 모달 닫기
    모달닫기("일기삭제모달그룹ID");

  // 5. 현재삭제할일기번호 초기화
    현재삭제할일기번호 = null;
  }
}