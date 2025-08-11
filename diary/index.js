const 일기목록 = [];

// 일기등록
const 등록하기 = () => {
  // 날짜가져오기

  const date = new Date();

  const options = {
    // 날짜가져오기
    year: date.getFullYear(),
    // toString <= 문자열로 반환  padStart(2,"0") <= 문자열의 길이가 2가 안되면 문자열 앞에 "0"을 붙여라
    month: (date.getMonth() + 1).toString().padStart(2, "0"),
    date: date.getDate().toString().padStart(2, "0"),
  };
  // 내가 쓴 일기 불러오기
  const 날짜담는통 = `${options.year}.${options.month}.${options.date}`;
  const 제목담는통 = document.getElementById("제목").value;
  const 내용담는통 = document.getElementById("내용").value;

  // 오늘의 기분 불러오기

  // let 행복담는통 = document.getElementById("감정")[0].checked === true;
  // let 슬픔담는통 = document.getElementById("감정")[1].checked === true;
  // let 놀람담는통 = document.getElementById("감정")[2].checked === true;
  // let 화남담는통 = document.getElementById("감정")[3].checked === true;
  // let 기타담는통 = document.getElementById("감정")[4].checked === true;
  const 감정담는통 = document.querySelector('input[name="감정"]:checked').value;
  // 일기목록에 일기 추가하기
  // 배열 변수(일기담는통) 만들어CSS_일기사진서 빈배열(일기목록)에 push로 넣음

  let 이미지담는통 = "";
  if (감정담는통 === "행복해요") {
    이미지담는통 = "./images/happy.png";
  } else if (감정담는통 === "슬퍼요") {
    이미지담는통 = "./images/sad.png";
  } else if (감정담는통 === "놀랐어요") {
    이미지담는통 = "./images/surprised.png";
  } else if (감정담는통 === "화나요") {
    이미지담는통 = "./images/angry.png";
  } else if (감정담는통 === "기타") {
    이미지담는통 = "./images/guitar.png";
  }

  const 일기담는통 = {
    감정: 감정담는통,
    제목: 제목담는통,
    내용: 내용담는통,
    작성일: 날짜담는통,
    이미지: 이미지담는통,
  };

  일기목록.push(일기담는통);

  const 일기번호 = 일기목록.length - 1;

  document.getElementById("일기추가보이는곳").innerHTML += `
   <div class="바디__정렬__목록__첫번째" onclick="게시글확인기능(${일기번호})">
            <img src=${일기담는통.이미지}
              style="width: 380px; height: 285px" />
            <div style="width: 380px; height: 16px"></div>
            <div class="바디__정렬__목록__첫번째__내용">
              <div class="바디__정렬__목록__첫번째__내용__감정날짜">
                <div class="바디__정렬__목록__첫번째__내용__감정날짜__감정">
                  ${일기담는통.감정}
                </div>
                <div class="바디__정렬__목록__첫번째__내용__감정날짜__날짜">
                  ${일기담는통.작성일}
                </div>
              </div>
              <div style="width: 380px; height: 8px"></div>

              <div class="바디__정렬__목록__첫번째__내용__타이틀">
                ${일기담는통.제목}
              </div>
              <div style="width: 380px; height: 16px"></div>
            </div>
          </div>
  
  `;
};

const 게시글확인기능 = (일기번호받는통) => {
  const 일기담는통 = 일기목록[일기번호받는통];
  const 제목담는통 = 일기담는통.제목;
  const 내용담는통 = 일기담는통.내용;

  alert(`
    제목: ${제목담는통}
    내용: ${내용담는통}
    `);
};
