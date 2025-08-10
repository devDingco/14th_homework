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

let happy_area =
  window.document.getElementsByName("HTML_기분선택버튼")[0].checked === true;
let sad_area =
  window.document.getElementsByName("HTML_기분선택버튼")[1].checked === true;  
let surprise_area =
  window.document.getElementsByName("HTML_기분선택버튼")[2].checked === true;
let mad_area =
  window.document.getElementsByName("HTML_기분선택버튼")[3].checked === true;
let etc_area =
  window.document.getElementsByName("HTML_기분선택버튼")[4].checked === true;

const diary_area = {
  제목: title_area,
  내용: content_area,
  작성일: date_area
};

일기목록.push(diary_area);

const 일기번호 = 일기목록.length -1;

const HTML_기존의일기도화지 = 
  window.document.getElementById("HTML_일기보여주는곳").innerHTML;

const HTML_새로운일기도화지 = `
  <div class="card_area" onclick="JS_글보기기능(${일기번호})">
    <div class="diary_image">
      ${
        happy_area === true
          ? '<img class="mood_image" src="./assets/images/mood_happy.png" alt="행복"/>'
          : ""
      }
      ${
        sad_area === true
          ? '<img class="mood_image" src="./assets/images/mood_sad.png" alt="슬픔"/>'
          : ""
      }
      ${
        surprise_area === true
          ? '<img class="mood_image" src="./assets/images/mood_suprise.png" alt="놀람"/>'
          : ""
      }
      ${
        mad_area === true
          ? '<img class="mood_image" src="./assets/images/mood_mad.png" alt="화남"/>'
          : ""
      }
      ${
        etc_area === true
          ? '<img class="mood_image" src="./assets/images/mood_think.png" alt="기타"/>'
          : ""
      }
    </div>
    <div class="diary_content">
      ${
        happy_area === true
          ? `<div class="diary_mood CSS_행복">행복해요</div>`
          : ""
      }
      ${
        sad_area === true
          ? `<div class="diary_mood CSS_슬픔">슬퍼요</div>`
          : ""
      }
      ${
        surprise_area === true
          ? `<div class="diary_mood CSS_놀람">놀랐어요</div>`
          : ""
      }
      ${
        mad_area === true
          ? `<div class="diary_mood CSS_화남">화나요</div>`
          : ""
      }
      ${
        etc_area === true
          ? `<div class="diary_mood CSS_기타">기타</div>`
          : ""
      }
      <div class="diary_date">${diary_area.작성일}</div>
    </div>
    <div class="diary_title"> ${diary_area.제목}</div>  
  
  </div>
`

window.document.getElementById("HTML_일기보여주는곳").innerHTML =
      HTML_기존의일기도화지 + HTML_새로운일기도화지;
};


const JS_글보기기능 = (일기번호받는통) => {
  const diary_area = 일기목록[일기번호받는통];
  const title_area = diary_area.제목;
  const content_area = diary_area.내용;

  alert(`
    제목: ${title_area}
    내용: ${content_area}
    `);

};