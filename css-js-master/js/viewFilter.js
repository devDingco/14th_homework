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

const viewPicFilter = () => {
    const getFilterRatio = document.getElementById("pic_filter").value    
    const dogPics = document.getElementsByClassName("dog_pic")
    
    for (let i=0; i < dogPics.length; i++) {
        switch (getFilterRatio) {
            case "기본형": {
                dogPics[i].style = "aspect-ratio: 1 / 1;"
                break
            }
            case "가로형": {
                dogPics[i].style = "aspect-ratio: 4 / 3;"
                break
            }
            case "세로형": {
                dogPics[i].style = "aspect-ratio: 3 / 4;"
                break
            }
            default:
        }
        
    }
}