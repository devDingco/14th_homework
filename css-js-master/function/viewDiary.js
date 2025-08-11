const viewDiary = () => {
    const localStorageArr = JSON.parse(localStorage.getItem("일기콘텐츠"))

    console.log(localStorageArr)
}