// test function
const test = () => {
  alert('클릭되었습니다.')
}

// INFO: MOOD 관련 format 함수
const getMoodImage = (mood) => {
  return MOOD_IMAGES[mood]
}

const getMoodIcon = (mood) => {
  return MOOD_ICONS[mood]
}

const getMoodLabel = (mood) => {
  return MOOD_KOR[mood]
}

const getMoodFontColor = (mood) => {
  return MOOD_FONT_COLOR[mood]
}

// INFO: ratio 한글 라벨 전환 함수
const getRatioLabel = (ratio) => {
  return RATIO_KOR[ratio]
}

// INFO: 시간 관련 format 함수
const getCurrentDate = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const date = now.getDate()

  return `${year}. ${month}. ${date}`
}

// INFO: diaryList 출력 양식에 맞추기
const formattedDiary = (obj) => {
  const { id, mood, title, contents, date, comments } = obj

  return {
    id: id,
    mood: getMoodLabel(mood),
    title: title,
    contents: contents,
    icon: getMoodIcon(mood),
    image: getMoodImage(mood),
    color: getMoodFontColor(mood),
    date: date,
    comments: comments,
  }
}

// INFO: 수정페이지 -> 상세페이지로 이동하는 함수
const moveBack = () => {
  location.reload()
}

// INFO: 로컬스토리지 저장하는 함수
const storeDiaryList = (array) => {
  // 타입체크후?????,
  array = array?.length > 0 ? array : []
  localStorage.setItem(DIARY_KEY, JSON.stringify(array))
}

// INFO: 로컬스토리지 가져오는 함수
const getDiaryList = () => {
  return JSON.parse(localStorage.getItem(DIARY_KEY) ?? '[]')
}

// INFO: 가장 위의 스크롤로 자연스럽게 이동하는 함수
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// INFO: 코멘트 영역으로 자연스럽게 이동하는 함수
const scrollToComments = () => {
  const scrollArea = document.getElementById('comments')
  scrollArea.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

// INFO: 클립보드 저장함수
const copyContents = () => {
  navigator.clipboard.writeText(contents)
  toastMessage('내용이 복사되었습니다.')
}

// INFO: 토스트 메시지 컴포넌트
const toastMessage = (contents) => {
  const body = document.body
  body.innerHTML += `<p class="toast-bottom">${contents}</p>`

  document.querySelector('.toast-bottom').style = 'display:block'
  setTimeout(() => {
    document.querySelector('.toast-bottom').style = 'display:none'
  }, 2000)
}

// 세션스토리지에서 다크모드 값을 가져오는 함수
const getDarkMode = () => JSON.parse(localStorage.getItem(DARKMODE_KEY))

// INFO: 다크모드 토글함수
const toggleDarkMode = () => {
  const isDarkMode = getDarkMode()
  document.body.classList.toggle('darkmode')
  localStorage.setItem(DARKMODE_KEY, !isDarkMode)
}
