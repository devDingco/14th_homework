document.addEventListener("DOMContentLoaded", () => {
    const emotionImages = {
      happy: "./행복해요 (m).png",
      sad: "./슬퍼요 (m).png",
      surprised: "./놀랐어요 (m).png",
      angry: "./화나요 (m).png",
      etc: "./기타 (m).png"
    };
  
    const params = new URLSearchParams(location.search);
    const id = Number(params.get("id"));
  
    const diaries = JSON.parse(localStorage.getItem("diaries")) || [];
    const idx = diaries.findIndex(d => d.id === id);
  
    const notFound = document.getElementById("notFound");
    const detailArea = document.getElementById("detailArea");
    const currentImage = document.getElementById("currentImage");
    const editForm = document.getElementById("editForm");
    const saveBtn = document.getElementById("saveBtn");
  
    if (idx === -1) {
      notFound.style.display = "block";
      detailArea.style.display = "none";
      return;
    }
  
    // 초기값 채우기
    const diary = diaries[idx];
    currentImage.src = emotionImages[diary.emotion] || emotionImages.etc;
    document.querySelectorAll('input[name="emotion"]').forEach(r => {
      r.checked = (r.value === diary.emotion);
    });
    document.getElementById("editTitle").value = diary.title;
    document.getElementById("editContent").value = diary.content;
  
    // 수정 저장
    editForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const emotionEl = document.querySelector('input[name="emotion"]:checked');
      const title = document.getElementById("editTitle").value.trim();
      const content = document.getElementById("editContent").value.trim();
  
      if (!emotionEl || !title || !content) {
        alert("모든 항목을 입력해주세요.");
        return;
      }
  
      // 업데이트
      diaries[idx].emotion = emotionEl.value;
      diaries[idx].title = title;
      diaries[idx].content = content;
      diaries[idx].date = new Date().toLocaleString();
  
      localStorage.setItem("diaries", JSON.stringify(diaries));
  
      // 기울기 애니메이션: 클래스 추가 후 제거
      saveBtn.classList.add("rotate");
      setTimeout(() => saveBtn.classList.remove("rotate"), 600);
  
      // 현재 이미지 업데이트
      currentImage.src = emotionImages[emotionEl.value] || emotionImages.etc;
  
      // 잠깐 알림
      alert("일기 수정이 저장되었습니다.");
    });
  });
  