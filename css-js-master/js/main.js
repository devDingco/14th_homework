window.onload = () => {
    const localStorageArr = JSON.parse(localStorage.getItem("일기콘텐츠"))
    console.log('window.onload -> ',localStorageArr)

    const contentHTML = localStorageArr.map((v,i) => {
        let imgSrc
        switch(v.feel) {
            case "행복해요": {
                imgSrc = `./images/행복해요 (m).png`
                break
            }
            case "슬퍼요": {
                imgSrc = `./images/슬퍼요 (m).png`
                break
            }
            case "놀랐어요": {
                imgSrc = `./images/놀랐어요 (m).png`
                break
            }
            case "화나요": {
                imgSrc = `./images/화나요 (m).png`
                break
            }
            case "기타": {
                imgSrc = `./images/기타 (m).png`
                break
            }
            default:
        }
        return `<div id="diary${i}" class="diary_content"><img src="${imgSrc}"/>${v.feel}${v.title}${v.detail}</div>`
    }).join("")

    document.getElementById("diary_box_container").innerHTML = contentHTML
}

// 일기 쓰기 => 등록하기 클릭시 작동
document.getElementById("resisterContent").addEventListener("click", () => {
    const radioFormData = new FormData(document.getElementById("feeling_radio_container"))
    const feelValue = radioFormData.get("feel")
    const titleValue = document.getElementById("title_input").value
    const detailValue = document.getElementById("detail_input").value
    // 입력 안되었을시 null, '', ''

    // 안 적거나 안 선택한 값 확인
    const checkTitle = (titleValue.trim() == "") // true
    const checkDetail = (detailValue.trim() == "") // true
    const checkFeel = (feelValue === null) // true

    if (checkFeel && checkTitle && checkDetail) {
        alert(`기분, 제목, 내용을 입력해주세요.`)
    } else if (checkFeel && checkTitle) {
        alert(`기분, 제목을 입력해주세요.`)
    } else if (checkFeel && checkDetail) {
        alert(`기분, 내용을 입력해주세요.`)
    } else if (checkTitle && checkDetail) {
        alert(`제목, 내용을 입력해주세요.`)
    } else if (checkFeel) {
        alert(`기분을 선택해주세요`)
    } else if (checkTitle) {
        alert(`제목을 입력해주세요.`)
    } else if (checkDetail) {
        alert(`내용을 입력해주세요.`)
    } else {
        const contentArray = []

        if (localStorage.getItem("일기콘텐츠")) {
            // 두번째 컨텐츠 저장부터
            const localStorageArr = JSON.parse(localStorage.getItem("일기콘텐츠"))
            const contentObj = {
                number: localStorageArr[localStorageArr.length-1].number + 1,
                feel: feelValue,
                title: titleValue,
                detail: detailValue
            }
            localStorageArr.push(contentObj)

            console.log("로컬스토리지 저장 함수 실행")
            toLocalStorage(localStorageArr)
        } else {
            // 첫 컨텐츠 저장시
            // 선택 정보 세팅
            const contentObj = {
                number: 0,
                feel: feelValue,
                title: titleValue,
                detail: detailValue
            }
            contentArray.push(contentObj)
            
            toLocalStorage(contentArray)
        }
    }
})