const deleteLocalStorage = () => {
    if (localStorage.getItem("일기콘텐츠")) {
        localStorage.removeItem("일기콘텐츠")
        alert("로컬스토리지가 비워졌습니다.")
        document.getElementById("diary_box_container").innerHTML = `<h1>작성된 일기가 없습니다!<h1>`
    } else {
        alert("로컬스토리지가 이미 비워져있습니다.")
    }
}