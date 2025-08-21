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
