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

// INFO: 다크모드 토글함수
const toggleDarkMode = () => {
  document.body.classList.toggle('darkmode')
}

const viewModifyContent = () => {
  const header = document.getElementById('detailHeader')
  header.innerText = '〈 일기 수정' //TODO: 반응형에서만 되어야 함?
  header.addEventListener('click', () => {
    location.reload()
  }) //반응형에서만..?

  document.querySelector('.detail-main').style.display = 'none'
  document.querySelector('#detail-modify-form').style.display = 'flex'

  //TODO: 변수네이밍 변경 및 forEach, Arry.from 기능 정리
  const temp = Array.from(document.querySelectorAll('input[name="mood"]'))
  // forEach 동작하지 않는 이유?
  for (let i = 0; i < temp.length; i++) {
    if (getMoodLabel(temp[i].id) === mood) {
      temp[i].checked = true
    }
  }
  document.querySelector('#title').value = title
  document.querySelector('#contents').value = contents
  document.getElementById('detail-comments-input-input').placeholder =
    '수정중일땐 회고를 작성할 수 없어요.'
  document.getElementById('detail-comments-input-input').disabled = true
  document.getElementById('detail-comments-input-button').disabled = true
}
