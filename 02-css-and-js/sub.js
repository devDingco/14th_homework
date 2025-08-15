window.onload = function() {
    //인덱스를 가져오기
    const 쿼리스트링 = location.search
    const 잘게나누어담은통 = new URLSearchParams(쿼리스트링)
    const 일기인덱스 = 잘게나누어담은통.get("number")

    //일기목록을 객체배열로 가져오기
    const 일기들 = localStorage.getItem("일기목록")
    const 일기목록 = JSON.parse(일기들 === null ? "[]" : 일기들)
    
    
    document.getElementById("타이틀나타나는곳").innerText = `${일기목록[일기인덱스].제목}`
    document.getElementById("날짜나타는곳").innerText =`${일기목록[일기인덱스].날짜}`
    document.getElementById("이모지나타는곳").innerHTML =`<img src="./assets/images/작은${일기목록[일기인덱스].감정}.png">`
    document.getElementById("감정나타나는곳").innerText =`${일기목록[일기인덱스].감정}`
    document.getElementById("내용나타는곳").innerText =`${일기목록[일기인덱스].내용}`

    회고그리기기능();
    
};

const 수정하러가기기능 = () => {
    // 1. 주소에서 일기번호 가져오기
    const 쿼리스트링 = window.location.search;
    const 잘게나누어담은통 = new URLSearchParams(쿼리스트링);
    const 일기인덱스 = 잘게나누어담은통.get("number");
  
    // 2. 수정페이지로 이동하기
    window.location.href = `./editpage.html?number=${일기인덱스}`;
  };

  const 회고추가기능 = () => {
    // 1. 주소에서 일기번호 가져오기
    const 쿼리스트링 = location.search;
    const 잘게나누어담은통 = new URLSearchParams(쿼리스트링);
    const 일기번호 = 잘게나누어담은통.get("number");
  
    // 2. 스토리지에 저장된 일기목록 가져오기
    const 스토리지에저장된일기목록 =
      localStorage.getItem("일기목록") ?? "[]";
    const 일기목록 = JSON.parse(스토리지에저장된일기목록);
  
    // 3. 작성된 회고내용 통에 담기
    const 회고내용담는통 =
      window.document.getElementById("회고입력창").value;
  
    // 4. 현재 일기에 나머지 모두 그대로 두고, 회고목록에 신규 회고만 추가하기
    const 원래있었던회고목록 = 일기목록[일기번호].회고목록;
  
    const 날짜 = new Date();
  
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      timeZone: "Asia/Seoul",
    };
  
    const 날짜담는통 = 날짜
      .toLocaleDateString("ko-KR", options)
      .replace(/\./g, ".");
  
    if (원래있었던회고목록 === undefined) {
      일기목록[일기번호].회고목록 = [
        {
          회고내용: 회고내용담는통,
          작성일: 날짜담는통,
        },
      ];
    } else {
      일기목록[일기번호].회고목록.push({
        회고내용: 회고내용담는통,
        작성일: 날짜담는통,
      });
    }
    window.localStorage.setItem("일기목록", JSON.stringify(일기목록));
  
    // 5. 회고 그리기
    회고그리기기능();
  };

  const 회고그리기기능 = () => {
    // 1. 주소에서 일기번호 가져오기
    const 쿼리스트링 = window.location.search;
    const 잘게나누어담은통 = new URLSearchParams(쿼리스트링);
    const 일기번호 = 잘게나누어담은통.get("number");
  
    // 2. 스토리지에 저장된 일기목록 가져오기
    const 스토리지에저장된일기목록 =
      window.localStorage.getItem("일기목록") ?? "[]";
    const 일기목록 = JSON.parse(스토리지에저장된일기목록);
  
    // 3. 일기목록에서 현재일기번호 가져오기 ㅠ    
    const 일기담는통 = 일기목록[일기번호];
  
    // 4. 현재일기에서 회고목록만 뽑아내기
    const 회고목록 = 일기담는통.회고목록 ?? [];
  
    // 5. 회고목록 화면에 새롭게 전체 그리기
    let 새로운회고목록HTML = "";
    회고목록.forEach((회고, index) => {
      const 마지막인지 = index === 회고목록.length - 1; // 마지막 요소인지 확인하여 border-bottom x
  
      새로운회고목록HTML += `
          <div class="바디__회고__출력섹션__회고목록${!마지막인지 ? "" : "__마지막"}">
            <div class="바디__회고__출력섹션__회고목록__내용영역">${회고.회고내용}</div>
            <div class="바디__회고__출력섹션__회고목록__날짜영역">[${회고.작성일}]</div>
          </div>
        `;
    });
    document.getElementById("회고그려지는곳").innerHTML = 새로운회고목록HTML;
  };
  
  const 복사기능 = () => {
    const 쿼리스트링 = location.search;
    const 잘게나누어담은통 = new URLSearchParams(쿼리스트링);
    const 일기인덱스 = 잘게나누어담은통.get("number")
    
    const 스토리지에저장된일기목록 =
      localStorage.getItem("일기목록") ?? "[]";
    const 일기목록 = JSON.parse(스토리지에저장된일기목록)
    const 일기 = 일기목록[일기인덱스];
    navigator.clipboard.writeText(일기.내용);
    토스트기능(); 
  }

  const 토스트기능 = () => {
    document.getElementById("토스트나오는곳").style.display = "block";
    
    setTimeout(() => {
      document.getElementById("토스트나오는곳").style.display = "none";
    }, 1000); 
  }

  //삭제모달
const 삭제모달열기 = () => {
  document.getElementById("삭제모달ID").style = "display : block"
}
const 삭제모달닫기 = () => {
  document.getElementById("삭제모달ID").style = "display : none" 
}

function 일기삭제기능(event) {

  const 쿼리스트링 = location.search;
  const 잘게나누어담은통 = new URLSearchParams(쿼리스트링);
  const 일기인덱스 = Number(잘게나누어담은통.get("number"));

  const 스토리지에저장된일기목록 =
    localStorage.getItem("일기목록");
  const 일기목록 = 스토리지에저장된일기목록
    ? JSON.parse(스토리지에저장된일기목록)
    : [];
  // 2. 클릭된 일기번호 삭제하기
  const 삭제후일기목록 = 일기목록.filter((_, index) => index !== 일기인덱스);
  // 3. 삭제된 일기목록 다시 저장하기
  localStorage.setItem("일기목록", JSON.stringify(삭제후일기목록));
  alert("삭제되었습니다.");
  location.replace("./index.html")
}