const commentSectionEl = document.querySelector('#comment-section')! as HTMLDivElement;


// 초기 페이지 진입시 comment-section 태그로 이동
window.addEventListener('load', () => {
  window.scrollTo({ top: commentSectionEl.offsetTop, behavior: 'smooth' });
});

