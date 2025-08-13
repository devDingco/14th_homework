// cardClickHandler.js
window.openDiaryDetail = function (id, entry) {
  try {
    // 현재 목록을 세션에 저장해서 상세 페이지에서 그대로 재사용
    sessionStorage.setItem("diaryCache", JSON.stringify(window.diaryList || []));
  } catch (e) {
    console.warn("diaryCache 저장 실패:", e);
  }

    if (!id) { console.warn("상세 id 없음", entry); return; }
  location.href = `../subpage/detail.html?id=${encodeURIComponent(id)}`;
};