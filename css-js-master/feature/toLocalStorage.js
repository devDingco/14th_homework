// 로컬스토리지에 일기 저장
const toLocalStorage = (arr,key) => { // <array, string>
    // 로컬스토리지 키 등록
    if (key === ("일기콘텐츠" || "회고콘텐츠")) {
        let contentArr
        switch (key) {
            case "일기콘텐츠": {
                contentArr = arr // [{number, date, feel, title, detail}... ]
    
                localStorage.setItem(key, JSON.stringify(contentArr))
            
                console.log(contentArr)
                break
            }
            default:
        }
        alert('성공적으로 등록 되었습니다!')
    } else {
        alert('잘못된 저장 방법 입니다.')
    }
}