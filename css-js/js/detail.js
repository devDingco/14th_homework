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