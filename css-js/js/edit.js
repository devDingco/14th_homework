const query = location.search
const slice = new URLSearchParams(query)
const cardIndex = slice.get("number")
const diaryCards = localStorage.getItem("diaryCardList")

const diaryCardList = JSON.parse(diaryCards === null ? "[]" : diaryCards)
const currentDiaryCard = diaryCardList[cardIndex]
const feelingOfToday = currentDiaryCard.feeling

window.onload = () => {

    // localStorage에 저장된 기분을 라디오 버튼 초기화 값으로 설정
    const radioObject = document.querySelectorAll('input[name="radio__feeling"]')
    radioObject.forEach(radio => {
        if (radio.id === feelingOfToday){
            radio.checked = true;
        }
    })

    // localStorage에 저장된 제목을 input 기본 value로 설정
    // document.getElementsByClassName("edit__title__form").value = diaryCardList[cardIndex].card_title

    document.getElementById("title").innerHTML = `
            제목
            <input id="title__feeling" type="text" class="edit__title__form" value="${currentDiaryCard.card_title}" />
    `



    // localStorage에 저장된 내용을 textarea 기본 내용으로 설정
    document.getElementById("context").innerHTML = `
            내용
            <textarea id="context__feeling" class="edit__context__form">${currentDiaryCard.card_context}</textarea>
    `
}
let selectedFeeling;
function editDiaryCard() {

    const objectFeeling = {
        happy: "행복해요",
        sad: "슬퍼요",
        surprise: "놀랐어요",
        angry: "화나요",
        etc: "기타"
    } 


// 라디오 버튼 중 선택된 기분을 객체에서 찾아서 변수에 넣기
const feelings = document.getElementsByName("radio__feeling");
// for (i = 0; i < feelings.length; i++) {
//     if (feelings[i].checked) {
//         let select = feelings[i].id
//         selectedFeeling = [select,objectFeeling[select]]
//         //selectedFeeling[0]
//         break;
//     }
// }

feelings.forEach((el, index) => {

    if(feelings[index].checked){
        let select = feelings[index].id
        selectedFeeling = [select, objectFeeling[select]]
    }

})

    // diaryTitle: 입력된 타이틀 변수에 넣기
    diaryTitle = document.getElementById("title__feeling").value

    // diaryContext: 입력된 일기 내용 변수에 넣기
    diaryContext = document.getElementById("context__feeling").value

    currentDiaryCard.feeling = selectedFeeling[0];
    currentDiaryCard.feeling_title = selectedFeeling[1];
    currentDiaryCard.card_title = diaryTitle;
    currentDiaryCard.card_context = diaryContext;


    localStorage.setItem("diaryCardList",JSON.stringify(diaryCardList))
    alert('일기 내용이 수정되었습니다!')

    location.href = `./detail.html?number=${cardIndex}`

}