function writing() {

  // 페이지 number 찾기
  const 쿼리스트링 = location.search
  const params = new URLSearchParams(쿼리스트링)
  const number = params.get('number')
  console.log(number)

  // localStorage에서 일기들 꺼내기
  const 문자열일기들 = localStorage.getItem('일기들목록')
  const 일기들 = 문자열일기들 ? JSON.parse(문자열일기들) : []

  const 선택된일기 = 일기들[Number(number)-1]

  //내용물 HTML 구성
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
  `

  const 변경되는구역 = document.querySelector(".변경되는구역")
  변경되는구역.innerHTML = writingHTML

}


// 초기 로드 시
window.addEventListener("DOMContentLoaded", writing);


//수정화면 속 수정하기 버튼 함수 - 미리 지정
function 수정하기() {
    const 쿼리스트링 = location.search;
    const params = new URLSearchParams(쿼리스트링);
    const number = params.get('number');
  
    // 기존 데이터 불러오기
    const 문자열일기들 = localStorage.getItem('일기들목록');
    const 일기들 = 문자열일기들 ? JSON.parse(문자열일기들) : [];
  
    const 선택된일기 = 일기들[Number(number) - 1];
  
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
  const number = params.get('number')

  // localStorage에서 일기들 꺼내기
  const 문자열일기들 = localStorage.getItem('일기들목록')
  const 일기들 = 문자열일기들 ? JSON.parse(문자열일기들) : []
  const 선택된일기 = 일기들[Number(number)-1]


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
      checkedRadio.checked = true;
  }

  // 수정하기버튼 설정
  const 수정하기버튼 = document.querySelector(".수정하기버튼");
  수정하기버튼.addEventListener("click", 수정하기);

  // 취소버튼 설정
  document.querySelector(".취소버튼").addEventListener("click", () => {
    location.reload();
  });
}