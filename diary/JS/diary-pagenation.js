// -----------------------------------------------------------------------------
// --------------------------------- 페이지네이션 ----------------------------------

let filteredDiaries = null // 전역 상태

// 시작페이지, 마지막페이지 + 페이지이동 버튼 설정
let 시작페이지 = 1

// 매번 마지막페이지 계산 - 드롭다운 실행시에도 실행되게
// const 마지막페이지 = Math.ceil(savedDiaries.length / 12)

const 이전페이지이동 = () => {
    if(시작페이지 === 1) {
        alert("시작 페이지입니다!")
    } else {
        시작페이지 = 시작페이지 - 10

        일기들그리기(시작페이지)
        페이지번호그리기(시작페이지)
    }
}

const 다음페이지이동 = () => {
    // 마지막페이지를 filteredDiaries 기준으로 동적 계산
    const diaries = filteredDiaries ?? JSON.parse(localStorage.getItem("일기들목록")) ?? []
    const 마지막페이지 = Math.ceil(diaries.length / 12) || 1

    if(시작페이지 + 10 <= 마지막페이지) {
        시작페이지 = 시작페이지 + 10

        일기들그리기(시작페이지)
        페이지번호그리기(시작페이지)
    } else {
        alert("마지막 페이지입니다!")
    }
}

// 페이지번호구역 설정  -> 페이지번호그리기
const 페이지번호그리기 = (클릭한페이지) => {
    const 페이지번호상자 = new Array(10).fill("페이지") // fill은 의미 없음
    console.log(페이지번호상자)
    
    const diaries = filteredDiaries ?? JSON.parse(localStorage.getItem("일기들목록")) ?? []
    const 마지막페이지 = Math.ceil(diaries.length / 12) || 1

    const 페이지번호들 = 페이지번호상자.map((el, index) => { // el : "페이지" -> 사용되지 않음 / index가 중요

        const 페이지번호 = 시작페이지 + index
        
        return 페이지번호 <= 마지막페이지 ? `<button
            onclick="일기들그리기(${페이지번호}); 페이지번호그리기(${페이지번호})"
            class= "페이지번호 ${클릭한페이지 === 페이지번호 ? "pageActive" : ""}"
            >${페이지번호}</button>` : ``
    }).join("")

    document.querySelector(".페이지번호구역").innerHTML = 페이지번호들
}

window.onload = () => {
    일기들그리기(시작페이지)
    페이지번호그리기(시작페이지)
}

const 일기들그리기 = (클릭한페이지) => {

    const savedDiaries = filteredDiaries ?? JSON.parse(localStorage.getItem("일기들목록")) ?? []

    if (savedDiaries.length > 0) {
        const emptyMsg = document.querySelector(".empty-message")
        if (emptyMsg) emptyMsg.remove()

        const page일기목록 = savedDiaries.filter((el, index) => {

        const 건너뛸갯수 = (클릭한페이지 - 1) * 12
        const 건너뛸인덱스 = 건너뛸갯수 - 1

        return 건너뛸인덱스 < index && index <= 건너뛸인덱스 + 12
        })

        document.querySelector(".일기보관함").innerHTML = page일기목록.map((el) => `
        <a href="./details/diary-detail.html?number=${el.number}" class="일기틀">
            <div class="감정이미지__${el.feeling}"></div>
            <img class="삭제버튼" src="./asset/icon/close_icon.png" onclick="openDeleteModal(event, ${el.number})" />
            <div class="일기속성">
                <div class="일기속성1">
                    <div class="감정__${el.feeling}">${el.feeling}</div>
                    <div class="날짜표시">${el.date}</div>
                </div>
                <div class="일기속성2">
                    <div class="타이틀">${el.title}</div>
                </div>
            </div>
        </a>
        `).join("")

    } else {
        document.querySelector(".일기보관함").innerHTML = `<div class="empty-message">일기가 없습니다.</div>`
    }
}


// ---------------------------------------- 페이지네이션 끝 ----------------------------------------------
// ---------------------------------------------------------------------------------------------------