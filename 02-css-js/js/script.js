// 전역 함수들
function getEmotionColor(emotion) {
    const colors = {
        'happy': '#EA5757',
        'sad': '#28B4E1',
        'surprised': '#D59029',
        'angry': '#777777',
        'other': '#A229ED'
    };
    return colors[emotion] || '#000000';
}

function getEmotionText(emotion) {
    const texts = {
        'happy': '행복해요',
        'sad': '슬퍼요',
        'surprised': '놀랐어요',
        'angry': '화나요',
        'other': '기타'
    };
    return texts[emotion] || '기타';
}

function applyEmotionClass(element, emotion) {
    element.className = `diary-card ${emotion}`;
}

const diaryForm = document.getElementById('diaryForm');
const navTabs = document.querySelectorAll('.nav-tab');

let diaries = [];

/**
 * localStorage에서 일기 데이터를 불러와 전역 배열에 저장하고 화면에 렌더링
 * 페이지 로드 시 자동으로 호출됨
 */
function loadDiariesFromStorage() {
    const storedDiaries = localStorage.getItem('diaries');
    if (storedDiaries) {
        try {
            diaries = JSON.parse(storedDiaries);
            renderDiaryList(diaries); // 데이터를 로드할 때 렌더링
        } catch (error) {
            console.error('localStorage 데이터 파싱 오류:', error);
            diaries = [];
        }
    }
}

/**
 * 전역 일기 배열을 localStorage에 JSON 형태로 저장
 * 일기 추가/수정/삭제 시마다 호출됨
 */
function saveDiariesToStorage() {
    localStorage.setItem('diaries', JSON.stringify(diaries));
}

/**
 * 일기 카드 삭제 함수
 * @param {Event} e - 이벤트 객체
 * @param {string} diaryId - 삭제할 일기의 ID
 */
function deleteDiaryCard(e, diaryId) {
    // 이벤트 버블링 방지
    e.preventDefault();
    e.stopPropagation();
    
    // 사용자 확인
    if (!confirm('정말로 이 일기를 삭제하시겠습니까?')) {
        return;
    }
    
    // 전역 배열에서 해당 일기 제거
    const index = diaries.findIndex(diary => diary.id === diaryId);
    if (index !== -1) {
        diaries.splice(index, 1);
        saveDiariesToStorage();
        
        // 현재 선택된 필터를 유지하면서 렌더링
        const emotionFilter = document.getElementById('emotionFilter');
        const selectedEmotion = emotionFilter.value;
        if (selectedEmotion === 'all') {
            renderDiaryList(diaries);
        } else {
            const filteredDiaries = diaries.filter(diary => diary.emotion === selectedEmotion);
            renderDiaryList(filteredDiaries);
        }
    }
    
    alert('일기가 삭제되었습니다!');
}

/**
 * 기존 HTML 카드들을 위한 삭제 함수
 * @param {Event} e - 이벤트 객체
 * @param {string} diaryId - 삭제할 일기의 ID
 */
function deleteExistingCard(e, diaryId) {
    // 이벤트 버블링 방지
    e.preventDefault();
    e.stopPropagation();
    
    // 사용자 확인
    if (!confirm('정말로 이 일기를 삭제하시겠습니까?')) {
        return;
    }
    
    // DOM에서 해당 카드 제거
    const cardElement = e.target.closest('.diary-card-wrapper');
    if (cardElement) {
        cardElement.remove();
    }
    
    alert('일기가 삭제되었습니다!');
}

function showDiaryList() {
    document.getElementById('diarySection').style.display = 'flex';
    document.getElementById('formSection').style.display = 'flex';
    document.getElementById('diaryDetailSection').style.display = 'none';
}

function showDiaryDetail(diary) {
    document.getElementById('detailTitle').textContent = diary.title;
    document.getElementById('detailEmotion').textContent = diary.emotionText;
    document.getElementById('detailDate').textContent = `${diary.date} 작성`;
    
    const contentElement = document.getElementById('detailContent');
    if (diary.content && diary.content !== '기존 일기 내용입니다. (내용은 표시되지 않습니다.)') {
        contentElement.innerHTML = `<p>${diary.content}</p>`;
    } else {
        contentElement.innerHTML = `
            <p>내용이 들어갑니다.</p>
            <p>내용이 들어갑니다.</p>
            <p>내용이 들어갑니다.</p>
            <p>내용이 들어갑니다.</p>
            <p>내용이 들어갑니다.</p>
            <p>내용이 들어갑니다.</p>
            <p>내용이 들어갑니다.</p>
            <p>내용이 들어갑니다.</p>
        `;
    }
    
    const emotionElement = document.getElementById('detailEmotion');
    emotionElement.style.color = getEmotionColor(diary.emotion);
    
    document.getElementById('diarySection').style.display = 'none';
    document.getElementById('formSection').style.display = 'none';
    document.getElementById('diaryDetailSection').style.display = 'flex';
}

/**
 * 일기 목록을 map을 사용하여 렌더링
 * @param {Array} diaries - 렌더링할 일기 배열
 */
