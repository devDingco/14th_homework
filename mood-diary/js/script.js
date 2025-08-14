//window가 로드시, 감정 일기장 리스트 출력
window.onload = function () {
  addCardsOnGallery(diaryList)
}

// test function
const test = () => {
  alert("클릭되었습니다.")
}

const scrollToTop = () => {
	window.scrollTo({ top: 0, behavior: "smooth" })
}

let scrolling
const changeFilterColor = () => {
  const dropdown = document.getElementById("dropdown")
  dropdown.style = "background-color: var(--color-black); color:var(--color-white);"

  clearTimeout(scrolling);
  scrolling = setTimeout(() => {
    dropdown.style = "background-color: var(--color-white);color: var(--color-black);"
  },100)
}
window.addEventListener('scroll', changeFilterColor)


const scrollToComments = () => {
  const scrollArea = document.getElementById("comments")
  scrollArea.scrollIntoView({behavior:"smooth",block:"start"})
}
// window.addEventListener("scroll",scrollToComments)
// 클립보드 저장함수
const copyContents = () => {
  navigator.clipboard.writeText(contents)
  document.querySelector(".toast-bottom").style = "display:block"
  setTimeout(() => {
    document.querySelector(".toast-bottom").style = "display:none"
  },2000)
}

