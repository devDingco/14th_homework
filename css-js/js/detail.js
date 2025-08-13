const query = location.search
const slice = new URLSearchParams(query)
const cardIndex = slice.get("number")
const diaryCards = localStorage.getItem("diaryCardList")

const diaryCardList = JSON.parse(diaryCards === null ? "[]" : diaryCards)

window.onload = () => {
document.getElementById("title").innerHTML = `
<div class="diary__title">${diaryCardList[cardIndex].card_title}</div>
<div class="diary__subtitle">
    <div class="diary__subtitle__feeling ${diaryCardList[cardIndex].feeling}">
        <img src="./assets/images/${diaryCardList[cardIndex].feeling}_S.svg" width="32px" height="32px" />
        ${diaryCardList[cardIndex].feeling_title}
    </div>
    <div class="diary__subtitle__date">
        <div id="write__date">${diaryCardList[cardIndex].date}</div>
        <div>작성</div>
    </div>
</div>`

document.getElementById("context").innerText = diaryCardList[cardIndex].card_context}


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

window.addEventListener("load", addDiaryComment)