function writing () {

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
                        <div class="감정">${선택된일기.feeling}</div>
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