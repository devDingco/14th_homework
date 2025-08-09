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

    //TODO: 직관적으로 diaryId 받아오게 수정
    diaryId = diaryId ?? (diaryList.length > 0 ? diaryList[diaryList.length - 1].id + 1 : 0)
    const newDiary = {
      id: +diaryId,
      mood: isHappy + isSad + isSurprise + isAngry + isEtc,
      title: _title,
      contents: _contents,
      date: getCurrentDate()
    }

    diaryList[diaryId] = newDiary
    storeDiaryList(diaryList)
    alert("일기가 제출되었습니다.")
    location.replace('./index.html')
  }
})

// 전체 카드 화면 출력하는 함수(반복문)
// FIX: 일기 핉터될 때 구조 생각하기 : diaryList가 필터링된 걸 넣어야 함..
const addCardsOnGallery = (diaryList) => {
  diaryList.map(formattedDiary).forEach(addCardOnGallery)
}

// 카드 1개 추가 함수
// TODO: innerHTML -> addElements로 변환
// TODO(CSS): flex-wrap이 된 후, 공간에 의해 카드 정렬이 이상함
const addCardOnGallery = (obj) => {
  const { id, mood, date, title, image, color } = obj

  const container = document.querySelector(".main__gallery")
  container.innerHTML += `
  <a href="./detail.html?diaryId=${id}">
    <div id=${id} class="main__gallery__card" onclick="onClick(${id})">
      <img src="${image}" />
      <div class="main__gallery__card__info">
        <div class="main__gallery__card__info__sub">
          <span style="color:${color}">${mood}</span>
          <span>${date}</span>
        </div>
        <p class="title01">${title}</p>
      </div>
    </div>
  </a>
  `
}

// FIX: alert에 출력되는 양식만들어서 제출
const onClick = (id) => {
  alert(`${JSON.stringify(formattedDiary(getDiaryById(id)[0]))}`)
}