// URL 에서 쿼리스트링으로 컨텐츠 인덱스 받아오기
const getContentNumber = () => {
    const url = location.search
    const qs = new URLSearchParams(url)
    const contentNumber = qs.get("number")
    // console.log(contentNumber)

    const localStorageArr = JSON.parse(localStorage.getItem("일기콘텐츠"))
    
    return contentObj = localStorageArr[contentNumber]
}