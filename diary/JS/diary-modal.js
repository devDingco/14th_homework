// ---------------------------------------------------------------------------------------------------
// -------------------------------------------- 모달 영역 ----------------------------------------------

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

        savedDiaries = 일기들

        입력초기화()

        // 최신 localStorage 데이터 기준으로 다시 그리기
        시작페이지 = 1
        일기들그리기(시작페이지)
        페이지번호그리기(시작페이지)
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

    // 최신 localStorage 데이터 기준으로 다시 그리기
    시작페이지 = 1
    일기들그리기(시작페이지)
    페이지번호그리기(시작페이지)
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

// ------------------------------------- 모달 영역 끝 ----------------------------------
// ----------------------------------------------------------------------------------