//ERROR: 삭제 후, 폼 등록 1회가 안됨.
const form = document.querySelector('.main__diary-form')

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault()

    const isHappy = e.target.happy.checked ? 'happy' : ''
    const isSad = e.target.sad.checked ? 'sad' : ''
    const isSurprise = e.target.surprise.checked ? 'surprise' : ''
    const isAngry = e.target.angry.checked ? 'angry' : ''
    const isEtc = e.target.etc.checked ? 'etc' : ''

    const _title = e.target.title.value.trim()
    const _contents = e.target.contents.value.trim()

    if (!isValid()) return

    const diaryList = getDiaryList()

    const hasValidId =
      diaryId !== undefined && diaryId !== null && diaryId !== '' && !Number.isNaN(+diaryId)
    const idx = hasValidId ? diaryList.findIndex((val) => val.id === +diaryId) : -1

    const newDiary = {
      id: hasValidId && idx !== -1 ? +diaryId : getNextId(diaryList),
      mood: isHappy + isSad + isSurprise + isAngry + isEtc,
      title: _title,
      contents: _contents,
      date: getCurrentDate(),
      comments: idx !== -1 ? diaryList[idx].comments ?? [] : [],
    }

    // INFO: 수정과 신규제출의 분기점을 확실하게 나눔
    if (idx !== -1) {
      diaryList[idx] = newDiary
      storeDiaryList(diaryList)
      alert(`${idx + 1}번째 일기가 수정되었습니다.`)
      location.reload()
    } else {
      diaryList.push(newDiary)
      storeDiaryList(diaryList)
      render()
    }
  })
}

// 전체 카드 화면 출력하는 함수(반복문)
const addCardsOnGallery = (diaryList) => {
  const container = document.querySelector('.main__gallery')
  if (!container) return

  if (diaryList.length === 0)
    container.innerHTML = `
      <div class="empty-container">
        <p>등록된 일기가 없습니다.</p>
      </div>`

  return diaryList.map(formattedDiary).forEach(addCardOnGallery)
}

