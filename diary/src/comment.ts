import { addDiary } from './dataStorage';
import type { TComment } from './types';
import { formatDate } from './utils/utils';

const commentForm = document.getElementById('comment-form') as HTMLFormElement;

const realgetParams = () => {
  const params = location.search;
  const diaryId = new URLSearchParams(params).get('id');

  if (diaryId) {
    return parseInt(diaryId);
  }
};

const handleSubmitComment = (e: SubmitEvent) => {
  e.preventDefault();
  const formData = new FormData(commentForm);
  const comment = formData.get('comment') as string;

  const newComment: TComment = {
    id: realgetParams() ?? 0,
    comment: comment,
    date: formatDate(),
  };

  (commentForm.elements.namedItem('comment') as HTMLInputElement).value = '';

  addDiary(newComment ?? 0);
  window.location.reload();
};

commentForm.addEventListener('submit', handleSubmitComment);
