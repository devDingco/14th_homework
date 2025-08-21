// 플로팅 버튼 위치 제어 스크립트
// 스크롤 방향(내림/올림)에 따라 버튼의 위치 클래스(.floating-button--bottom)를 토글한다.
let floatingButton = null; // 플로팅 버튼 DOM 참조 (초기에는 null, 필요 시 지연 조회)
let lastScrollY = 0; // 마지막 스크롤 위치(방향 계산용)

// 위치 갱신 함수
// - 최상단 근처(scrollY <= 10)에서는 항상 상단 위치 유지
// - 아래로 스크롤 중이면 하단 고정 클래스 추가
// - 위로 스크롤 중이면 하단 고정 클래스 제거(상단 복귀)
function updateFloatingButtonPosition() {
  // 현재 스크롤 값과 방향 계산
  const scrollY = document.documentElement.scrollTop || 0;
  const isScrollingDown = scrollY > lastScrollY;

  if (scrollY <= 10) {
    floatingButton.classList.remove("floating-button--bottom");
  } else if (isScrollingDown) {
    // 내리는 중 → 하단 고정
    floatingButton.classList.add("floating-button--bottom");
  } else {
    // 올리는 중 → 상단 복귀
    floatingButton.classList.remove("floating-button--bottom");
  }

  // 다음 비교를 위해 현재 스크롤 값을 저장
  lastScrollY = scrollY;
}

// - 스크롤 시마다 위치 갱신
// - 초기 로드 시 한 번 위치 계산해 올바른 상태로 시작
window.addEventListener("scroll", updateFloatingButtonPosition, {
  passive: true,
});
document.addEventListener("DOMContentLoaded", () => {
  floatingButton = document.getElementById("floatingButton");
  lastScrollY = document.documentElement.scrollTop || 0;
  updateFloatingButtonPosition();
});

// 플로팅 버튼 클릭 이벤트 처리
function handleFloatingButtonClick() {
  window.scrollTo({ top: 0, behavior: "smooth" });
  floatingButton.addEventListener("click", handleFloatingButtonClick);
}
