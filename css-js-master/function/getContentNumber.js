const getContentNumber = () => {
    const url = location.search
    const qs = new URLSearchParams(url)
    const contentNumber = qs.get("number")
    console.log(contentNumber)
    
    const localStorageArr = JSON.parse(localStorage.getItem("일기콘텐츠"))
    
    return contentObj = localStorageArr[contentNumber]
}