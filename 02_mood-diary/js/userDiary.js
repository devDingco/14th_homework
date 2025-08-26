let diaryList = getDiaryList() ?? []

//queryString에서 id값 가져오기
const queryString = location.search
const findQueryString = new URLSearchParams(queryString)
let diaryId = findQueryString.get('diaryId')

// diaryId 기반 해당하는 다이어리 정보 가져오기
const getDiaryById = (id) => {
  return diaryList.find((diary) => diary.id === +id)
}

/** DetailPage(Modify function) **/
//ERROR: 현재, index.html과 detailPage.html에서 userDiary.js 파일을 동시 공유하고 있기 때문에 콘솔에 에러메시지기 찍힘
// -> html별로 js 파일 나누기 고려 중
//diaryId 기반 해당하는 값 html에 뿌리기
const targetDiary = getDiaryById(diaryId)

if (targetDiary) {
  const { mood, title, contents, icon, color, date, comments } = formattedDiary(targetDiary)
  const header = document.getElementById('detailHeader')
  header.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M9.725 11.9996L17.075 19.3496C17.325 19.5996 17.4458 19.8913 17.4375 20.2246C17.4292 20.558 17.3 20.8496 17.05 21.0996C16.8 21.3496 16.5083 21.4746 16.175 21.4746C15.8417 21.4746 15.55 21.3496 15.3 21.0996L7.6 13.4246C7.4 13.2246 7.25 12.9996 7.15 12.7496C7.05 12.4996 7 12.2496 7 11.9996C7 11.7496 7.05 11.4996 7.15 11.2496C7.25 10.9996 7.4 10.7746 7.6 10.5746L15.3 2.87462C15.55 2.62462 15.8458 2.50379 16.1875 2.51212C16.5292 2.52046 16.825 2.64962 17.075 2.89962C17.325 3.14962 17.45 3.44129 17.45 3.77462C17.45 4.10796 17.325 4.39962 17.075 4.64962L9.725 11.9996Z" fill="var(--font-color)"/>
  </svg>
  <p>일기 상세</p>
  `
  // header.innerText = '< 일기 상세' //TODO: 반응형에서만 되어야 함?
  header.addEventListener('click', () => {
    location.replace('./index.html')
  })
  document.getElementById('detailTitle').innerText = title
  document.getElementById('detailIcon').src = icon
  document.getElementById('detailMood').innerText = mood
  document.getElementById('detailContents').innerText = contents
  document.getElementById('detailDate').innerText = `${date} 작성`
  document.getElementById('detailMood').style.color = color

  addCommentsOnArea(comments)
  scrollToComments()
}

const viewModifyContent = () => {
  const { mood, title, contents } = formattedDiary(targetDiary)
  const header = document.getElementById('detailHeader')
  header.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M9.725 11.9996L17.075 19.3496C17.325 19.5996 17.4458 19.8913 17.4375 20.2246C17.4292 20.558 17.3 20.8496 17.05 21.0996C16.8 21.3496 16.5083 21.4746 16.175 21.4746C15.8417 21.4746 15.55 21.3496 15.3 21.0996L7.6 13.4246C7.4 13.2246 7.25 12.9996 7.15 12.7496C7.05 12.4996 7 12.2496 7 11.9996C7 11.7496 7.05 11.4996 7.15 11.2496C7.25 10.9996 7.4 10.7746 7.6 10.5746L15.3 2.87462C15.55 2.62462 15.8458 2.50379 16.1875 2.51212C16.5292 2.52046 16.825 2.64962 17.075 2.89962C17.325 3.14962 17.45 3.44129 17.45 3.77462C17.45 4.10796 17.325 4.39962 17.075 4.64962L9.725 11.9996Z" fill="var(--font-color)"/>
  </svg>
  <p>일기 수정</p>
  `
  header.addEventListener('click', () => {
    location.reload()
  }) //반응형에서만..?

  document.querySelector('.detail-main').style.display = 'none'
  document.querySelector('#detail-modify-form').style.display = 'flex'

  //TODO: 변수네이밍 변경 및 forEach, Arry.from 기능 정리
  const temp = Array.from(document.querySelectorAll('input[name="mood"]'))
  console.log(temp)
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

// INFO: 클립보드 저장함수
const copyContents = () => {
  const { contents } = formattedDiary(targetDiary)
  navigator.clipboard.writeText(contents)
  toastMessage('내용이 복사되었습니다.')
}
