let timer
const getDiaryByTitle = (event) => {
  clearTimeout(timer)
  
  const container = document.querySelector(".main__gallery")
  container.innerHTML = ""

  timer = setTimeout(() => {
    const enteredWord = event.target.value
    const diaryList = getDiaryList()

    return addCardsOnGallery(diaryList.filter((el) => el.title.includes(enteredWord)))
  },1000)
}