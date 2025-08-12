// 일기 삭제버튼 미리 설정
function 삭제하기(event, number) {
    // 이벤트 전파 막기
    // event.stopPropagation();
    // event.preventDefault();

    // 삭제 확인 알림
    alert("일기가 삭제되었습니다.");

    // 로컬스토리지에서 일기들 불러오기
    let 일기들 = JSON.parse(localStorage.getItem("일기들목록")) || [];

    // 해당 number 제외하고 필터링
    const 삭제후남은일기들 = 일기들.filter(el => el.number !== number);

    // 로컬스토리지 저장
    localStorage.setItem("일기들목록", JSON.stringify(삭제후남은일기들));

    // 화면 갱신
    window.location.href = "../diary-index.html"
}

// 변경되는 구역 일기 내용
function writing() {

    // 페이지 number 찾기
    const 쿼리스트링 = location.search
    const params = new URLSearchParams(쿼리스트링)
    const pagenumber = Number(params.get('number'));
    console.log(pagenumber)

    // localStorage에서 일기들 꺼내기
    const 문자열일기들 = localStorage.getItem('일기들목록')
    const 일기들 = 문자열일기들 ? JSON.parse(문자열일기들) : []

    // number로 해당 일기 찾기
    const 선택된일기 = 일기들.find(el => el.number === pagenumber);

    // 해당 번호의 일기가 없으면 안내 메시지
    if (!선택된일기) {
      document.querySelector(".변경되는구역").innerHTML = "<p>해당 일기를 찾을 수 없습니다.</p>";
      return;
    }

    // 변경되는 구역 HTML 구성
    const writingHTML = `
    <div class="타이틀">${선택된일기.title}</div>
              <div class="내용틀">
                  <div class="감정날짜">
                      <div class="감정부모">
                          <div class="감정__아이콘__${선택된일기.feeling}"></div>
                          <div class="감정__${선택된일기.feeling}">${선택된일기.feeling}</div>
                      </div>
                      <div class="날짜부모">
                          <div class="날짜">${선택된일기.date}</div>
                          <div class="작성">작성</div>
                      </div>
                  </div>
                  <div class="내용구역">
                      <div class="내용">${선택된일기.content}</div>
                  </div>
              </div>
              <div class="수정삭제구역">
                  <button class="수정버튼" onclick="수정화면()">수정</button>
                  <button class="수정버튼" onclick="삭제하기(event, ${선택된일기.number})">삭제</button>
              </div>
    `

    const 변경되는구역 = document.querySelector(".변경되는구역")
    변경되는구역.innerHTML = writingHTML

}


// 회고 구역 설정

// 현재 보고 있는 일기의 number 가져오기
function getCurrentDiaryNumber() {
    const params = new URLSearchParams(location.search)
    return Number(params.get('number'))
}

// 새로운 댓글 등록 함수
function renderComments() {

    const pagenumber = getCurrentDiaryNumber() // 현재 페이지 number 찾기

    const key = `댓글목록_${pagenumber}`

    const savedComments = JSON.parse(localStorage.getItem(key)) ?? []
    const commentContainer = document.querySelector(".댓글영역")

    if (savedComments.length > 0) {
        const commentHTML = savedComments.map((el) => `
        <div class="댓글틀">
            <div class="댓글내용">${el.comment_content}</div>
            <div class="댓글날짜">[${el.comment_date}]</div>
        </div>
        `
        ).join("")

        // 전체 댓글 랜더링
        commentContainer.innerHTML = commentHTML

        // 마지막 댓글 border 없애기
        // const allComments = commentContainer.querySelectorAll(".댓글틀")
        // const lastComment = allComments[allComments.length - 1]

        const lastComment = commentContainer.querySelector(".댓글틀:last-child")
        // querySelectorAll 방식
        // const allComments = document.querySelectorAll(".댓글틀")
        // const lastComment = allComments[allComments.length - 1]

        if (lastComment) {
            lastComment.style.borderBottom = "none"
        }
    
    } else {
        commentContainer.innerHTML = `<br /> <div>작성된 회고가 없습니다.</div>`
    }
}

// 새 댓글 작성
function newComment() {

    const pagenumber = getCurrentDiaryNumber() // 현재 페이지 number 찾기

    const key = `댓글목록_${pagenumber}`

    const 댓글들 = JSON.parse(localStorage.getItem(key)) || []

    const comment_content = document.querySelector(".회고인풋").value
    const comment_date = new Date().toLocaleDateString()

    const 새로운댓글 = { comment_content, comment_date }

    댓글들.push(새로운댓글)
    localStorage.setItem(key, JSON.stringify(댓글들))

    // 댓글창 초기화
    document.querySelector(".회고인풋").value = ""

    // 목록 새로고침
    renderComments()
}

