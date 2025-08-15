// 삭제버튼 설정
function 삭제하기(event, number) {
    // 이벤트 전파 막기
    event.stopPropagation()
    event.preventDefault()

    // 삭제 확인 알림
    alert("일기가 삭제되었습니다.")

    // 로컬스토리지에서 일기들 불러오기
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

// 새 일기 작성
function WriteNewDiary() {
    const 일기들 = JSON.parse(localStorage.getItem("일기들목록")) || []

    const number = 일기들.length > 0 ? 일기들[일기들.length - 1].number + 1 : 1
    const feeling = document.querySelector('input[name="feel"]:checked').value
    const title = document.getElementById("제목__내용입력").value
    const content = document.getElementById("내용__내용입력").value
    const date = new Date().toLocaleDateString()

    const 새로운일기 = { number, feeling, title, content, date }

    일기들.push(새로운일기)
    localStorage.setItem("일기들목록", JSON.stringify(일기들))

    // 입력창 초기화
    document.getElementById("제목__내용입력").value = ""
    document.getElementById("내용__내용입력").value = ""
    const checkedRadio = document.querySelector('input[name="feel"]:checked')
    if (checkedRadio) checkedRadio.checked = false

    // 목록 다시 렌더링
    renderDiaries()
}

// 필터 함수
function diaryFilter(selectedFeeling) {

    let 일기들 = JSON.parse(localStorage.getItem("일기들목록")) || []

    // "전체"가 아니라면 해당 감정만 필터링
    if (selectedFeeling !== "전체") {
        일기들 = 일기들.filter(el => el.feeling === selectedFeeling)
    }

    // 필터링된 목록 랜더링
    renderDiaries(일기들)

}

// 필터값 변경 시 이벤트

window.addEventListener("DOMContentLoaded", () => {

    // 첫 렌더링
    renderDiaries()

    // 필터 select 요소 이벤트 연결
    const filterSelect = document.querySelector(".일기필터")

    // if (filterSelect) {
        filterSelect.addEventListener("change", (event) => {
            const selectedFeeling = event.target.value
            diaryFilter(selectedFeeling)

            // event.target.style.backgroundColor = "black"
            // event.target.style.color = "#E4E4E4"

        })
    // }
})

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
      const modals = document.querySelectorAll('.modal');
      modals.forEach(modal => {
        modal.style.display = 'none'
      })
    }
  })

// 실제 삭제 + 모달 닫기
function handleDelete(event, number) {

    event.stopPropagation()
    event.preventDefault() 

    삭제하기(event, number)      // 삭제 처리
    modalClose('전체닫기')        // 모달 닫기
}

// 모달 열기 + 삭제 버튼에 number 연결
function openDeleteModal(event, number) {

    event.stopPropagation() // 부모 <a> 클릭 막기
    event.preventDefault()  // 링크 기본 동작 막기

    const deleteBtn = document.querySelector("#deleteModalGroup .검정버튼")
    deleteBtn.setAttribute("onclick", `handleDelete(event, ${number})`)
    modalOpen('deleteModalGroup')
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

// 강아지 불러오는 기능
const 강아지불러오는기능 = () => {
    console.log("강아지불러오는기능 실행됨")

    fetch('https://dog.ceo/api/breeds/image/random/10')
        .then(response => response.json())
        .then(data => {
            console.log(data)

            const 이미지다운로드주소들 = data.message
            const 상태 = data.status
            console.log(`이미지다운로드주소들: ${이미지다운로드주소들}`)
            console.log(`상태: ${상태}`)

            document.getElementById('강아지보여주는곳').innerHTML =
                이미지다운로드주소들
                    .map(url => `<img src="${url}" class="보관된사진" width="300px" />`)
                    .join('')
        console.log('강아지 HTML 생성됨')
        })
        .catch(error => {
            console.error('강아지 불러오기 실패:', error)
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



    // 화면에 일기카드 추가하기

    // const 일기목록HTML = 일기들배열.map((el, index) => `
    //     <a href="./diary-detail.html?number=${index}" class="일기틀">
    //         <div class="감정이미지__${el.feeling}"></div>
    //         <div class="일기속성">
    //             <div class="일기속성1">
    //                 <div class="감정__${el.feeling}">${el.feeling}</div>
    //                 <div class="날짜표시">${el.date}</div>
    //             </div>
    //             <div class="일기속성2">
    //                 <div class="타이틀">${el.title}</div>
    //             </div>
    //         </div>
    //     </a>`
    // ).join("")
    
    // 전에 썼던 코드 흔적 - createElement
    // const 일기틀 = document.createElement('div')
    // 일기틀.className = '일기틀'
    // 일기틀.innerHTML =`
    // <div class="감정이미지"></div>
    // <div class="일기속성">
    //     <div class="일기속성1">
    //         <div class="감정">슬퍼요</div>
    //         <div class="날짜표시">2025. 8. 7.</div>
    //     </div>
    //     <div class="일기속성2">
    //         <div class="타이틀">
    //             타이틀 영역입니다. 한줄까지만 노출 됩니다.
    //         </div>
    //     </div>
    // </div>
    // `

    // 일기틀.querySelector(".감정").innerText = feeling
    // 일기틀.querySelector(".날짜표시").innerText = date
    // const 타이틀El = 일기틀.querySelector(".타이틀").innerText = title

    // document.querySelector(".일기보관함").appendChild(일기틀)

    // const 감정El = 일기틀.querySelector(".감정")
    // const 감정이미지El = 일기틀.querySelector(".감정이미지")

    // // 감정별 스타일 & 이미지
    // if (feeling === "행복해요") {
    //     감정El.style.color = "#EA5757"
    //     감정이미지El.style.backgroundImage = "url(./asset/image/happy.png)"
    // } else if (feeling === "슬퍼요") {
    //     감정El.style.color = "#28B4E1"
    //     감정이미지El.style.backgroundImage = "url(./asset/image/sad.png)"
    // } else if (feeling === "놀랐어요") {
    //     감정El.style.color = "#D59029"
    //     감정이미지El.style.backgroundImage = "url(./asset/image/surprised.png)"
    // } else if (feeling === "화나요") {
    //     감정El.style.color = "#777"
    //     감정이미지El.style.backgroundImage = "url(./asset/image/mad.png)"
    // } else {
    //     // 기타 감정 기본 스타일
    //     감정El.style.color = "#000"
    //     감정이미지El.style.backgroundImage = "none"
    // }


    // 일기틀.addEventListener("click", () => {
    //     alert(
    //       `기분: ${새로운일기.feeling}\n` +
    //       `날짜: ${새로운일기.date}\n` +
    //       `제목: ${새로운일기.title}\n` +
    //       `내용: ${새로운일기.content}`
    //     )
    //   })