function renderDiaryList(diaries) {
    const diaryCardsContainer = document.getElementById('diaryCards');
    
    // 기존 카드들을 모두 제거
    diaryCardsContainer.innerHTML = '';
    
    // map을 사용하여 일기 카드들을 생성하고 렌더링
    const diaryCards = diaries.map(diary => {
        // 고유 ID 생성 (기존 ID가 없으면 새로 생성)
        if (!diary.id) {
            diary.id = Date.now().toString();
        }
        
        const cardWrapper = document.createElement('div');
        cardWrapper.className = 'diary-card-wrapper';
        
        const cardDiv = document.createElement('div');
        cardDiv.className = `diary-card ${diary.emotion}`;
        
        const linkElement = document.createElement('a');
        linkElement.href = `/css-js/pages/diary-detail.html?id=${diary.id}&title=${encodeURIComponent(diary.title)}&emotion=${diary.emotion}&date=${encodeURIComponent(diary.date)}&content=${encodeURIComponent(diary.content || '')}`;
        linkElement.style.textDecoration = 'none';
        linkElement.style.color = 'inherit';
        linkElement.style.display = 'block';
        
        // 삭제 버튼 추가
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerHTML = '<img src="./assets/icons/close icon.png" alt="삭제" width="24" height="24">';
        deleteBtn.title = '삭제';
        deleteBtn.addEventListener('click', (e) => deleteDiaryCard(e, diary.id));
        
        cardDiv.innerHTML = `
            <div class="card-image"></div>
            <div class="card-contents">
                <div class="card-division">
                    <div class="card-emotion"></div>
                    <div class="card-date">${diary.date}</div> 
                </div>
                <div class="card-title">${diary.title}</div>
            </div>
        `;
        
        linkElement.appendChild(cardDiv);
        cardWrapper.appendChild(linkElement);
        cardWrapper.appendChild(deleteBtn);
        
        return cardWrapper;
    });
    
    // 생성된 카드들을 컨테이너에 추가
    diaryCards.forEach(card => {
        diaryCardsContainer.appendChild(card);
    });
}

diaryForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const emotion = this.querySelector('input[name="emotion"]:checked').value;
    const title = this.querySelector('#title').value;
    const content = this.querySelector('#content').value;
    
    const newDiary = {
        emotion: emotion,
        title: title,
        content: content,
        date: new Date().toLocaleDateString('ko-KR')
    };
    
    diaries.push(newDiary);
    saveDiariesToStorage();
    
    // 현재 선택된 필터를 유지하면서 렌더링
    const emotionFilter = document.getElementById('emotionFilter');
    const selectedEmotion = emotionFilter.value;
    if (selectedEmotion === 'all' || selectedEmotion === emotion) {
        if (selectedEmotion === 'all') {
            renderDiaryList(diaries);
        } else {
            const filteredDiaries = diaries.filter(diary => diary.emotion === selectedEmotion);
            renderDiaryList(filteredDiaries);
        }
    }
    
    this.reset();
    this.querySelector('input[value="happy"]').checked = true;
    
    alert('일기가 등록되었습니다!');
});

navTabs.forEach(tab => {
    tab.addEventListener('click', function() {
        navTabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        
        if (this.dataset.tab === 'photo') {
            alert('사진보관함 기능은 아직 개발 중입니다!');
            navTabs[0].classList.add('active');
            this.classList.remove('active');
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    loadDiariesFromStorage();
    
    // 기분 필터링 기능 추가
    const emotionFilter = document.getElementById('emotionFilter');
    emotionFilter.addEventListener('change', function() {
        const selectedEmotion = this.value;
        if (selectedEmotion === 'all') {
            renderDiaryList(diaries);
        } else {
            const filteredDiaries = diaries.filter(diary => diary.emotion === selectedEmotion);
            renderDiaryList(filteredDiaries);
        }
    });
    
    // 초기 데이터가 없으면 기본 일기들을 설정
    if (diaries.length === 0) {
        const initialDiaries = [
            {
                id: '1',
                title: '타이틀 영역입니다. 한줄까지만 노출됩니다.',
                emotion: 'sad',
                date: '2024.03.12',
                content: '기존 일기 내용입니다. (내용은 표시되지 않습니다.)'
            },
            {
                id: '2',
                title: '타이틀 영역입니다.',
                emotion: 'surprised',
                date: '2024.03.12',
                content: '기존 일기 내용입니다. (내용은 표시되지 않습니다.)'
            },
            {
                id: '3',
                title: '타이틀 영역입니다. 한줄까지만 노출됩니다.',
                emotion: 'angry',
                date: '2024.03.12',
                content: '기존 일기 내용입니다. (내용은 표시되지 않습니다.)'
            },
            {
                id: '4',
                title: '타이틀 영역입니다.',
                emotion: 'happy',
                date: '2024.03.12',
                content: '기존 일기 내용입니다. (내용은 표시되지 않습니다.)'
            },
            {
                id: '5',
                title: '타이틀 영역입니다. 한줄까지만 노출됩니다.',
                emotion: 'other',
                date: '2024.03.12',
                content: '기존 일기 내용입니다. (내용은 표시되지 않습니다.)'
            },
            {
                id: '6',
                title: '타이틀 영역입니다.',
                emotion: 'happy',
                date: '2024.03.12',
                content: '기존 일기 내용입니다. (내용은 표시되지 않습니다.)'
            }
        ];
        
        diaries = initialDiaries;
        saveDiariesToStorage();
        renderDiaryList(diaries);
    }
    
    document.getElementById('backBtn').addEventListener('click', showDiaryList);
    
    document.getElementById('editBtn').addEventListener('click', function() {
        alert('수정 기능은 다음 단계에서 구현됩니다!');
    });
}); 