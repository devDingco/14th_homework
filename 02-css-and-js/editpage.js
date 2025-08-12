window.onload = function() {
    const 쿼리스트링 = location.search
    const 잘게나누어담은통 = new URLSearchParams(쿼리스트링)
    const 일기인덱스 = 잘게나누어담은통.get("number")
    const 일기들 = localStorage.getItem("일기목록")
    const 일기목록 = JSON.parse(일기들 === null ? "[]" : 일기들)
    
    const 일기 = 일기목록[일기인덱스];

    document.getElementById("일기수정제목입력창").value = 일기.제목
    document.getElementById("일기수정내용입력창").value = 일기.내용
    
    const 감정선택 = document.getElementsByName("감정");

    for (let i = 0; i < 감정선택.length; i++) {
    const el = 감정선택[i];
    if (el.value === 일기.감정) {
      el.checked = true;
    }
  }

    
};

const 수정하기기능 = () => {
  
    const 쿼리스트링 = location.search;
    const 잘게나누어담은통 = new URLSearchParams(쿼리스트링);
    const 일기인덱스 = 잘게나누어담은통.get("number");
    const 일기들 = localStorage.getItem("일기목록")
    const 일기목록 = JSON.parse(일기들);
  
    const 수정된제목 =
      document.getElementById("일기수정제목입력창").value;
    const 수정된내용 =
      document.getElementById("일기수정내용입력창").value;
      let 수정된감정;
      document.getElementsByName("감정").forEach((el) => {
        if (el.checked) {
          수정된감정 = el.value;
        }
      });
      
  
    일기목록[일기인덱스] = {
      제목: 수정된제목,
      내용: 수정된내용,
      감정: 수정된감정,
      날짜: 일기목록[일기인덱스].날짜
    };
    localStorage.setItem("일기목록", JSON.stringify(일기목록));
  
    location.replace(`./sub.html?number=${일기인덱스}`);
  };
        
        