//window가 로드시, 감정 일기장 리스트 출력
window.onload = () => {
  const diaryList = getDiaryList()
  addCardsOnGallery(diaryList)
  render()

  const message = sessionStorage.getItem(TOAST_KEY)
  if (message) {
    alert(message)
    // ERROR: 토스트메시지 활용 시, submit 제출 후 제출 or 삭제 후 제출 한 번 씹힘
    // toastMessage(message);
    sessionStorage.removeItem(TOAST_KEY)
  }
}