// 카드 1개 추가 함수
const addCardOnGallery = (obj) => {
  const { id, mood, date, title, image, color } = obj

  const container = document.querySelector('.main__gallery')
  if (!container) return

  container.innerHTML += `
  <a href="./detail.html?diaryId=${id}">
    <div id=${id} class="main__gallery__card" onclick="onClick(event,${id})">
      <img class="main__gallery__card__close" src="./assets/icons/close_light.png" onclick="openDeleteModal(event, 'nested-modal-delete', ${id});"/>
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

const confirmDelete = (event, id) => {
  const queryString = location.search
  const findQueryString = new URLSearchParams(queryString)
  const diaryId = findQueryString.get('diaryId') ?? id

  event.stopPropagation()
  const idx = diaryList.findIndex((el) => el.id === +diaryId)
  diaryList = deleteDiaryById(event, diaryId)
  storeDiaryList(diaryList)

  sessionStorage.setItem(TOAST_KEY, `${idx + 1}번째 일기가 삭제되었습니다.`)
  location.replace('./index.html')
}

const deleteDiaryById = (event, id) => {
  event.preventDefault()
  return diaryList.filter((el) => el.id !== +id)
}

// INFO: 필터 서치
const selectMood = (event) => {
  const moodId = event.target.value ?? 'total'
  const moodLabel = getMoodLabel(moodId) ?? '전체'

  document.getElementById('dropdown-title-id').style = `--dropdown-title: "${moodLabel}"`
  document.getElementById('dropdown-title-id').click()

  state.mood = moodId
  state.page = 1
  render()
}

// INFO: 검색 서치
let timer
const getDiaryByTitle = (event) => {
  clearTimeout(timer)

  const container = document.querySelector('.main__gallery')
  if (!container) return

  container.innerHTML = ''

  timer = setTimeout(() => {
    state.query = event.target.value
    state.page = 1
    render()
  }, 500)
}

// INFO: 페이지네이션
let state = {
  mood: 'total', //mood(dropdown)
  query: '', //검색어
  page: 1, //현재 페이지
}

const PAGE_SIZE = 12
const MAX_PAGE_BUTTONS = 5

const getBaseList = () => getDiaryList()

// 최신 저장소 기준으로, 삭제/추가 후에도 반영
const deriveList = () => {
  const base = getBaseList()
  let list = state.mood === 'total' ? base : base.filter((el) => el.mood === state.mood)
  if (state.query && state.query.trim()) {
    const q = state.query.trim()
    list = list.filter((el) => el.title.includes(q))
  }
  return list
}

const getLastPage = () => {
  const total = deriveList().length
  return Math.max(1, Math.ceil(total / PAGE_SIZE))
}

const renderCards = () => {
  const list = deriveList()
  const lastPage = getLastPage()

  if (state.page > lastPage) state.page = lastPage
  if (state.page < 1) state.page = 1

  const start = (state.page - 1) * PAGE_SIZE
  const pageSlice = list.slice(start, start + PAGE_SIZE)

  const container = document.querySelector('.main__gallery')
  if (!container) return
  container.innerHTML = ''

  addCardsOnGallery(pageSlice)
}

const renderPager = () => {
  const lastPage = getLastPage()
  const pageContainer = document.querySelector('.pages')
  if (!pageContainer) return
  const pageArrows = document.querySelectorAll('.arrow')

  const blockStart = Math.floor((state.page - 1) / MAX_PAGE_BUTTONS) * MAX_PAGE_BUTTONS + 1

  if (lastPage === 1) pageArrows.forEach((el) => (el.style.display = 'none'))
  else pageArrows.forEach((el) => (el.style.display = 'block'))

  const pageArr = new Array(MAX_PAGE_BUTTONS).fill(0).map((_, i) => blockStart + i)
  pageContainer.innerHTML = pageArr
    .map((pageNum) => {
      if (pageNum > lastPage) return ''
      return `<input type="radio" name="page" page="${pageNum}" 
        onclick="gotoPage(${pageNum});"
        ${pageNum === state.page ? 'checked' : ''}
        />`
    })
    .join('')
}

const render = () => {
  renderCards()
  renderPager()
}

const gotoPage = (pageNum) => {
  state.page = pageNum
  render()
}

const moveToPrevPage = () => {
  const lastPage = getLastPage()
  const blockStart = Math.floor((state.page - 1) / MAX_PAGE_BUTTONS) * MAX_PAGE_BUTTONS + 1
  if (blockStart === 1) {
    alert('시작페이지입니다')
    return
  }
  state.page = Math.max(1, blockStart - MAX_PAGE_BUTTONS)
  render()
}

const moveToNextPage = () => {
  const lastPage = getLastPage()
  const blockStart = Math.floor((state.page - 1) / MAX_PAGE_BUTTONS) * MAX_PAGE_BUTTONS + 1
  const nextBlockStart = blockStart + MAX_PAGE_BUTTONS

  if (nextBlockStart > lastPage) {
    alert('마지막페이지입니다')
    return
  }
  state.page = nextBlockStart
  render()
}

// INFO: 댓글제출 함수
const submitComment = () => {
  const commentContents = document.getElementById('detail-comments-input-input').value

  let idx
  if (diaryId) {
    idx = diaryList.findIndex((val) => val.id === +diaryId)
  } else {
    diaryId = diaryList.length > 0 ? diaryList[diaryList.length - 1].id + 1 : 0
    idx = diaryList.length
  }
  let _comments = diaryList[idx].comments

  const comment = {
    id: _comments.length > 0 ? _comments[_comments.length - 1].id + 1 : 0,
    contents: commentContents,
    date: getCurrentDate(),
  }
  _comments.push(comment)
  storeDiaryList(diaryList)
  location.reload()
}

const addCommentsOnArea = (comments) => {
  const container = document.querySelector('.detail-comments-area')
  if (!container) return

  if (comments.length === 0)
    container.innerHTML = `
      <div class="empty-container">
        <p>등록된 회고가 없습니다.</p>
      </div>`
  return comments.forEach(addCommentOnArea)
}

const addCommentOnArea = (comment) => {
  const { contents, date } = comment
  const container = document.querySelector('.detail-comments-area')
  if (!container) return

  container.innerHTML += `
  <div class="detail-comments-item">
    <h4>${contents}</h4>
    <p>[${date}]</p>
  </div>
  `
}
