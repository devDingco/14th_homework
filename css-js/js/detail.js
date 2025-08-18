const query = location.search
const slice = new URLSearchParams(query)
const cardIndex = slice.get("number")
const diaryCards = localStorage.getItem("diaryCardList")

const diaryCardList = JSON.parse(diaryCards === null ? "[]" : diaryCards)

window.onload = () => {
document.getElementById("title").innerHTML = `
<div id="diary__title" class="diary__title">${diaryCardList[cardIndex].card_title}</div>
<div class="diary__subtitle">
    <div id="diary__feeling" class="diary__subtitle__feeling ${diaryCardList[cardIndex].feeling}">
        <img src="./assets/images/${diaryCardList[cardIndex].feeling}_S.svg" width="32px" height="32px" />
        ${diaryCardList[cardIndex].feeling_title}
    </div>
    <div class="diary__subtitle__date">
        <div id="write__date">${diaryCardList[cardIndex].date}</div>
        <div>작성</div>
    </div>
</div>`

document.getElementById("context").innerText = diaryCardList[cardIndex].card_context}

window.addEventListener("scroll", floatingButton)
window.addEventListener("load", () => {
    addDiaryComment()
    floatingButton()

})
window.addEventListener("resize", floatingButton)

function diaryEdit() {

    location.href = `./edit.html?number=${cardIndex}`;

}

let diaryComment ;
// 회고란이 작성이 되면 회고 등록 버튼 활성화 하기
function isCommentWritten() {

    // 입력된 댓글 값 변수에 넣기
    diaryComment = document.getElementById("comment__text").value

    if (diaryComment){
        // 입력된 댓글이 있으면 버튼 활성화
        document.getElementById("comment__button").disabled = false

    } else {
        // 입력된 댓글이 있으면 버튼 비활성화
        document.getElementById("comment__button").disabled = true
    }

}


const diaryCommentList = diaryCardList[cardIndex].comment === null ?  "[]" : diaryCardList[cardIndex].comment

function getDiaryComment () {

    // 코멘트 내용 불러오기
    const newComment = document.getElementById("comment__text").value;

    // 코멘트 작성 날짜 불러오기
    let date = new Date()
    const writeDate = [date.getFullYear(), String(date.getMonth() + 1).padStart(2,"0"), String(date.getDate()).padStart(2,"0")].join(". ")

    // 회고 입력 버튼 클릭 시, {comment: "...", date: 0000-00-00}의 객체 생성

    const submitComment = {
        comment: newComment,
        date: writeDate
    }


    //위에서 만들어진 객체를 diaryCardList[cardIndex].comment의 배열 안에 배치
    diaryCommentList.push(submitComment)
    
    // 다이어리 카드 내 코멘트 업데이트
    diaryCardList[cardIndex].comment = diaryCommentList

    // 로컬스토리지에 저장
    localStorage.setItem("diaryCardList", JSON.stringify(diaryCardList))

    function clearCommentForm(){

        const comment = document.getElementById("comment__text")

        comment.value = '';

    }

    // 
    alert("회고가 등록되었습니다.")

    clearCommentForm()
    addDiaryComment()

    document.getElementById("comment__button").disabled = true
    scrollToComment()


}

const scrollToComment = () => {

    window.scrollTo({ top: 460, behavior: "smooth"})

}


function addDiaryComment() {

    if (diaryCommentList.length >= 1){

        const diaryComment_HTML = diaryCommentList.map((el, index) => `
            <div class="comment__box">
                <div class="comment">${diaryCommentList[index].comment}</div>
                <div class="comment__date">[${diaryCommentList[index].date}]</div>
            </div>
            <hr />        
        `).join("")
        document.getElementById("comment__textarea").innerHTML = diaryComment_HTML

    } else{
        document.getElementById("comment__textarea").innerHTML = `
        <div class="comment__none">등록된 회고가 없습니다.</div>
        `
    }


}

function floatingButton(){
    const innerHeight = window.innerHeight
    const innerWidth = window.innerWidth

    document.getElementById("floating__button").style = `
        position: fixed;
        top: ${innerHeight*0.9}px;
        left: ${innerWidth*0.9}px;

        z-index: 99;
    `
}

function deleteDiaryCard(){

    // 현재 카드 배열에서 현재 페이지 다이어리 삭제
    diaryCardList.splice(cardIndex,1);

    // 삭제 후 localStorage업데이트
    localStorage.setItem("diaryCardList",JSON.stringify(diaryCardList))


    // 현재 일기가 삭제되었으므로, index.html로 넘어가게끔 설정
    location.href = `./index.html`; 
    // 삭제 안내 알럿
    alert("삭제되었습니다.");

}

const copyDiary = () => {

    copyToastMessage()

    const diaryTitle = document.getElementById("diary__title").innerText
    const diaryFeeling = document.getElementById("diary__feeling").innerText
    const textDiary = document.getElementById("context").innerText
    const writeDate = document.getElementById("write__date").innerText

    navigator.clipboard.writeText(`
제목: ${diaryTitle}
작성일: ${writeDate}
기분: ${diaryFeeling}
내용: ${textDiary}`)



}

const copyToastMessage = () => {
    
    document.getElementById("copy__toast").style = "display: block;"
    document.getElementById("copy__toast").classList.add('copy__animated');

    setTimeout(() => {
        document.getElementById("copy__toast").style = "display: none;"
        document.getElementById("copy__toast").classList.remove('copy__animated');
    },1000)


}

/* 버튼 클릭 시, 모달 on */
const viewModal = (modal__name) => {
    document.getElementById(modal__name).style = "display: block"
}

/* 취소모달에서 계속 작성 클릭 시, 해당 모달만 꺼지게끔하기? */
const keepWrite = () => {
    document.getElementById('delete__modal').style = "display: none"
}