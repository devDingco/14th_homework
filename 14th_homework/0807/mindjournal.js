document.addEventListener("DOMContentLoaded", () => {
    const diaryForm = document.getElementById("diaryForm");
    const cardContainer = document.getElementById("cardContainer");
  
    // 감정별 이미지 매핑 (파일명이 실제와 같아야 함)
    const emotionImages = {
      happy: "./행복해요 (m).png",
      sad: "./슬퍼요 (m).png",
      surprised: "./놀랐어요 (m).png",
      angry: "./화나요 (m).png",
      etc: "./기타 (m).png"
    };
  
    // localStorage에서 불러오기 (없으면 빈 배열)
    let diaries = JSON.parse(localStorage.getItem("diaries")) || [];
  
    // 저장 함수(중복 제거용)
    function saveToStorage() {
      localStorage.setItem("diaries", JSON.stringify(diaries));
    }
  
    // 카드 렌더링 (각 카드는 <a href="detail.html?id=..."><div class="card">...</div></a>)
    function renderCards() {
      cardContainer.innerHTML = "";
      if (diaries.length === 0) {
        // 비어있을 때 안내문 (선택)
        // cardContainer.innerHTML = '<p style="width:100%; text-align:center;">아직 작성된 일기가 없습니다.</p>';
      }
  
      diaries.forEach((diary) => {
        const a = document.createElement("a");
        a.className = "card-link";
        a.href = `detail.html?id=${diary.id}`; // 상세페이지로 이동
  
        const card = document.createElement("div");
        card.className = "card";
  
        const img = document.createElement("img");
        img.src = emotionImages[diary.emotion] || emotionImages.etc;
        img.alt = diary.emotion;
  
        const p = document.createElement("p");
        p.textContent = `${diary.date} - ${diary.title}`;
  
        card.appendChild(img);
        card.appendChild(p);
        a.appendChild(card);
        cardContainer.appendChild(a);
      });
    }
  
    // 폼 제출 (등록)
    diaryForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const emotionEl = document.querySelector('input[name="emotion"]:checked');
      const title = document.getElementById("title").value.trim();
      const content = document.getElementById("content").value.trim();
  
      if (!emotionEl) {
        alert("기분을 선택해주세요!");
        return;
      }
      if (!title || !content) {
        alert("제목과 내용을 모두 입력해주세요!");
        return;
      }
  
      const newDiary = {
        id: Date.now(), // 고유 ID
        emotion: emotionEl.value,
        title,
        content,
        date: new Date().toLocaleString()
      };
  
      diaries.push(newDiary);
      saveToStorage();
      renderCards();
  
      diaryForm.reset();
    });
  
    // 초기 렌더링
    renderCards();
  });
  