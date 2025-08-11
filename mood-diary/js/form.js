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

    let idx
    if (diaryId) {
      idx = diaryList.findIndex(val => val.id === +diaryId)
    } else {
      diaryId = diaryList.length > 0 ? diaryList[diaryList.length - 1].id + 1 : 0
      idx = diaryList.length
    }

    const newDiary = {
      id: +diaryId,
      mood: isHappy + isSad + isSurprise + isAngry + isEtc,
      title: _title,
      contents: _contents,
      date: getCurrentDate(),
      comments: []
    }

    diaryList[idx] = newDiary
    storeDiaryList(diaryList)
    alert("일기가 제출되었습니다.")
    location.replace('./index.html')
  }
})

// 전체 카드 화면 출력하는 함수(반복문)
// FIX: 일기 핉터될 때 구조 생각하기 : diaryList가 필터링된 걸 넣어야 함..
const addCardsOnGallery = (diaryList) => {
  // const 
  return diaryList.map(formattedDiary).forEach(addCardOnGallery)
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
      <img class="main__gallery__card__close" src="./assets/icons/close_light.png" onclick="confirmDelete(event, ${id})"/>
      <img class="main__gallery__card__image" src="${image}" />
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
  alert(JSON.stringify(formattedDiary(getDiaryById(id)[0])))

}


const confirmDelete = (event, id=diaryId) => {
  event.stopPropagation()

  const ok = confirm(`${id}번째 일기를 삭제하시겠습니까?`)
  if (ok) {
    event.stopPropagation()
    diaryList = deleteDiaryById(event, id)
    storeDiaryList(diaryList)
    location.replace('./index.html')
  }
}

const deleteDiaryById = (event, id) => {
  event.preventDefault()
  return diaryList.filter((el)=>el.id !== +id)
}

const selectedMood = () => {
  const mood = document.getElementById("dropdown").value
  return filterByMood(mood)
}

const filterByMood = (mood) => {
  const container = document.querySelector(".main__gallery")
  container.innerHTML = ""

  switch (mood) {
    case "total":
      return addCardsOnGallery(diaryList)
    default:
      return addCardsOnGallery(diaryList.filter((el) => el.mood === mood))
  }
}

const submitComment = () => {
  const commentContents = document.getElementById("detail-comments-input-input").value
  let _comments = diaryList[diaryId].comments

  const comment = {
    id: _comments.length > 0 ? _comments[_comments.length - 1].id + 1 : 0,
    contents: commentContents,
    date: `[${getCurrentDate()}]`
  }
  _comments.push(comment)
  storeDiaryList(diaryList)
  location.reload()
}

const addCommentsOnArea = (comments) => {
  return comments.forEach(addCommentOnArea)
}

const addCommentOnArea = (comment) => {
  const { id, contents, date } = comment
  const container = document.querySelector(".detail-comments")
  container.innerHTML += `
  <div class="detail-comments-item">
    <h4>${contents}</h4>
    <p>${date}</p>
  </div>
  `
}