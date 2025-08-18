// 서치바 설정
let 타이머

const 검색기능 = (event) => {

    clearTimeout(타이머) // 디바운싱

    타이머 = setTimeout(() => {

        const 검색어 = event.target.value.trim() // 앞뒤 공백 제거
        console.log("검색어:", 검색어)
    
        const 일기들 = JSON.parse(localStorage.getItem("일기들목록")) || []

        // 검색 결과 필터링
        const 검색결과 = 검색어
            ? 일기들.filter((el) =>
                el.title.includes(검색어) ||
                el.content.includes(검색어) ||
                el.feeling.includes(검색어) ||
                el.date.includes(검색어)
            )
            : 일기들

        console.log("검색결과:", 검색결과)

        // 👉 renderDiaries() 함수 재활용 (중복 코드 제거)
        renderDiaries(검색결과)
    }, 100) //

}

// 삭제버튼 설정
function 삭제하기(event, number) {
    // 이벤트 전파 막기
    event.stopPropagation()
    event.preventDefault()

    // 삭제 확인 알림
    // alert("일기가 삭제되었습니다.")

    let 일기들 = JSON.parse(localStorage.getItem("일기들목록")) || []

    // 해당 number 제외하고 필터링
    const 삭제후남은일기들 = 일기들.filter(el => el.number !== number)

    // 로컬스토리지 저장
    localStorage.setItem("일기들목록", JSON.stringify(삭제후남은일기들))

    // 화면 갱신
    renderDiaries()
}

// 새로운 일기 등록 함수
function renderDiaries(filteredDiaries = null) {

    const savedDiaries = filteredDiaries ?? JSON.parse(localStorage.getItem("일기들목록")) ?? []
    const diaryContainer = document.querySelector(".일기보관함")

    if (savedDiaries.length > 0) {
        const emptyMsg = document.querySelector(".empty-message")
        if (emptyMsg) emptyMsg.remove()
            
        const diaryHTML = savedDiaries.map((el) => `
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
            </a>`
        ).join("")

        diaryContainer.innerHTML = diaryHTML
    } else {
        diaryContainer.innerHTML = `<div class="empty-message">일기가 없습니다.</div>`
    }
}

// 초기 로드 시
window.addEventListener("DOMContentLoaded", renderDiaries)

// 드롭다운
const 일기드롭다운기능 = (event) => {
    document.querySelector(".드롭다운제목").style = `--드롭다운변수: "${event.target.id}"`
    document.querySelector(".드롭다운제목").click()  // 선택 후에 다시 클릭
}


// 필터 함수
function diaryDropdown(selectedFeeling) {

    let 일기들 = JSON.parse(localStorage.getItem("일기들목록")) || []

    // "전체"가 아니라면 해당 감정만 필터링
    if (selectedFeeling !== "전체") {
        일기들 = 일기들.filter(el => el.feeling === selectedFeeling)
    }

    // 필터링된 목록 랜더링
    renderDiaries(일기들)

}

// 드롭다운 값 변경 시 이벤트
window.addEventListener("DOMContentLoaded", () => {

    // 첫 렌더링
    renderDiaries()

    const dropdownSelect = document.querySelector(".드롭다운목록")

        dropdownSelect.addEventListener("click", (event) => {
            const selectedFeeling = event.target.id
            diaryDropdown(selectedFeeling)

            // event.target.style.backgroundColor = "black"
            // event.target.style.color = "#E4E4E4"

        })

})

// 필터 색반전
window.addEventListener("DOMContentLoaded", () => {

    const filterSelect = document.querySelector(".필터")

    // 선택창 열렸을 때 색 반전
    filterSelect.addEventListener("focus", () => {
        filterSelect.classList.add("focused");
    });

    // 선택창 닫혔을 때 색 원상복구
    filterSelect.addEventListener("blur", () => {
        filterSelect.classList.remove("focused");
    });
});

// 플로팅버튼 - 스크롤 기능
function 스크롤기능() {
    window.scrollTo({ top: 0, behavior: "smooth"})
}


// 모달 영역

function modalOpen(모달종류) {

    // 스크롤 맨 위로 이동
    window.scrollTo(0, 0)

    document.getElementById(모달종류).style.display = "block"

    // 뒷배경 스크롤 막기
    document.body.style.overflow = 'hidden'
}

function modalClose(모달종류) {
    if (모달종류 === "전체닫기") {
        const modals = document.querySelectorAll('.modal')
        modals.forEach(modal => {
            modal.style.display = "none"
        })
    } else {
        document.getElementById(모달종류).style.display = "none"
    }

    // 뒷배경 스크롤 다시 허용
    document.body.style.overflow = ''
}

// ESC 키 눌렀을 때 모달 닫기
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' || event.key === 'Esc') {

      const modals = document.querySelectorAll('.modal')
      modals.forEach(modal => {
        modal.style.display = 'none'
      })
      
      입력초기화()
    }
  })

// 일기 쓰기 모달 등록버튼 설정

