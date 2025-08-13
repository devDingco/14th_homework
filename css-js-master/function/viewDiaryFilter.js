const viewDiaryFilter = () => {
    const getFilterFeel = document.getElementById("diary_filter").value

    const localStorageArr = JSON.parse(localStorage.getItem("일기콘텐츠"))
    // console.log(localStorageArr)
    console.log(getFilterFeel)
    const filterContentArr = localStorageArr.filter(v => v.feel === getFilterFeel).map(v => v)
    
    document.getElementById("diary_box_container").innerHTML = makeMainHtml(filterContentArr)
}