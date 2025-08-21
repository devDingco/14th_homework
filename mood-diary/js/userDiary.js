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
  header.innerText = '< 일기 상세' //TODO: 반응형에서만 되어야 함?
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
  header.innerText = '〈 일기 수정' //TODO: 반응형에서만 되어야 함?
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
