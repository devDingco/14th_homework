const confirmUpdate = (key) => { // <string>
    const updateRadioFormData = new FormData(document.getElementById("update_feeling_radio_container"))
    const feelValue = updateRadioFormData.get("feel")
    const titleValue = document.getElementById("update_title_input").value
    const detailValue = document.getElementById("update_detail_input").value

    const checkTitle = (titleValue.trim() == "") // true
    const checkDetail = (detailValue.trim() == "") // true

    if (checkTitle && checkDetail) {
        alert("제목, 내용을 비우지 마세요.")
    } else if (checkTitle) {
        alert("제목을 비우지 마세요.")
    } else if (checkDetail) {
        alert("내용을 비우지 마세요.")
    }
    
    const localStorageArr = JSON.parse(localStorage.getItem(key))
    let indexToChange = getContentNumber().number

    const objectToChange = {
        number: indexToChange,
        date: localStorageArr[indexToChange].date,
        feel: feelValue,
        title: titleValue,
        detail: detailValue
    }
    
    const updateArr = localStorageArr.map((v, i) => {
        return i === indexToChange ? v = objectToChange : v
    })

    try {
        if (JSON.stringify(updateArr[indexToChange]) === JSON.stringify(localStorageArr[indexToChange])) {
            alert("변경사항이 없습니다.")
            return
        } else {
            toLocalStorage(updateArr,key)
            document.getElementById("update_confirm_button").style = "transform: rotateZ(30deg); transition: 1s;"
            alert(`${indexToChange}번 일기가 수정되었습니다`)
            // todo - 메인페이지로 이동
            setTimeout(() => {
                window.location.assign(`http://localhost:${window.location.port}/css-js-master/index.html`)
            }, 1000)
            // window.location.assign(`http://localhost:${window.location.port}/css-js-master/index.html`)
        }
    } catch(e) {
        alert(e)
    }   
}