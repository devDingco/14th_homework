// 로컬스토리지에 일기 저장
const toLocalStorage = (arr) => {
    const contentArr = arr // [{number, feel, title, detail}... ]
    
    // todo - innerHtml 함수로 이동
    const currentDate = 
        `
        ${new Date().getFullYear()}. ${new Date().getMonth() + 1}. ${new Date().getDate()}
        `
    
    localStorage.setItem("일기콘텐츠", JSON.stringify(contentArr))

    console.log(contentArr)
    console.log(currentDate)
    
    // innerHTML 수정 함수 실행 (일기쓰기 초기화, 메인컨텐ㅊ 수정)
    
    alert('성공적으로 등록 되었습니다!')
}