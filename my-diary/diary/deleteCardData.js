(function () {
  // JSON 파싱 보조 함수: 실패 시 null을 반환해 앱이 죽지 않도록 방어
  function safeParseJSON(text) {
    try {
      return JSON.parse(text);
    } catch (_) {
      return null;
    }
  }

  // 로컬스토리지에서 배열 형태로 안전하게 읽기
  function readArray(key) {
    const raw = localStorage.getItem(key);
    const parsed = safeParseJSON(raw);
    return Array.isArray(parsed) ? parsed : [];
  }

  // 로컬스토리지에 배열 쓰기: 비어있으면 키 자체를 제거
  function writeArray(key, array) {
    if (Array.isArray(array) && array.length > 0) {
      localStorage.setItem(key, JSON.stringify(array));
    } else {
      localStorage.removeItem(key);
    }
  }

  // 삭제 확인 모달에서 사용할 대기중인 삭제 대상 id
  let pendingDeleteId = null;

  // 카드의 삭제 아이콘 클릭 → 확인 모달 열기
  function openDeleteConfirm(event, id) {
    if (event) {
      event.preventDefault(); // 링크 이동 방지
      event.stopPropagation(); // 부모 클릭(카드 링크)로 전파 방지
    }
    pendingDeleteId = String(id);
    const overlay = document.getElementById("deleteConfirmOverlay");
    if (overlay) overlay.style.display = "flex"; // 모달 노출
  }

  function closeDeleteConfirm() {
    pendingDeleteId = null;
    const overlay = document.getElementById("deleteConfirmOverlay");
    if (overlay) overlay.style.display = "none";
  }

  // 확인 모달의 삭제 버튼 클릭 → 실제 삭제 수행
  function confirmDelete(event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (!pendingDeleteId) return closeDeleteConfirm();
    deleteCard(null, pendingDeleteId); // 실제 삭제 함수 호출
    closeDeleteConfirm();
  }

  // 실제 삭제 로직: 로컬스토리지의 두 소스(diaries, diaryCardsData)에서 제거
  function deleteCard(event, id) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (id === undefined || id === null) return;
    const idStr = String(id);

    // 1) 일기 원본 데이터에서 삭제
    const diaries = readArray("diaries");
    const nextDiaries = diaries.filter((d) => String(d.id) !== idStr);
    writeArray("diaries", nextDiaries);

    // 2) 카드 전용 데이터(호환)에서도 삭제
    const cards = readArray("diaryCardsData");
    const nextCards = cards.filter((c) => String(c.id) !== idStr);
    writeArray("diaryCardsData", nextCards);

    // 3) 현재 필터 유지하여 목록 재렌더링
    if (typeof window.renderCards === "function") {
      const filter = window.currentFilter || "all";
      window.renderCards(filter);
    }
    window.location.href = "./index.html";
  }

  // 전역 노출: HTML inline 핸들러에서 접근 가능하도록 연결
  window.deleteCard = deleteCard;
  window.openDeleteConfirm = openDeleteConfirm;
  window.closeDeleteConfirm = closeDeleteConfirm;
  window.confirmDelete = confirmDelete;
})();