window.addEventListener("DOMContentLoaded", () => {

    // 요소 가져오기
    const titleInput = document.getElementById('제목__내용입력')
    const contentInput = document.getElementById('내용__내용입력')
    const feelRadios = document.querySelectorAll('input[name="feel"]')
    const submitBtn = document.getElementById("모달등록하기버튼")

    // 버튼 활성화/비활성화 자동 체크
    function checkDiaryInputs() {
        const feelChecked = Array.from(feelRadios).some(radio => radio.checked)
        const titleFilled = titleInput.value.trim() !== '' //양쪽 공백 없애기 - 공백은 입력으로 취급안함
        const contentFilled = contentInput.value.trim() !== ''
        submitBtn.disabled = !(feelChecked && titleFilled && contentFilled)
    }

    // 이벤트 등록
    feelRadios.forEach(radio => radio.addEventListener('change', checkDiaryInputs))
    titleInput.addEventListener('input', checkDiaryInputs)
    contentInput.addEventListener('input', checkDiaryInputs)

    // 초기 버튼 상태 체크
    checkDiaryInputs()

    // 새 일기 등록
    submitBtn.addEventListener('click', () => {
        let 일기들 = JSON.parse(localStorage.getItem("일기들목록")) || []

        const number = 일기들.length > 0 ? 일기들[일기들.length - 1].number + 1 : 1
        const feeling = document.querySelector('input[name="feel"]:checked').value
        const title = titleInput.value.trim()
        const content = contentInput.value.trim()
        const date = new Date().toLocaleDateString()

        const 새로운일기 = { number, feeling, title, content, date }

        일기들.push(새로운일기)
        localStorage.setItem("일기들목록", JSON.stringify(일기들))

        입력초기화()

        // 화면 갱신
        renderDiaries()
    });
});

const 입력초기화 = () => {
    const titleInput = document.getElementById('제목__내용입력')
    const contentInput = document.getElementById('내용__내용입력')
    const feelRadios = document.querySelectorAll('input[name="feel"]')
    const submitBtn = document.getElementById("모달등록하기버튼")

    // 입력 초기화
    titleInput.value = ""
    contentInput.value = ""
    feelRadios.forEach(radio => radio.checked = false)
    submitBtn.disabled = true  // 직접 비활성화

    renderDiaries()
}

// deleteModalGroup 모달 열면서, delFinishModalGroup 삭제 버튼에 number 연결
function openDeleteModal(event, number) {

    event.stopPropagation() // 부모 <a> 클릭 막기
    event.preventDefault()  // 링크 기본 동작 막기

    modalOpen('deleteModalGroup')

    const deleteBtn = document.querySelector("#delFinishModalGroup .확인버튼")
    deleteBtn.addEventListener("click", (event) => handleDelete(event, number))
}

// delFinishModalGroup에서 삭제 + 모달 닫기
function handleDelete(event, number) {

    event.stopPropagation()
    event.preventDefault() 

    삭제하기(event, number)      // 삭제 처리
    modalClose('전체닫기')        // 모달 닫기
}

// 토글기능
const 토글기능 = () => {
    const modals = document.querySelectorAll(".모달") // 여러 개 선택됨
    modals.forEach(modal => {
        modal.classList.toggle("다크모드")
    })
}

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

// 사진보관함

// 공통: 강아지 1마리 불러오기
const 강아지한마리그리기 = () => {
    fetch('https://dog.ceo/api/breeds/image/random')
        .then(response => response.json())
        .then(data => {
            const 이미지다운로드주소 = data.message
            document.getElementById('강아지보여주는곳').innerHTML += `
                <img src="${이미지다운로드주소}" class="보관된사진" width="300px" />`
        })
        .catch(error => {
            console.error('강아지 불러오기 실패:', error)
        })
}

// 초기 10마리 불러오기
const 초기강아지로드 = (개수 = 10) => {
    for (let i = 0; i < 개수; i++) {
        강아지한마리그리기()
    }
}

// 무한 스크롤
const 강아지불러오는기능 = () => {
    console.log("강아지불러오는기능 실행됨")

    // 페이지 진입 시 미리 10마리
    초기강아지로드(10)

    let 타이머2 = "아직실행안함"
    window.addEventListener("scroll", () => {
        if (타이머2 !== "아직실행안함") return
        타이머2 = setTimeout(() => {
            타이머2 = "아직실행안함"
        }, 100)

        const 스크롤퍼센트 =
            document.documentElement.scrollTop /
            (document.documentElement.scrollHeight - document.documentElement.clientHeight)

        if (스크롤퍼센트 >= 0.7) {
            console.log("강아지를 추가로 그려줍니다.")
            강아지한마리그리기()
        }
    })
}

// 사진보관함 메뉴 클릭 시 이벤트

window.addEventListener("DOMContentLoaded", () => {
    강아지불러오는기능()
    
    // const 사진보관함메뉴 = document.getElementById('사진보관함ID')
    // 사진보관함메뉴.addEventListener('click', () => {
    //     메뉴이동('메뉴__사진보관함')
    // })

})


// 사진필터 설정

function pictureFilter(selectedSize) {

    document.querySelectorAll(".보관된사진").forEach((el) => {
        if (selectedSize === "기본") {
            el.style.aspectRatio = "1/1";
        } else if (selectedSize === "가로형") {
            el.style.aspectRatio = "4/3";
        } else if (selectedSize === "세로형") {
            el.style.aspectRatio = "3/4";
        }
    })

}

window.addEventListener("DOMContentLoaded", () => {

    const filterSelect = document.querySelector(".사진필터")

        filterSelect.addEventListener("change", (event) => {
            const selectedSize = event.target.value
            pictureFilter(selectedSize)
        })

})