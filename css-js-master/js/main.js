window.onload = () => {
    const localStorageArr = JSON.parse(localStorage.getItem("일기콘텐츠"))
    console.log('window.onload -> ',localStorageArr)

    const contentHTML = localStorageArr.map((v,i) => {
        let imgSrc
        let feelColor
        // rgba(234, 87, 87, 1);
        // rgba(40, 180, 225, 1);
        // rgba(213, 144, 41, 1);
        // rgba(119, 119, 119, 1);
        // rgba(162, 41, 237, 1);
        switch(v.feel) {
            case "행복해요": {
                imgSrc = `./images/행복해요 (m).png`
                feelColor = `rgba(234, 87, 87, 1);`
                break
            }
            case "슬퍼요": {
                imgSrc = `./images/슬퍼요 (m).png`
                feelColor = `rgba(40, 180, 225, 1);`
                break
            }
            case "놀랐어요": {
                imgSrc = `./images/놀랐어요 (m).png`
                feelColor = `rgba(213, 144, 41, 1);`
                break
            }
            case "화나요": {
                imgSrc = `./images/화나요 (m).png`
                feelColor = `rgba(119, 119, 119, 1);`
                break
            }
            case "기타": {
                imgSrc = `./images/기타 (m).png`
                feelColor = `rgba(162, 41, 237, 1);`
                break
            }
            default:
        }
        return `
            <div id="diary${i}" class="diary_content">
                <img src="${imgSrc}"/>
                <div id="view_content_detail">
                    <div id="top_view_content_detail">
                        <p class="body01" style="color: ${feelColor}">
                            ${v.feel}
                        </p>
                        <p class="body04" style="color: rgba(145, 145, 145, 1);">
                            ${v.date}
                        </p>
                    </div>
                    <div id="bottom_view_content_detail">
                        <a class="title01" href="./pages/detail.html?number=${v.number}">
                            ${v.title}
                        </a>
                    </div>
                </div>
            </div>
            `
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
        const currentDate = 
        `
        ${new Date().getFullYear()}. ${new Date().getMonth() + 1}. ${new Date().getDate()}
        `

        if (localStorage.getItem("일기콘텐츠")) {
            // 두번째 컨텐츠 저장부터
            const localStorageArr = JSON.parse(localStorage.getItem("일기콘텐츠"))
            const contentObj = {
                number: localStorageArr[localStorageArr.length-1].number + 1,
                date: currentDate,
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
                date: currentDate,
                feel: feelValue,
                title: titleValue,
                detail: detailValue
            }
            contentArray.push(contentObj)
            
            toLocalStorage(contentArray)
        }
    }
})