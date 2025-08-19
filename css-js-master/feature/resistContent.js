// 일기 쓰기 => 등록하기 클릭시 작동
const resistContent = (key) => { // string
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

        if (localStorage.getItem(key)) {
            // 두번째 컨텐츠 저장부터
            const localStorageArr = JSON.parse(localStorage.getItem(key))
            const contentObj = {
                number: localStorageArr[localStorageArr.length-1].number + 1,
                date: currentDate,
                feel: feelValue,
                title: titleValue,
                detail: detailValue
            }
            localStorageArr.push(contentObj)

            try {
                toLocalStorage(localStorageArr,key)
                document.getElementById('detail_input').value = '';
                document.getElementById('title_input').value = '';
                document.querySelectorAll('input[name="feel"]').forEach(radio => {
                    radio.checked = false;
                });
                document.getElementById("diary_box_container").innerHTML = makeMainHtml(localStorageArr)
            } catch(e) {
                console.log(e)
            }
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
            
            try {
                toLocalStorage(contentArray,key)
                document.getElementById('detail_input').value = '';
                document.getElementById('title_input').value = '';
                document.querySelectorAll('input[name="feel"]').forEach(radio => {
                    radio.checked = false;
                });
                document.getElementById("diary_box_container").innerHTML = makeMainHtml(contentArray)
            } catch(e) {
                console.log(e)
            }
        }
    }
}

