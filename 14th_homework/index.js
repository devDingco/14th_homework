window.onload = () => {
    console.log("민지의 다이어리에 오신 것을 환영합니다.");
    
    // 초기 감정표현 카드들을 표시
    초기감정카드표시();
  };
  
  const 일기목록 = [];
  
  // 초기 감정표현 카드들을 표시하는 함수
  const 초기감정카드표시 = () => {
    const 일기보여주는곳 = document.getElementById("HTML_일기보여주는곳");
    
    // 기존 내용 초기화
    일기보여주는곳.innerHTML = "";
    
    // 감정별 샘플 카드들을 추가
    const 샘플카드들 = [
      {
        기분: "행복",
        이미지: "./assets/images/joy.png",
        제목: "오늘은 정말 좋은 하루였다",
        날짜: "2024. 03. 12"
      },
      {
        기분: "슬픔",
        이미지: "./assets/images/sadness.png",
        제목: "오늘은 조금 우울한 하루였다",
        날짜: "2024. 03. 12"
      },
      {
        기분: "놀람",
        이미지: "./assets/images/surprised.png",
        제목: "예상치 못한 일이 발생했다",
        날짜: "2024. 03. 12"
      },
      {
        기분: "화남",
        이미지: "./assets/images/anger.png",
        제목: "오늘은 화가 나는 일이 있었다",
        날짜: "2024. 03. 12"
      },
      {
        기분: "기타",
        이미지: "./assets/images/idontknownothing.png",
        제목: "특별한 감정을 느꼈다",
        날짜: "2024. 03. 12"
      },
      {
        기분: "귀여움",
        이미지: "./assets/images/dog.jpg",
        제목: "강아지와 함께한 시간",
        날짜: "2024. 03. 12"
      }
    ];
    
    // 샘플 카드들을 그리드에 추가
    샘플카드들.forEach((카드, 인덱스) => {
      const 새카드 = 감정카드생성(카드.기분, 카드.이미지, 카드.제목, 카드.날짜, 인덱스);
      일기보여주는곳.appendChild(새카드);
    });
    
    // 빈 카드 2개 추가 (한 줄에 4개씩 맞추기 위해)
    for (let i = 0; i < 2; i++) {
      const 빈카드 = 빈카드생성();
      일기보여주는곳.appendChild(빈카드);
    }
  };
  
  // 감정 카드를 생성하는 함수
  const 감정카드생성 = (기분, 이미지경로, 제목, 날짜, 인덱스) => {
    const 카드 = document.createElement("div");
    카드.className = "CSS_일기";
    카드.onclick = () => JS_글보기기능(인덱스);
    
    // 기분에 따른 CSS 클래스 추가
    const 기분클래스 = 기분 === "행복" ? "CSS_행복" : 
                      기분 === "슬픔" ? "CSS_슬픔" : 
                      기분 === "놀람" ? "CSS_놀람" : 
                      기분 === "화남" ? "CSS_화남" : 
                      기분 === "기타" ? "CSS_기타" : "CSS_행복";
    
    카드.innerHTML = `
      <div class="CSS_일기사진">
        <img class="CSS_기분이미지" src="${이미지경로}" alt="${기분}" />
      </div>
      <div class="CSS_일기내용">
        <div class="CSS_기분 ${기분클래스}">${기분}해요</div>
        <div class="CSS_날짜">${날짜}</div>
      </div>
      <div class="CSS_일기제목">${제목}</div>
    `;
    
    return 카드;
  };
  
  // 빈 카드를 생성하는 함수
  const 빈카드생성 = () => {
    const 카드 = document.createElement("div");
    카드.className = "CSS_일기";
    카드.style.border = "2px dashed #d4d3d3";
    카드.style.backgroundColor = "#fafafa";
    
    카드.innerHTML = `
      <div class="CSS_일기사진" style="background-color: #f5f5f5; display: flex; align-items: center; justify-content: center;">
        <div style="font-size: 48px; color: #d4d3d3; font-weight: 300;">+</div>
      </div>
      <div class="CSS_일기내용">
        <div class="CSS_기분" style="color: #666;">새로운</div>
        <div class="CSS_날짜" style="color: #007bff; font-weight: 600;">일기쓰기</div>
      </div>
      <div class="CSS_일기제목" style="color: #666;">새로운 일기를 작성해보세요</div>
    `;
    
    return 카드;
  };
  
  const JS_글쓰기기능 = () => {
    // 0. 현재 날짜 가져오기
    const date = new Date();
  
    const options = {
      year: date.getFullYear(),
      month: (date.getMonth() + 1).toString().padStart(2, "0"),
      date: (date.getDate()).toString().padStart(2, "0"),
    };
  
    // 1-1. 내가쓴 일기 불러오기
    const 날짜담는통 = options.year + ". " + options.month + ". " + options.date;
    const 제목담는통 = window.document.getElementById("HTML_제목입력창").value;
    const 내용담는통 = window.document.getElementById("HTML_내용입력창").value;
  
    // 1-2. 오늘의 기분 불러오기
    let 행복담는통 =
      window.document.getElementsByName("HTML_기분선택버튼")[0].checked === true;
    let 슬픔담는통 =
      window.document.getElementsByName("HTML_기분선택버튼")[1].checked === true;
    let 놀람담는통 =
      window.document.getElementsByName("HTML_기분선택버튼")[2].checked === true;
    let 화남담는통 =
      window.document.getElementsByName("HTML_기분선택버튼")[3].checked === true;
    let 기타담는통 =
      window.document.getElementsByName("HTML_기분선택버튼")[4].checked === true;
  
    // 입력값 검증
    if (!제목담는통.trim() || !내용담는통.trim()) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }
  
    // 2. 일기목록에 일기 추가하기
    const 일기담는통 = {
      제목: 제목담는통,
      내용: 내용담는통,
      작성일: 날짜담는통,
      기분: 행복담는통 ? "행복" : 
            슬픔담는통 ? "슬픔" : 
            놀람담는통 ? "놀람" : 
            화남담는통 ? "화남" : 
            기타담는통 ? "기타" : "행복"
    };
    일기목록.push(일기담는통);
  
    // 3. 마지막으로 추가한 일기번호 가져오기
    const 일기번호 = 일기목록.length - 1;
  
    // 4. 현재까지 그려진 일기도화지 가져오기
    const HTML_기존의일기도화지 =
      window.document.getElementById("HTML_일기보여주는곳").innerHTML;
  
    // 5. 새로운 일기도화지 만들기
    const HTML_새로운일기도화지 = `
      <div class="CSS_일기" onclick="JS_글보기기능(${일기번호 + 6})">
          <div class="CSS_일기사진">
            ${
              행복담는통 === true
                ? '<img class="CSS_기분이미지" src="./assets/images/joy.png" alt="행복" />'
                : ""
            }
            ${
              슬픔담는통 === true
                ? '<img class="CSS_기분이미지" src="./assets/images/sadness.png" alt="슬픔" />'
                : ""
            }
            ${
              놀람담는통 === true
                ? '<img class="CSS_기분이미지" src="./assets/images/surprised.png" alt="놀람" />'
                : ""
            }
            ${
              화남담는통 === true
                ? '<img class="CSS_기분이미지" src="./assets/images/anger.png" alt="화남" />'
                : ""
            }
            ${
              기타담는통 === true
                ? '<img class="CSS_기분이미지" src="./assets/images/idontknownothing.png" alt="기타" />'
                : ""
            }
          </div>
          <div class="CSS_일기내용">
            ${
              행복담는통 === true
                ? `<div class="CSS_기분 CSS_행복">행복해요</div>`
                : ""
            }
            ${
              슬픔담는통 === true
                ? `<div class="CSS_기분 CSS_슬픔">슬퍼요</div>`
                : ""
            }
            ${
              놀람담는통 === true
                ? `<div class="CSS_기분 CSS_놀람">놀랐어요</div>`
                : ""
            }
            ${
              화남담는통 === true
                ? `<div class="CSS_기분 CSS_화남">화나요</div>`
                : ""
            }
            ${
              기타담는통 === true
                ? `<div class="CSS_기분 CSS_기타">기타</div>`
                : ""
            }
            <div class="CSS_날짜">${일기담는통.작성일}</div>
          </div>
          <div class="CSS_일기제목"> ${일기담는통.제목}</div>
      </div>
    `;
  
    // 6. HTML_일기보여주는곳에 기존의 일기도화지와 새로운 일기도화지 함께 보여주기
    window.document.getElementById("HTML_일기보여주는곳").innerHTML =
      HTML_기존의일기도화지 + HTML_새로운일기도화지;
  
    // 7. 입력 필드 초기화
    window.document.getElementById("HTML_제목입력창").value = "";
    window.document.getElementById("HTML_내용입력창").value = "";
    
    // 8. 첫 번째 기분 옵션을 기본으로 선택
    window.document.getElementsByName("HTML_기분선택버튼")[0].checked = true;
    
    // 9. 성공 메시지 표시
    alert("일기가 성공적으로 등록되었습니다!");
  };
  
  const JS_글보기기능 = (일기번호받는통) => {
    // 샘플 카드인 경우
    if (일기번호받는통 < 6) {
      const 샘플제목들 = [
        "오늘은 정말 좋은 하루였다",
        "오늘은 조금 우울한 하루였다",
        "예상치 못한 일이 발생했다",
        "오늘은 화가 나는 일이 있었다",
        "특별한 감정을 느꼈다",
        "강아지와 함께한 시간"
      ];
      
      alert(`
        제목: ${샘플제목들[일기번호받는통]}
        내용: 이것은 샘플 일기입니다. 실제 일기를 작성해보세요!
      `);
      return;
    }
    
    // 실제 등록된 일기인 경우
    const 실제일기번호 = 일기번호받는통 - 6;
    if (실제일기번호 >= 0 && 실제일기번호 < 일기목록.length) {
      const 일기담는통 = 일기목록[실제일기번호];
      const 제목담는통 = 일기담는통.제목;
      const 내용담는통 = 일기담는통.내용;
  
      alert(`
        제목: ${제목담는통}
        내용: ${내용담는통}       
      `);
    }
  };
  
  // 탭 전환 기능 추가
  document.addEventListener('DOMContentLoaded', function() {
    const 탭들 = document.querySelectorAll('.CSS_탭 > div');
    
    탭들.forEach(탭 => {
      탭.addEventListener('click', function() {
        // 모든 탭에서 클릭된 상태 제거
        탭들.forEach(t => {
          t.className = 'CSS_클릭되지않은탭';
        });
        
        // 클릭된 탭을 활성화
        this.className = 'CSS_클릭된탭';
        
        // 탭 내용 변경
        if (this.textContent === '사진보관함') {
          사진보관함표시();
        } else {
          일기보관함표시();
        }
      });
    });
  });
  
  // 사진보관함 표시 함수
  const 사진보관함표시 = () => {
    const 일기보여주는곳 = document.getElementById("HTML_일기보여주는곳");
    일기보여주는곳.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px; color: #919191;">
        <p style="font-size: 24px; margin-bottom: 16px;">📸 사진보관함</p>
        <p style="font-size: 16px;">아직 등록된 사진이 없습니다.</p>
      </div>
    `;
  };
  
  // 일기보관함 표시 함수
  const 일기보관함표시 = () => {
    // 페이지 새로고침으로 원래 상태 복원
    location.reload();
  };
  