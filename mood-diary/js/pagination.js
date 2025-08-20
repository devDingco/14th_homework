// ERROR: 필터, 서치바, 페이지네이션이 독립적으로 작동함
// let diaryList = getDiaryList()
let currentList = [...diaryList]

console.log(currentList)

const PAGE_SIZE = 12
const MAX_PAGE_BUTTONS = 5

let startPage = 1
const lastPage = Math.ceil(currentList.length / PAGE_SIZE)

const moveToPrevPage = () => {
  if (startPage === 1) alert('시작페이지입니다')
  else {
    startPage -= MAX_PAGE_BUTTONS
  }
}

const moveToNextPage = () => {
  if (startPage + MAX_PAGE_BUTTONS > lastPage) alert('마지막페이지입니다')
  else {
    startPage += MAX_PAGE_BUTTONS
  }
}

const showPageBtn = (selectPage = startPage) => {
  const pageArr = new Array(MAX_PAGE_BUTTONS).fill(0)

  const pageBtns = pageArr
    .map((_, idx) => {
      const pageNum = startPage + idx

      if (pageNum <= lastPage)
        return `<input type="radio" name="page" page="${pageNum}" 
        onclick="displayPage(${pageNum});showPageBtn(${pageNum});"
        ${pageNum === selectPage && 'checked'}
        />`
      else return ``
    })
    .join('')

  document.querySelector('.pages').innerHTML = pageBtns
}

const displayPage = (selectPage = startPage) => {
  const spliceStartNum = (selectPage - 1) * PAGE_SIZE
  const container = document.querySelector('.main__gallery')
  container.innerHTML = ''
  // console.log([...diaryList])
  // console.log(spliceStartNum, [...diaryList].splice(spliceStartNum, PAGE_SIZE))
  return addCardsOnGallery([...currentList].splice(spliceStartNum, PAGE_SIZE))
}

// const pagingDiaryList = (diaryList = list, selectPage) => {
//   showPageBtn(selectPage)
//   displayPage(diaryList, selectPage)
// }

// TOOD: pagination update(init) 함수
// CONSIDER: diaryList를 전역적으로 관리할 수 있는 방법이 없을까?
// => 1. JS 초반에 바로 diaryList 들고오기
// => 2. diaryList 전역 관리
// => 3. 해당 diaryList 필터 시 저장하는 함수..?

//  CONSIDER: 언제 저장이 되는지.
