//INFO: diaryList CRUD

//로컬스토리지 저장하는 함수
const storeDiaryList = (array) => {
  // 타입체크후?????, 
  array = array?.length > 0 ? array : []
  localStorage.setItem(DIARY_KEY, JSON.stringify(array))
}

//로컬스토리지 가져오는 함수
const getDiaryList = () => {
  console.log(JSON.parse(localStorage.getItem(DIARY_KEY)))
  return JSON.parse(localStorage.getItem(DIARY_KEY))
}

let diaryList = getDiaryList() ?? []

//queryString에서 id값 가져오기
const queryString = location.search
const findQueryString = new URLSearchParams(queryString)
let diaryId = findQueryString.get("diaryId")


// diaryId 기반 해당하는 다이어리 정보 가져오기
const getDiaryById = (id) => {
  return diaryList.filter(diary => diary.id === +id)
}


/** DetailPage(Modify function) **/
//ERROR: 현재, index.html과 detailPage.html에서 userDiary.js 파일을 동시 공유하고 있기 때문에 콘솔에 에러메시지기 찍힘
// -> html별로 js 파일 나누기 고려 중
//diaryId 기반 해당하는 값 html에 뿌리기
const { mood, title, contents, icon, color, date,comments } = formattedDiary(getDiaryById(diaryId)[0])
document.getElementById("detailTitle").innerText = title
document.getElementById("detailIcon").src = icon
document.getElementById("detailMood").innerText = mood
document.getElementById("detailContents").innerText = contents
document.getElementById("detailDate").innerText = `${date} 작성`
document.getElementById("detailMood").style.color = color
addCommentsOnArea(comments)
scrollToComments()
// location.reload()
//수정 클릭시 "detail-main"화면 숨기기 + "main__diary-form"화면 보이기 + 내부내용 넣어두기

const viewModifyContent = () => {
  document.querySelector(".detail-main").style.display = "none"
  document.querySelector("#detail-modify-form").style.display = "inline"
  document.querySelector("#detail-modify-form").style.border = "transparent"

  //TODO: 변수네이밍 변경 및 forEach, Arry.from 기능 정리
  const temp = Array.from(document.querySelectorAll('input[name="mood"]'))
  // forEach 동작하지 않는 이유?
  for (let i = 0; i < temp.length; i++){
    if (getMoodLabel(temp[i].id) === mood) {
      temp[i].checked = true
    }
  }
  document.querySelector("#title").value = title
  document.querySelector("#contents").value = contents

  document.getElementById("detail-comments-input-input").disabled = true
  document.getElementById("detail-comments-input-button").disabled = true
}

//수정페이지 -> 상세페이지로 이동하는 함수
const moveBack = () => {
  location.reload()
}

//INFO: diaryList "[UPDATE]" 함수
//form.js 재사용

// mood가 전체가 아니게 선택된 경우,
// 있던 틀 버리기 + 새 틀 추가 + 필터된 다이어리들 추가

//INFO: diaryList "DELETE" 함수

// const deleteDiary = () => {
//   alert("클릭됨")
//   // event.stopPropagation()
//   // console.log(id)
//   // alert(id)
//   // const ok = confirm(`${id}번째 일기를 삭제하시겠습니까?`)
//   // if (ok) {
//   //   diaryList.filter((el)=>el.id !== +id)
//   // }
// }

//INFO: diaryList "FILTER" 함수
// test function
