document.addEventListener("DOMContentLoaded", () => {
    const moodClassMap = {
      '행복해요': 'happy',
      '슬퍼요': 'sad',
      '놀랐어요': 'surprise',
      '화나요': 'angry',
      '기타': 'etc'
    };
  
    document.querySelectorAll('.card_subtitle_mood').forEach((el) => {
      const moodText = el.textContent.trim(); // 예: '슬퍼요'
      const moodClass = moodClassMap[moodText];
  
      if (moodClass) {
        el.classList.add(moodClass);
      }
    });
  });
  