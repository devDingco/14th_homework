window.onload = () => {
  console.log("민지의 다이어리에 오신 것을 환영합니다.");

  // 1. 시작하면 일기 목록에 그리기
  JS_일기그리기기능();
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
          <div class="diary_content">
            ${el.기분 === "행복" ? `<div class="diary_mood CSS_행복">행복해요</div>` : ""}
            ${el.기분 === "슬픔" ? `<div class="diary_mood CSS_슬픔">슬퍼요</div>` : ""}
            ${el.기분 === "놀람" ? `<div class="diary_mood CSS_놀람">놀랐어요</div>` : ""}
            ${el.기분 === "화남" ? `<div class="diary_mood CSS_화남">화나요</div>` : ""}
            ${el.기분 === "기타" ? `<div class="diary_mood CSS_기타">기타</div>` : ""}
            <div class="diary_date">${el.작성일}</div>
          </div>
          <div class="diary_title">${el.제목}</div>
        </a>
        <img class="delete_button" src="./assets/images/close_icon.png"
             onclick="JS_일기삭제기능(event, ${index})" />
      </div>
    `;
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
const 기분선택버튼목록 =window.document.getElementsByName("HTML_기분선택버튼");

for (let i= 0; i< 기분선택버튼목록.length; i++) {
  const el = 기분선택버튼목록[i];
  if (el.checked) mood_area =el.value;
}

// let happy_area =
//   window.document.getElementsByName("HTML_기분선택버튼")[0].checked === true;
// let sad_area =
//   window.document.getElementsByName("HTML_기분선택버튼")[1].checked === true;  
// let surprise_area =
//   window.document.getElementsByName("HTML_기분선택버튼")[2].checked === true;
// let mad_area =
//   window.document.getElementsByName("HTML_기분선택버튼")[3].checked === true;
// let etc_area =
//   window.document.getElementsByName("HTML_기분선택버튼")[4].checked === true;

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

// 일기목록.push(diary_area);

// const 일기번호 = 일기목록.length -1;

// const HTML_기존의일기도화지 = 
//   window.document.getElementById("HTML_일기보여주는곳").innerHTML;

// const HTML_새로운일기도화지 = `
//   <div class="card_area" onclick="JS_글보기기능(${일기번호})">
//     <div class="diary_image">
//       ${
//         happy_area === true
//           ? '<img class="mood_image" src="./assets/images/mood_happy.png" alt="행복"/>'
//           : ""
//       }
//       ${
//         sad_area === true
//           ? '<img class="mood_image" src="./assets/images/mood_sad.png" alt="슬픔"/>'
//           : ""
//       }
//       ${
//         surprise_area === true
//           ? '<img class="mood_image" src="./assets/images/mood_suprise.png" alt="놀람"/>'
//           : ""
//       }
//       ${
//         mad_area === true
//           ? '<img class="mood_image" src="./assets/images/mood_mad.png" alt="화남"/>'
//           : ""
//       }
//       ${
//         etc_area === true
//           ? '<img class="mood_image" src="./assets/images/mood_think.png" alt="기타"/>'
//           : ""
//       }
//     </div>
//     <div class="diary_content">
//       ${
//         happy_area === true
//           ? `<div class="diary_mood CSS_행복">행복해요</div>`
//           : ""
//       }
//       ${
//         sad_area === true
//           ? `<div class="diary_mood CSS_슬픔">슬퍼요</div>`
//           : ""
//       }
//       ${
//         surprise_area === true
//           ? `<div class="diary_mood CSS_놀람">놀랐어요</div>`
//           : ""
//       }
//       ${
//         mad_area === true
//           ? `<div class="diary_mood CSS_화남">화나요</div>`
//           : ""
//       }
//       ${
//         etc_area === true
//           ? `<div class="diary_mood CSS_기타">기타</div>`
//           : ""
//       }
//       <div class="diary_date">${diary_area.작성일}</div>
//     </div>
//     <div class="diary_title"> ${diary_area.제목}</div>  
  
//   </div>
// `

// window.document.getElementById("HTML_일기보여주는곳").innerHTML =
//       HTML_기존의일기도화지 + HTML_새로운일기도화지;
// };

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
                ${el.기분 === "행복"
          ? '<img class="CSS_mood_image" src="./assets/images/mood_happy.png" alt="행복" />'
          : ""
        }
                ${el.기분 === "슬픔"
          ? '<img class="CSS_mood_image" src="./assets/images/mood_sad.png" alt="슬픔" />'
          : ""
        }
                ${el.기분 === "놀람"
          ? '<img class="CSS_mood_image" src="./assets/images/mood_surprise.png" alt="놀람" />'
          : ""
        }
                ${el.기분 === "화남"
          ? '<img class="CSS_mood_image" src="./assets/images/mood_mad.png" alt="화남" />'
          : ""
        }
                ${el.기분 === "기타"
          ? '<img class="CSS_mood_image" src="./assets/images/mood_think.png" alt="기타" />'
          : ""
        }
              </div>
              <div class="diary_content">
                ${el.기분 === "행복"
          ? `<div class="diary_mood CSS_행복">행복해요</div>`
          : ""
        }
                ${el.기분 === "슬픔"
          ? `<div class="diary_mood CSS_슬픔">슬퍼요</div>`
          : ""
        }
                ${el.기분 === "놀람"
          ? `<div class="diary_mood CSS_놀람">놀랐어요</div>`
          : ""
        }
                ${el.기분 === "화남"
          ? `<div class="diary_mood CSS_화남">화나요</div>`
          : ""
        }
                ${el.기분 === "기타"
          ? `<div class="diary_mood CSS_기타">기타</div>`
          : ""
        }
                <div class="diary_date">${el.작성일}</div>
              </div>
              <div class="diary_title"> ${el.제목}</div> 
            </div>
            <img class="delete_button" src="./assets/images/deleteButton.png" onclick="JS_일기삭제기능(event, ${index})" />
          </div>
        </a>
      `
    )
    .join("");
  window.document.getElementById("HTML_일기보여주는곳").innerHTML =
    HTML_새로운일기도화지;
};

document.addEventListener('DOMContentLoaded', () => {
  const dropdown = document.getElementsByClassName('filter');
  
  // 드롭다운을 클릭했을 때의 동작 (기존 기능 유지)
  dropdown.addEventListener('click', () => {
      dropdown.classList.toggle('inverted');
  });

  // 스크롤이 발생했을 때의 동작
  window.addEventListener("scroll", () => {
      const scrollY = window.scrollY; // 스크롤 내려간 길이를 가져옵니다.
            
      if (scrollY > 0) {
        // 스크롤이 조금이라도 내려가면 (0보다 크면)
        dropdown.style.backgroundColor = "#000";
        dropdown.style.color = "#fff";
      } else {
         // 스크롤이 맨 위에 있으면 (0과 같으면) 원래 색상으로 되돌립니다.
        dropdown.style.backgroundColor = "#fff";
        dropdown.style.color = "#000";
      }
  });
});

const 스크롤기능 = () => { 
  window.scrollTo({top:0, behavior:"smooth"}) 
}

function JS_일기삭제기능(event, 일기번호) {
  // 1. 이 버튼 하위에 있는 모든 태그들의 기본기능 막기 => <a /> 태그 이동 막기
  event.preventDefault();

  const 스토리지에저장된일기목록 =
    window.localStorage.getItem("민지의일기목록");
  const 일기목록 = 스토리지에저장된일기목록
    ? JSON.parse(스토리지에저장된일기목록)
    : [];
  // 2. 클릭된 일기번호 삭제하기
  const 삭제후일기목록 = 일기목록.filter((_, index) => index !== 일기번호);
  // 3. 삭제된 일기목록 다시 저장하기
  window.localStorage.setItem("민지의일기목록", JSON.stringify(삭제후일기목록));
  alert("삭제되었습니다.");
  // 4. 삭제된 일기목록 화면에 다시 그리기
  JS_일기그리기기능();
}