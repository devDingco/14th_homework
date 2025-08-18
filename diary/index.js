window.onload = () => {
  HTML일기보여주기();
};

const 일기목록 = [];

const HTML일기보여주기 = () => {
  //스토리지에 있는 일기목록 가져오기
  const 스토리지에저장된일기목록 =
    localStorage.getItem("지윤이의일기목록") ?? "[]";
  const 일기목록 = JSON.parse(스토리지에저장된일기목록);

  document.getElementById("일기추가보이는곳").innerHTML = 일기목록
    .map(
      (el, index) => `
    <a href="./detail.html?number=${index}#댓글창ID">
      <div class="바디__정렬__목록__첫번째">
        <img src="${el.이미지}" style="width: 380px; height: 285px; border-radius: 16px;" />  

        <div style="width: 380px; height: 16px"></div>

        <div class="바디__정렬__목록__첫번째__내용">
          <div class="바디__정렬__목록__첫번째__내용__감정날짜">
            <div class="바디__정렬__목록__첫번째__내용__감정날짜__감정">
              ${el.감정}
            </div>
            <div class="바디__정렬__목록__첫번째__내용__감정날짜__날짜">
              ${el.작성일}
            </div>
          </div>

          <div style="width: 380px; height: 8px"></div>

          <div class="바디__정렬__목록__첫번째__내용__타이틀">
            ${el.제목}
          </div>

          <div style="width: 380px; height: 16px"></div>
        </div>

        <button class="삭제버튼" onclick="삭제하기기능(event,${index})">
          <img src="./images/closeicon.svg">
        </button>
      </div>
    </a>
  `
    )
    .join("");
};

// for문 렌더링
// for (let index = 0; index < 일기목록.length; index++) {
//   document.getElementById("일기추가보이는곳").innerHTML += `
//     <a href="./detail.html?number=${index}">
//       <div class="바디__정렬__목록__첫번째">
//         <img src="${일기목록[index].이미지}" style="width: 380px; height: 285px; border-radius: 16px; " />

//         <div style="width: 380px; height: 16px"></div>

//         <div class="바디__정렬__목록__첫번째__내용">

//           <div class="바디__정렬__목록__첫번째__내용__감정날짜">
//             <div class="바디__정렬__목록__첫번째__내용__감정날짜__감정">
//               ${일기목록[index].감정}
//             </div>
//             <div class="바디__정렬__목록__첫번째__내용__감정날짜__날짜">
//               ${일기목록[index].작성일}
//             </div>
//           </div>

//           <div style="width: 380px; height: 8px"></div>

//           <div class="바디__정렬__목록__첫번째__내용__타이틀">
//             ${일기목록[index].제목}
//           </div>

//           <div style="width: 380px; height: 16px"></div>

//         </div>
//         <button class="삭제버튼" onclick="삭제하기기능(event,${index})"><img src="./images/closeicon.svg"></button>
//       </div>
//     </a>
// `;
// }

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

  // const 감정담는통 = document.querySelector('input[name="감정"]:checked').value;
  let 감정담는통;
  document.getElementsByName("감정").forEach((el) => {
    if (el.checked) 감정담는통 = el.value;
  });

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

  //  ?? <= 널 병합 연산자  ?? 왼쪽값이 null 또는 undefined이면 [] 빈배열로 하겠다 / stringify로 인해 문자열로 저장되어있으므로 "[]" 이렇게 사용
  const 스토리지에저장된일기목록 =
    localStorage.getItem("지윤이의일기목록") ?? "[]";
  // localstorage에 저장된걸 자바스크립트로 불러올 때 parse사용
  const 일기목록 = JSON.parse(스토리지에저장된일기목록);
  일기목록.push(일기담는통);
  // 일기목록에 새로운 일기객체를 푸시하고 그 일기객체를 로컬스토리지에 JSON문자열로 변환해서 지윤이의일기목록(key)의 값으로 저장한다
  localStorage.setItem("지윤이의일기목록", JSON.stringify(일기목록));

  const 일기번호 = 일기목록.length - 1;

  document.getElementById("일기추가보이는곳").innerHTML += `
          <div class="바디__정렬__목록__첫번째" onclick="게시글확인기능(${일기번호})">
            <img src= "${일기목록[일기번호].이미지}" style="width: 380px; height: 285px; border-radius: 16px;"  />
            <div style="width: 380px; height: 16px"></div>
            <div class="바디__정렬__목록__첫번째__내용">
              <div class="바디__정렬__목록__첫번째__내용__감정날짜">
                <div class="바디__정렬__목록__첫번째__내용__감정날짜__감정">
                  ${일기목록[일기번호].감정}
                </div>
                <div class="바디__정렬__목록__첫번째__내용__감정날짜__날짜">
                  ${일기목록[일기번호].작성일}
                </div>
              </div>
              <div style="width: 380px; height: 8px"></div>

              <div class="바디__정렬__목록__첫번째__내용__타이틀">
                ${일기목록[일기번호].제목}
              </div>
              <div style="width: 380px; height: 16px"></div>
            </div>
          </div>
  `;
  location.reload(true);
};

