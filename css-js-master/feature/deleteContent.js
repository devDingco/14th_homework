// 다른 화면에서 각각 작동하는 삭제 버튼
const deleteContent = (contentNumber,key) => { // <number,string>
    // delete 버튼에 id#number 주고, 그 nubmer 로 인덱스 찾아서 로컬스토리지에서 지우기
    switch (key) { // 일기콘텐츠, 일기콘텐츠디테일
        // 콘텐츠 id 와 로컬스토리지 인덱스 검증
        case "일기콘텐츠": {
            const diaryContentArr = document.getElementsByClassName("diary_content")
            for (let i=0; i < diaryContentArr.length; i++) {
                let diaryContentNumber = Number(diaryContentArr[i].id.slice(diaryContentArr[i].id.lastIndexOf("#")+1))
                if (diaryContentNumber === contentNumber) {
                    // openModal('main_delete_modal_group')
                    deleteStorage(contentNumber,key)
                }
            }
            if (JSON.parse(localStorage.getItem(key))) {
                makeMainHtml(JSON.parse(localStorage.getItem(key)))
            } else {
                document.getElementById("diary_box_container").innerHTML = `<h1>작성된 일기가 없습니다!<h1>`
            }
            break
        }
        case "일기콘텐츠디테일": {
            // openModal('main_delete_modal_group')
            deleteStorage(contentNumber,"일기콘텐츠")
            break
        }
        default:
    }
}

// 배열이 비어있을시 로컬스토리 완전삭제, 아닐시 로컬스토리지에 변경사항 저장
const deleteStorage = (contentNumber,key) => {
    const updateArr = JSON.parse(localStorage.getItem(key)).filter(v => Number(v.number) !== contentNumber)
    updateArr.length === 0 ? localStorage.removeItem(key) : toLocalStorage(updateArr,key)
    alert(`${contentNumber+1}` + " 번 일기가 삭제 되었습니다!")
    window.location.assign(`http://localhost:${window.location.port}/css-js-master/index.html`)
}