import { getEmotionText, applyEmotionClass } from './utils.js';

/**
 * 페이지 로드 시 일기 데이터를 URL 파라미터에서 추출하여 화면에 표시
 */
document.addEventListener('DOMContentLoaded', function() {
    loadDiaryData();
});

/**
 * URL 쿼리 파라미터에서 일기 데이터를 추출하고 화면에 렌더링
 * 메인 페이지에서 전달받은 일기 정보를 상세 페이지에 표시
 */
function loadDiaryData() {
    const urlParams = new URLSearchParams(window.location.search);
    const title = urlParams.get('title') || '이것은 타이틀 입니다.';
    const emotion = urlParams.get('emotion') || 'happy';
    const date = urlParams.get('date') || '2024.07.12';
    const content = urlParams.get('content') || '';
    
    document.getElementById('detailTitle').textContent = title;
    
    const moodText = getEmotionText(emotion);
    document.getElementById('moodText').textContent = moodText;
    
    document.getElementById('detailDate').textContent = `${date} 작성`;
    
    const contentElement = document.getElementById('contentText');
    if (content && content !== '기존 일기 내용입니다. (내용은 표시되지 않습니다.)') {
        contentElement.innerHTML = `<p>${content}</p>`;
    }
    
    const moodContainer = document.querySelector('.diary-detail__mood');
    applyEmotionClass(moodContainer, emotion);

    document.getElementById('editTitle').value = title;
    document.getElementById('editContent').value = content || '내용이 들어갑니다';
    
    document.getElementById(`emotion${emotion.charAt(0).toUpperCase() + emotion.slice(1)}`).checked = true;
}

/**
 * 일기 수정 폼을 표시
 * 상세 보기에서 수정 모드로 전환
 */
function showEditForm() {
    document.getElementById('diaryDetailView').style.display = 'none';
    document.getElementById('diaryEditView').style.display = 'block';
}

/**
 * 수정 취소 시 상세 보기로 돌아가기
 * 수정 폼을 숨기고 원래 상세 내용을 다시 표시
 */
function cancelEdit() {
    document.getElementById('diaryDetailView').style.display = 'flex';
    document.getElementById('diaryEditView').style.display = 'none';
}

/**
 * 수정된 일기 내용을 저장하고 화면에 반영
 * localStorage 업데이트 및 UI 새로고침
 */
function saveEdit() {
    const newTitle = document.getElementById('editTitle').value;
    const newContent = document.getElementById('editContent').value;
    const selectedEmotion = document.querySelector('input[name="emotion"]:checked').value;
    
    const diaries = JSON.parse(localStorage.getItem('diaries') || '[]');
    
    const diaryIndex = diaries.findIndex(diary => diary.title === document.getElementById('detailTitle').textContent);
    if (diaryIndex !== -1) {
        diaries[diaryIndex] = {
            ...diaries[diaryIndex],
            title: newTitle,
            content: newContent,
            emotion: selectedEmotion
        };
    }
    
    localStorage.setItem('diaries', JSON.stringify(diaries));
    
    document.getElementById('detailTitle').textContent = newTitle;
    document.getElementById('contentText').innerHTML = `<p>${newContent}</p>`;
    
    const emotionText = getEmotionText(selectedEmotion);
    document.getElementById('moodText').textContent = emotionText;
    
    const moodContainer = document.querySelector('.diary-detail__mood');
    applyEmotionClass(moodContainer, selectedEmotion);
    
    cancelEdit();
    
    alert('일기가 수정되었습니다!');
}

window.showEditForm = showEditForm;
window.cancelEdit = cancelEdit;
window.saveEdit = saveEdit; 