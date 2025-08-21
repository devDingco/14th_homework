  // 서치바 설정
let 타이머

const 검색기능 = (event) => {

    clearTimeout(타이머) // 디바운싱

    타이머 = setTimeout(() => {

        const 검색어 = event.target.value.trim() // 앞뒤 공백 제거
        console.log("검색어:", 검색어)

        // 검색 결과 필터링
        filteredDiaries = 검색어
            ? savedDiaries.filter((el) =>
                el.title.includes(검색어) ||
                el.content.includes(검색어) ||
                el.feeling.includes(검색어) ||
                el.date.includes(검색어)
            )
            : null // 검색어 없으면 전체 표시

        시작페이지 = 1
        일기들그리기(시작페이지)
        페이지번호그리기(시작페이지)
    }, 300) //

}

// 삭제버튼 설정
function 삭제하기(event, number) {
    // 이벤트 전파 막기
    event.stopPropagation()
    event.preventDefault()

    // 삭제 확인 알림
    // alert("일기가 삭제되었습니다.")

    const 일기들 = JSON.parse(localStorage.getItem("일기들목록")) || []

    // 해당 number 제외하고 필터링
    const 삭제후남은일기들 = 일기들.filter(el => el.number !== number)

    // 로컬스토리지 저장
    localStorage.setItem("일기들목록", JSON.stringify(삭제후남은일기들))

    // 화면 갱신
    시작페이지 = 1
    일기들그리기(시작페이지)
    페이지번호그리기(시작페이지)
}

// ---------------------------------------------------------------------
// ------------------------------- 드롭다운 -------------------------------

window.addEventListener("DOMContentLoaded", () => {

    const dropdownTitle = document.querySelector(".드롭다운제목")
    const dropdownList = document.querySelector(".드롭다운목록")

    // 초기 렌더링
    일기들그리기(시작페이지)
    페이지번호그리기(시작페이지)

    // 드롭다운 버튼 클릭 시 목록 열기/닫기
    dropdownTitle.addEventListener("click", () => {
        dropdownList.style.display = dropdownList.style.display === "block" ? "none" : "block"
    });

    // 드롭다운 목록 선택 시
    dropdownList.querySelectorAll("input[type=radio]").forEach(input => {
        input.addEventListener("click", (event) => {
            const selectedFeeling = event.target.id

            // 버튼 텍스트 변경
            dropdownTitle.textContent = selectedFeeling

            // 목록 닫기
            dropdownList.style.display = "none"

            // 필터 적용
            diaryDropdown(selectedFeeling)
        });
    });

    // 외부 클릭 시 목록 닫기
    document.addEventListener("click", (event) => {
        if (!event.target.closest(".일기드롭다운")) {
            dropdownList.style.display = "none"
        }
    })
})

// 필터 함수
function diaryDropdown(selectedFeeling) {
    const allDiaries = JSON.parse(localStorage.getItem("일기들목록")) || []

    if (selectedFeeling === "전체") {
        filteredDiaries = null
    } else {
        filteredDiaries = allDiaries.filter(el => el.feeling === selectedFeeling)
    }

    시작페이지 = 1
    일기들그리기(시작페이지)
    페이지번호그리기(시작페이지)
}

// ---------------------------------- 드롭다운 끝 ---------------------------------
// -----------------------------------------------------------------------------


// 플로팅버튼 - 스크롤 기능
function 스크롤기능() {
    window.scrollTo({ top: 0, behavior: "smooth"})
}

// 페이지 로드 시: 저장된 상태 복원 + 모든 토글 스위치 모양 맞추기
window.addEventListener("DOMContentLoaded", () => {
    const saved = sessionStorage.getItem("다크모드");
    const isDark = saved === "true";
  
    // html에 다크모드 적용 (명시적 설정)
    document.documentElement.classList.toggle("다크모드", isDark);
  
    // 페이지 안의 모든 토글 스위치 체크 상태를 저장값과 동기화
    document.querySelectorAll(".토글클릭").forEach(el => {
      el.checked = isDark;
    });
  });
  
  // 토글 클릭 시: 클릭한 스위치의 상태를 기준으로 전체를 동기화
  function 토글기능(el) {
    const isDark = el.checked; // 클릭 결과를 신뢰
  
    // html 다크모드 on/off를 명시적으로 설정
    document.documentElement.classList.toggle("다크모드", isDark);
  
    // 상태 저장 (같은 탭에서 페이지 이동해도 유지)
    sessionStorage.setItem("다크모드", isDark);
  
    // 현재 페이지에 있는 다른 토글들도 모양을 똑같이 맞춰줌
    document.querySelectorAll(".토글클릭").forEach(t => {
      if (t !== el) t.checked = isDark;
    });
  }

// -----------------------------------------------------------------------------------
// ------------------------------------- 메뉴 이동 -------------------------------------

// 메뉴 이동
const 메뉴이동 = (메뉴이름) => {
    // 모든 메뉴에서 active 제거
    document.querySelectorAll(".메뉴전체").forEach(메뉴 => {
        메뉴.classList.remove("active")
    })

    // 선택한 메뉴만 active 추가
    const 선택한메뉴 = document.querySelector(`.${메뉴이름}`)
    if (선택한메뉴) {
        선택한메뉴.classList.add("active")
    }
    console.log('현재 선택된 메뉴', 선택한메뉴)
    // 강아지불러오는기능()
}

// 초기화면 설정 (페이지 로드 시)
window.addEventListener("DOMContentLoaded", () => {
    메뉴이동('메뉴__일기보관함')
})


// 새로운 일기 등록 함수

// function renderDiaries() {

//     const savedDiaries = filteredDiaries ?? JSON.parse(localStorage.getItem("일기들목록")) ?? []
//     const diaryContainer = document.querySelector(".일기보관함")

//     if (savedDiaries.length > 0) {
//         const emptyMsg = document.querySelector(".empty-message")
//         if (emptyMsg) emptyMsg.remove()
            
//         const diaryHTML = savedDiaries.map((el) => `
//             <a href="./details/diary-detail.html?number=${el.number}" class="일기틀">
//                 <div class="감정이미지__${el.feeling}"></div>
//                 <img class="삭제버튼" src="./asset/icon/close_icon.png" onclick="openDeleteModal(event, ${el.number})" />
//                 <div class="일기속성">
//                     <div class="일기속성1">
//                         <div class="감정__${el.feeling}">${el.feeling}</div>
//                         <div class="날짜표시">${el.date}</div>
//                     </div>
//                     <div class="일기속성2">
//                         <div class="타이틀">${el.title}</div>
//                     </div>
//                 </div>
//             </a>`
//         ).join("")

//         diaryContainer.innerHTML = diaryHTML
//     } else {
//         diaryContainer.innerHTML = `<div class="empty-message">일기가 없습니다.</div>`
//     }
// }
