window.addEventListener("DOMContentLoaded", () => {
    // 처음 들어왔을 때 "일기" 화면을 기본으로
    일기보관함렌더링();
  
    // 버튼 이벤트
    document.getElementById("일기").addEventListener("click", 일기보관함렌더링);
    document.getElementById("사진").addEventListener("click", 사진보관함렌더링);
  });
  