const 스크롤올리기 = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const 삭제하기기능 = (event, 일기번호) => {
  event.preventDefault();

  const 스토리지에저장된일기목록 = localStorage.getItem("지윤이의일기목록");
  const 일기목록 = 스토리지에저장된일기목록
    ? JSON.parse(스토리지에저장된일기목록)
    : [];
  const 삭제하고남은배열 = 일기목록.filter((_, index) => index !== 일기번호);
  localStorage.setItem("지윤이의일기목록", JSON.stringify(삭제하고남은배열));
  alert("삭제되었습니다.");
  document.getElementById("일기추가보이는곳").innerHTML = "";
  HTML일기보여주기();
};

const 필터링기능 = (event) => {
  const 필터링된감정 = event.target.value;
  console.log(필터링된감정);

  const 스토리지에저장된일기목록 =
    localStorage.getItem("지윤이의일기목록") ?? "[]";
  const 일기목록 = JSON.parse(스토리지에저장된일기목록);

  let 필터링된일기목록;

  switch (필터링된감정) {
    case "행복해요": {
      필터링된일기목록 = 일기목록.filter((el) => el.감정 === "행복해요");
      break;
    }
    case "슬퍼요": {
      필터링된일기목록 = 일기목록.filter((el) => el.감정 === "슬퍼요");
      break;
    }
    case "놀랐어요": {
      필터링된일기목록 = 일기목록.filter((el) => el.감정 === "놀랐어요");
      break;
    }
    case "화나요": {
      필터링된일기목록 = 일기목록.filter((el) => el.감정 === "화나요");
      break;
    }
    case "기타": {
      필터링된일기목록 = 일기목록.filter((el) => el.감정 === "기타");
      break;
    }
    default: {
      필터링된일기목록 = 일기목록;
    }
  }

  document.getElementById("일기추가보이는곳").innerHTML = 필터링된일기목록
    .map(
      (el, index) => `
  <a href="./detail.html?number=${index}#댓글창ID">
    <div class="바디__정렬__목록__첫번째">
      <img src="${el.이미지}" style="width: 380px; height: 285px; border-radius: 16px;" />  

      <div style="width: 380px; height: 16px"></div>

      <div class="바디__정렬__목록__첫번째__내용">
        <div class="바디__정렬__목록__첫번째__내용__감정날짜">
          <div class="바디__정렬__목록__첫번째__내용__감정날짜__감정">
            ${el.감정}
          </div>
          <div class="바디__정렬__목록__첫번째__내용__감정날짜__날짜">
            ${el.작성일}
          </div>
        </div>

        <div style="width: 380px; height: 8px"></div>

        <div class="바디__정렬__목록__첫번째__내용__타이틀">
          ${el.제목}
        </div>

        <div style="width: 380px; height: 16px"></div>
      </div>

      <button class="삭제버튼" onclick="삭제하기기능(event,${index})">
        <img src="./images/closeicon.svg">
      </button>
    </div>
  </a>
`
    )
    .join("");
};
