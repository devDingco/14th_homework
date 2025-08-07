const form = document.querySelector('.main__diary-form')

form.addEventListener('submit', (e) => {
  e.preventDefault()

  const isHappy = e.target.happy.checked ? "happy" : ""
  const isSad = e.target.sad.checked ? "sad" : ""
  const isSurprise = e.target.surprise.checked ? "surprise" : ""
  const isAngry = e.target.angry.checked ? "angry" : ""
  const isEtc = e.target.etc.checked ? "etc" : ""

  const _title = e.target.title.value.trim()
  const _contents = e.target.contents.value.trim()

  if (isValid()) {
    const newDiary = {
      id: diaryList.length > 0 ? diaryList[diaryList.length - 1].id + 1 : 0,
      mood: isHappy + isSad + isSurprise + isAngry + isEtc,
      title: _title,
      contents: _contents,
      date: getCurrentDate()
    }

    //양식 맞춰서 푸쉬해야함...
    diaryList.push(newDiary)
    addCardOnGallery(formattedDiary(newDiary))
    alert("일기가 제출되었습니다.")
    console.log(diaryList)
  }
})

//TODO: window가 로드시, 감정 일기장 리스트 출력
window.onload = function () {
  addCardsOnGallery(diaryList)
}

// 전체 카드 화면 출력하는 함수(반복문)
const addCardsOnGallery = (diaryList) => {
  diaryList.map(formattedDiary).forEach(addCardOnGallery)
}

// 카드 1개 추가 함수
// TODO: innerHTML -> addElements로 변환
const addCardOnGallery = (obj) => {
  const { id, mood, date, title, image, color } = obj

  const container = document.querySelector(".main__gallery")
  container.innerHTML += `
    <div id=${id} class="main__gallery__card">
      <img src="${image}" />
      <div class="main__gallery__card__info">
        <div class="main__gallery__card__info__sub">
          <span style="color:${color}">${mood}</span>
          <span>${date}</span>
        </div>
        <p class="title01">${title}</p>
      </div>
    </div>
  `
}

// FIX: 해당 컴포넌트를 클릭했을때 다른 클래스이름이 잡히는 경우가 존재
// FIX: alert에 출력되는 양식만들어서 제출
// 선택한 id(class가 body__main__menu__list__student일때만)를 가져오는 함수
const onClick = (e) => {
  if (e.target.classList[0] === "main__gallery__card") {
    const clickedId = e.target.id
    alert(JSON.stringify(formattedDiary(getDiary(clickedId)[0])))
  }
}
document.addEventListener("click", onClick)