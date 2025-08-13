const viewDiaryFilter = () => {
    const getFilterFeel = document.getElementById("diary_filter").value
    const localStorageArr = JSON.parse(localStorage.getItem("일기콘텐츠"))

    if (getFilterFeel === "전체") {
        document.getElementById("diary_box_container").innerHTML = makeMainHtml(localStorageArr)
    } else {
        const filterContentArr = localStorageArr.filter(v => v.feel === getFilterFeel).map(v => v)
        document.getElementById("diary_box_container").innerHTML = makeMainHtml(filterContentArr)
    }
}