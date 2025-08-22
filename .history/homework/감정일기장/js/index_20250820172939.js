// 1단계: 페이지가 다 로드되면 실행하기 (HTML, CSS 등 모든 요소가 준비된 후 JavaScript 실행)
document.addEventListener('DOMContentLoaded', function () {
  // 2단계: HTML 요소들 찾아서 변수에 저장 (나중에 계속 사용할 요소들을 미리 찾아놓기)
  const titleInput = document.getElementById('titleInput'); // 제목 입력창
  const textInput = document.getElementById('textInput'); // 내용 입력창
  const submitBtn = document.getElementById('submitBtn'); // 등록 버튼
  const scrollBtn = document.getElementById('scrollTopBtn');
  const footer = document.querySelector('footer');

  const 스크롤올리기 = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const 푸터체크 = () => {
    const footerTop = footer.offsetTop; // 푸터 시작 위치
    const windowHeight = window.innerHeight;
    const scrollY = window.scrollY;

    // 화면 아래쪽이 (푸터위치 - 40px)에 도달하면
    if (scrollY + windowHeight >= footerTop + 40) {
      // 버튼을 푸터 위 40px 위치에 고정
      scrollBtn.style.position = 'absolute';
      scrollBtn.style.top = footerTop - 70 + 'px'; // 푸터에서 70px 위
      scrollBtn.style.bottom = 'auto';
    } else {
      // 평소에는 화면에 고정
      scrollBtn.style.position = 'fixed';
      scrollBtn.style.bottom = '30px';
      scrollBtn.style.top = 'auto';
    }
  };

  scrollBtn.addEventListener('click', 스크롤올리기);
  window.addEventListener('scroll', 푸터체크);
  // 3단계: 일기들을 저장할 빈 배열 만들기 (모든 일기 데이터가 여기에 저장됨)
  let diaryList = [];
  function 일기삭제하기(삭제할제목) {
    // 삭제하고 저장하고 새로고침
    diaryList = diaryList.filter((일기) => 일기.title !== 삭제할제목);
    localStorage.setItem('저장된일기', JSON.stringify(diaryList));
    location.reload();
  }
  window.일기삭제하기 = 일기삭제하기;
  // 공통 함수: 일기를 화면에 그리는 함수 (중복 코드를 줄이기 위해 함수로 만듦)
  function 일기를화면에그리기(일기데이터) {
    // 감정 텍스트에 따라 어떤 이미지를 보여줄지 정하는 객체
    const 이미지맵 = {
      행복해요: 'main4.png',
      슬퍼요: 'main1.png',
      화나요: 'main3.png',
      놀랐어요: 'main2.png',
      기타: 'main5.png',
    };

    // 일기의 감정에 맞는 이미지 파일명 가져오기
    const 일기이미지 = 이미지맵[일기데이터.emotion];

    // 일기가 들어갈 HTML 컨테이너 찾기
    const diaryListContainer = document.getElementById('diaryList');

    // 새로운 일기 카드를 위한 div 요소 생성 (중요: 이벤트 추가 전에 먼저 생성!)
    const 새일기 = document.createElement('div');

    // 일기 카드의 HTML 내용 설정 (이미지, 감정, 날짜, 제목 포함)
    새일기.innerHTML = `
  <div class='diaryCard'> 
  <div class="image-container">
    <img src="./assets/images/${일기이미지}" alt="" />
    <button class="delete-btn" onclick="event.stopPropagation();일기삭제하기('${일기데이터.title}')">
      <img src="./assets/images/close icon.png" alt="삭제" class="delete-icon">
    </button>
  </div>
  <div class="title__text__main">
    <div class="title__text">
      <div class="title__happy">${일기데이터.emotion}</div>    
      <div>${일기데이터.date}</div>                            
    </div>
    <div>${일기데이터.title}</div>     
  </div>
</div>
  `;

    // 일기 카드를 클릭했을 때 실행할 이벤트 추가 (요소 생성 후에 이벤트 추가!)
    새일기.addEventListener('click', function () {
      // 클릭한 일기의 전체 정보를 localStorage에 저장 (detail.html에서 사용하기 위해)
      localStorage.setItem('선택된일기', JSON.stringify(일기데이터));
      // 상세 페이지로 이동
      location.href = './detail.html';
    });

    // 완성된 일기 카드를 화면에 추가
    diaryListContainer.appendChild(새일기);
  }

  // 4단계: 브라우저에 저장된 일기들 불러오기 (새로고침해도 일기가 남아있게 하기)
  const 저장 = localStorage.getItem('저장된일기'); // 브라우저 저장소에서 '저장된일기' 키로 데이터 가져오기
  if (저장) {
    // 저장된 데이터가 있다면 (null이 아니라면)
    diaryList = JSON.parse(저장); // 텍스트 형태의 데이터를 배열로 변환해서 diaryList에 저장
    console.log('불러온일기들', diaryList); // 콘솔에서 확인용

    // 5단계: 불러온 일기들을 하나씩 화면에 그리기 (반복문 사용)
    diaryList.map((각일기) => {
      console.log(각일기);
      일기를화면에그리기(각일기);
    });
  }

  // 6단계: 등록 버튼을 클릭했을 때 실행될 함수 설정
  submitBtn.addEventListener('click', function () {
    console.log('버튼이클릭됨'); // 버튼 클릭 확인용

    // 7단계: 사용자가 입력한 제목과 내용 가져오기
    const userTitle = titleInput.value; // 제목 입력창에서 입력된 값
    const userContent = textInput.value; // 내용 입력창에서 입력된 값

    // 8단계: 라디오 버튼에서 선택된 기분 알아내기
    let userEmotion = 'happy'; // 기본값은 행복으로 설정

    const 라디오버튼들 = document.querySelectorAll('input[name="mood"]');
    라디오버튼들.forEach((라디오) => {
      if (라디오.checked) {
        userEmotion = 라디오.id;
      }
    });

    // // 각 라디오 버튼이 선택되었는지 하나씩 확인
    // if (document.getElementById('sad').checked) {
    //   // 슬픔 버튼이 체크되었다면
    //   userEmotion = 'sad';
    // }
    // if (document.getElementById('angry').checked) {
    //   // 화남 버튼이 체크되었다면
    //   userEmotion = 'angry';
    // }
    // if (document.getElementById('surprised').checked) {
    //   // 놀람 버튼이 체크되었다면
    //   userEmotion = 'surprised';
    // }
    // if (document.getElementById('other').checked) {
    //   // 기타 버튼이 체크되었다면
    //   userEmotion = 'other';
    // }

    // 9단계: 라디오 버튼의 영어 값을 한글 텍스트로 변환
    const 텍스트맵 = {
      happy: '행복해요', // 'happy' → '행복해요'
      sad: '슬퍼요', // 'sad' → '슬퍼요'
      angry: '화나요', // 'angry' → '화나요'
      surprised: '놀랐어요', // 'surprised' → '놀랐어요'
      other: '기타', // 'other' → '기타'
    };

    // 선택된 기분의 한글 텍스트 가져오기
    const 감정텍스트 = 텍스트맵[userEmotion];

    // 10단계: 입력받은 정보들로 일기 객체 만들기
    const diary = {
      title: userTitle, // 사용자가 입력한 제목
      content: userContent, // 사용자가 입력한 내용
      date: new Date().toLocaleDateString(), // 오늘 날짜 자동 생성
      emotion: 감정텍스트, // 선택된 감정의 한글 텍스트
    };

    // 11단계: 새로 만든 일기를 배열에 추가하고 브라우저에 저장하기
    diaryList.push(diary); // diaryList 배열 맨 뒤에 새 일기 추가
    localStorage.setItem('저장된일기', JSON.stringify(diaryList)); // 배열을 텍스트로 변환해서 브라우저에 저장

    // 12단계: 새로 등록한 일기를 화면에 즉시 보여주기
    일기를화면에그리기(diary); // 위에서 만든 함수를 호출해서 화면에 그리기

    console.log('새일기 추가완료'); // 완료 확인용
  });

  const dropdownBtn = document.getElementById('dropdownBtn');
  const dropdownMenu = document.getElementById('dropdownMenu');

  dropdownBtn.addEventListener('click', function () {
    if (dropdownMenu.style.display === 'block') {
      dropdownMenu.style.display = 'none';
    } else {
      dropdownMenu.style.display = 'block';
    }
  });
  const dropdownItems = document.querySelectorAll('.dropdown-item');

  dropdownItems.forEach((item) => {
    item.addEventListener('click', function () {
      const selectedText = this.textContent;
      dropdownBtn.textContent = selectedText;
      dropdownMenu.style.display = 'none';

      // 필터링 기능 추가
      필터링하기(selectedText);
    });
  });

  // 필터링 함수는 밖으로 빼기
  function 필터링하기(선택된감정) {
    const diaryListContainer = document.getElementById('diaryList');
    diaryListContainer.innerHTML = '';

    if (선택된감정 === '전체') {
      diaryList.map((일기) => 일기를화면에그리기(일기));
    } else {
      diaryList.map((일기) => {
        if (일기.emotion === 선택된감정) {
          일기를화면에그리기(일기);
        }
      });
    }
  }
});
