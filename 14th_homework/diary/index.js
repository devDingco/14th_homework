// ---- 로컬스토리지 성정  ----
const LS_KEY = 'diaries';

const loadDiaries = () => {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveDiaries = (arr) => {
  localStorage.setItem(LS_KEY, JSON.stringify(arr));
};

const normalizeMood = (m) => {
  switch (m) {
    case '행복': case '행복해요': return '행복';
    case '슬픔': case '슬퍼요': return '슬픔';
    case '놀람': case '놀랐어요': return '놀람';
    case '화남': case '화나요': return '화남';
    case '기타': return '기타';
    default: return '기타';
  }
};

const moodText = (m) => ({행복:'행복해요',슬픔:'슬퍼요',놀람:'놀랐어요',화남:'화나요',기타:'기타'}[normalizeMood(m)]);

const moodImage = (m) => ({
    행복: './assets/images/joy.png',
    슬픔: './assets/images/sadness.png',
    놀람: './assets/images/surprised.png',
    화남: './assets/images/anger.png',
    기타: './assets/images/idontknownothing.png'
  }[normalizeMood(m)]);

// ---- 상태 ----
let 일기목록 = loadDiaries();

let migrated = false;
일기목록 = Array.isArray(일기목록) ? 일기목록.map(d => {
  const n = { ...d };
  const before = n.기분;
  n.기분 = normalizeMood(n.기분);
  if (before !== n.기분) migrated = true;
  return n;
}) : [];
if (migrated) saveDiaries(일기목록);

// ---- 카드 생성 ----
const createDiaryCard = (d) => {
  const 카드 = document.createElement('div');
  카드.className = '일기';
  // console.log(1)
  const 링크 = document.createElement('a');
  링크.href = `detail.html?id=${encodeURIComponent(d.id)}`;
  링크.style.textDecoration = 'none';
  링크.style.color = 'inherit';
  // console.log(2)
  링크.innerHTML = `
    <div class="일기사진">
      <img class="기분이미지" src="${moodImage(d.기분)}" alt="${normalizeMood(d.기분)}" />
    </div>
    <div class="일기내용">
      <div class="기분 ${normalizeMood(d.기분)}">${moodText(d.기분)}</div>
      <div class="날짜">${d.작성일 || ''}</div>
    </div>
    <div class="일기제목">${d.제목 || ''}</div>
  `;
  // console.log(3)
  카드.appendChild(링크);
  return 카드;
};

const 빈카드생성 = () => {
  const 카드 = document.createElement('div');
  카드.className = '일기';
  카드.style.border = '2px dashed #d4d3d3';
  카드.style.backgroundColor = '#fafafa';
  카드.innerHTML = `
    <div class="일기사진" style="background-color:#f5f5f5;display:flex;align-items:center;justify-content:center;">
      <div style="font-size:48px;color:#d4d3d3;font-weight:300;">+</div>
    </div>
    <div class="일기내용">
      <div class="기분" style="color:#666;">새로운</div>
      <div class="날짜" style="color:#007bff;font-weight:600;">일기쓰기</div>
    </div>
    <div class="일기제목" style="color:#666;">새로운 일기를 작성해보세요</div>
  `;
  return 카드;
};

// ----  ----
const renderList=(filter='전체')=>{
  const wrap=document.getElementById('일기보여주는곳'); wrap.innerHTML='';
  일기목록.filter(d=>filter==='전체'||normalizeMood(d.기분)===normalizeMood(filter))
    .forEach(d=>wrap.appendChild(createDiaryCard(d)));
};
  //   const LS_일기목록 = 일기목록.map( => createDiaryCard()).join('')
  //   영역.innerHTML = LS_일기목록
  //   return 영역.appendChild()
  // }

  // toRender.forEach(d => 영역.appendChild(createDiaryCard(d)));


// ---- 일기쓰기 ----
const 글쓰기기능 = () => {
  const now = new Date();
  const 작성일 = `${now.getFullYear()}. ${(now.getMonth()+1).toString().padStart(2,'0')}. ${now.getDate().toString().padStart(2,'0')}`;
  const 제목 = document.getElementById('제목입력창')?.value.trim();
  const 내용 = document.getElementById('내용입력창')?.value.trim();
  if (!제목 || !내용) {
    alert('제목과 내용을 모두 입력해주세요.');
    return;
  }
  const checked = document.querySelector('input[name="기분선택버튼"]:checked');
  const 선택값 = checked ? checked.value : '행복'; // 라디오 value는 '행복/슬픔/놀람/화남/기타' 로 가정
  const 기분 = normalizeMood(선택값);

  const 새일기 = {
    id: Date.now(),
    제목,
    내용,
    작성일,
    기분  // 항상 normalized key로 저장
  };

  일기목록.push(새일기);
  saveDiaries(일기목록);

  // reset
  document.getElementById('제목입력창').value = '';
  document.getElementById('내용입력창').value = '';
  const 행복라디오 = document.querySelector('input[name="기분선택버튼"][value="행복"]');
  if (행복라디오) 행복라디오.checked = true;

  const sel = document.getElementById('기분선택하기');
  renderList(sel ? sel.value : '전체');

  alert('일기가 성공적으로 등록되었습니다!');
};

// ---- 필터 ----
const 기분필터링 = (e) => {
  const mood = e && e.target ? e.target.value : '전체';
  renderList(mood);
};

// ---- 탭 ----
const 사진보관함표시 = () => {
  const 일기보여주는곳 = document.getElementById('일기보여주는곳');
  if (!일기보여주는곳) return;
  일기보여주는곳.innerHTML = `
    <div style="grid-column: 1 / -1; text-align: center; padding: 60px; color: #919191;">
      <p style="font-size: 24px; margin-bottom: 16px;">📸 사진보관함</p>
      <p style="font-size: 16px;">아직 등록된 사진이 없습니다.</p>
    </div>
  `;
};

const 일기보관함표시 = () => {
  const sel = document.getElementById('기분선택하기');
  renderList(sel ? sel.value : '전체');
};

window.addEventListener('DOMContentLoaded', () => {
  const 탭들 = document.querySelectorAll('.탭 > div');
  탭들.forEach(탭 => {
    탭.addEventListener('click', function() {
      탭들.forEach(t => t.className = '클릭되지않은탭');
      this.className = '클릭된탭';
      if (this.textContent?.includes('사진보관함')) 사진보관함표시();
      else 일기보관함표시();
    });
  });

  renderList('전체');
});
// === 스크롤 시 필터 바 반전 & to-top 버튼 노출 ===
const onScroll = () => {
  const bar = document.getElementById('필터바');
  const topBtn = document.getElementById('toTopBtn');
  if (bar) bar.classList.toggle('scrolled', window.scrollY > 10);
  if (topBtn) topBtn.classList.toggle('show', window.scrollY > 240);
};

window.addEventListener('scroll', onScroll);

window.addEventListener('DOMContentLoaded', () => {
  // 기존 초기 렌더/탭 로직은 그대로 둡니다. (이미 파일에 존재)
  // 최초 상태도 반영되도록 한 번 호출
  onScroll();

  // to-top 버튼 클릭 → 맨 위로 부드럽게
  const topBtn = document.getElementById('toTopBtn');
  if (topBtn) {
    topBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});

window.글쓰기기능 = 글쓰기기능;
window.기분필터링 = 기분필터링;