// 초기 로드 시
window.addEventListener("DOMContentLoaded", () => {
    writing()
    renderComments()
})


// 수정화면 구성

//수정화면 속 수정하기 버튼 함수 - 미리 지정
function 수정하기() {
    const 쿼리스트링 = location.search;
    const params = new URLSearchParams(쿼리스트링);
    const pagenumber = Number(params.get('number'));
  
    // 기존 데이터 불러오기
    const 문자열일기들 = localStorage.getItem('일기들목록');
    const 일기들 = 문자열일기들 ? JSON.parse(문자열일기들) : [];
  
    const 선택된일기 = 일기들.find(el => el.number === pagenumber);
  
    // 새 입력값 가져오기
    const newFeeling = document.querySelector('input[name="feel"]:checked')?.value || 선택된일기.feeling;
    const newTitle = document.querySelectorAll('.입력텍스트')[0].value;
    const newContent = document.querySelectorAll('.입력텍스트')[1].value;
  
    // 수정값 덮어쓰기
    선택된일기.feeling = newFeeling;
    선택된일기.title = newTitle;
    선택된일기.content = newContent;
  
    // 저장
    localStorage.setItem('일기들목록', JSON.stringify(일기들));
  
    alert("수정이 완료되었습니다!");
    location.reload();
  }

//수정버튼 클릭 -> 수정화면 전환
function 수정화면() {

  //초기화면 삭제
  document.querySelectorAll(".수정버튼")
  .forEach(el => el.remove());

  // 페이지 number 찾기
  const 쿼리스트링 = location.search
  const params = new URLSearchParams(쿼리스트링)
  const pagenumber = Number(params.get('number'));

  // localStorage에서 일기들 꺼내기
  const 문자열일기들 = localStorage.getItem('일기들목록')
  const 일기들 = 문자열일기들 ? JSON.parse(문자열일기들) : []
  const 선택된일기 = 일기들.find(el => el.number === pagenumber);


  //내용물 HTML 구성
  const re_writingHTML = `
    <div class="기분선택영역">
        <div class="기분선택영역_글자">오늘 기분은 어땠나요?</div>
        <div class="라디오영역">
            <div class="기분체크틀">
                <input type="radio" name="feel" value="행복해요" class="radio"/>
                <div class="기분">행복해요</div>
            </div>
            <div class="기분체크틀">
                <input type="radio" name="feel" value="슬퍼요" class="radio"/>
                <div class="기분">슬퍼요</div>
            </div>
            <div class="기분체크틀">
                <input type="radio" name="feel" value="놀랐어요" class="radio"/>
                <div class="기분">놀랐어요</div>
            </div>
            <div class="기분체크틀">
                <input type="radio" name="feel" value="화나요" class="radio"/>
                <div class="기분">화나요</div>
            </div>
            <div class="기분체크틀">
                <input type="radio" name="feel" value="기타" class="radio"/>
                <div class="기분">기타</div>
            </div>
        </div>
    </div>

    <div class="입력영역">
        <div class="입력글자">제목</div>
        <textarea class="입력텍스트">${선택된일기.title}</textarea>
    </div>

    <div class="입력영역">
        <div class="입력글자">내용</div>
        <textarea class="입력텍스트">${선택된일기.content}</textarea>
    </div>

    <div class="버튼영역">
        <button class="취소버튼">취소</button>
        <button class="수정하기버튼">수정 하기</button>
    </div>
    `

    const 변경되는구역 = document.querySelector(".변경되는구역")
    변경되는구역.innerHTML = re_writingHTML

    // 기존 감정값 체크
    const checkedRadio = document.querySelector(`input[name="feel"][value="${선택된일기.feeling}"]`);
    if (checkedRadio) {
        checkedRadio.checked = true
    }

    // 수정하기버튼 설정
    const 수정하기버튼 = document.querySelector(".수정하기버튼")
    수정하기버튼.addEventListener("click", 수정하기)

    // 취소버튼 설정
    document.querySelector(".취소버튼").addEventListener("click", () => {
      location.reload()

    })


    // 회고 입력창과 버튼 비활성화 + placeholder 변경
    const 회고인풋 = document.querySelector(".회고인풋")
    const 입력버튼 = document.querySelector(".입력버튼")

    if (회고인풋) {
        회고인풋.disabled = true
        회고인풋.placeholder = "수정중일땐 회고를 작성할 수 없어요."
        회고인풋.style.backgroundColor = "#F2F2F2";
        회고인풋.style.color = "#ABABAB";
        회고인풋.style.borderColor = "#F2F2F2";
    }
    if (입력버튼) {
        입력버튼.disabled = true
        입력버튼.style.backgroundColor = "#C7C7C7";
        입력버튼.style.borderColor = "#C7C7C7";
    }

}