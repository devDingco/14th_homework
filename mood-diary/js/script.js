//window가 로드시, 감정 일기장 리스트 출력
window.onload = function () {
  const diaryList = getDiaryList(); 
  addCardsOnGallery(diaryList)


  const message = sessionStorage.getItem(TOAST_KEY);
  if (message) {
    alert(message)
    // ERROR: 토스트메시지 활용 시, submit 제출 후 제출 or 삭제 후 제출 한 번 씹힘
    // toastMessage(message);
    sessionStorage.removeItem(TOAST_KEY);
  }
}

// test function
const test = () => {
  alert("클릭되었습니다.")
}

const scrollToTop = () => {
	window.scrollTo({ top: 0, behavior: "smooth" })
}

// let scrolling
// const changeFilterColor = () => {
//   const dropdown = document.getElementById("dropdown")
//   dropdown.style = "background-color: var(--color-black); color:var(--color-white);"

//   clearTimeout(scrolling);
//   scrolling = setTimeout(() => {
//     dropdown.style = "background-color: var(--color-white);color: var(--color-black);"
//   },100)
// }
// window.addEventListener('scroll', changeFilterColor)


const scrollToComments = () => {
  const scrollArea = document.getElementById("comments")
  scrollArea.scrollIntoView({behavior:"smooth",block:"start"})
}
// window.addEventListener("scroll",scrollToComments)
// 클립보드 저장함수
const copyContents = () => {
  navigator.clipboard.writeText(contents)
  toastMessage('내용이 복사되었습니다.')
}

const toastMessage = (contents) => {
  const body = document.body
  body.innerHTML += `<p class="toast-bottom">${contents}</p>`

  document.querySelector(".toast-bottom").style = "display:block"
  setTimeout(() => {
    document.querySelector(".toast-bottom").style = "display:none"
  }, 2000)
}

const toggleDarkMode = () => {
  document.body.classList.toggle('darkmode')
}