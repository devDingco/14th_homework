window.onload = () => {
    // 1. 주소에서 일기번호 가져오기
    const 쿼리스트링 = window.location.search;
    const 잘게나누어담은통 = new URLSearchParams(쿼리스트링);
    const 일기번호 = 잘게나누어담은통.get("number");
  
    // 2. 스토리지에 저장된 일기목록 가져오기
    const 스토리지에저장된일기목록 =
      window.localStorage.getItem("민지의일기목록") ?? "[]";
    const 일기목록 = JSON.parse(스토리지에저장된일기목록);
  
    // 3. 일기목록에서 현재일기번호 가져오기
    const 일기담는통 = 일기목록[일기번호];
  
    // 4. 일기상세내용 화면에 그리기
    window.document.getElementById("HTML_일기수정제목입력창").value =
      일기담는통.제목;
    window.document.getElementById("HTML_일기수정내용입력창").value =
      일기담는통.내용;
  
    window.document.getElementsByName("HTML_기분선택버튼").forEach((el) => {
      if(el.value === 일기담는통.기분) el.checked = true;
    });
    const 기분선택버튼목록 = window.document.getElementsByName("HTML_기분선택버튼");
  
    // 위 코드와 동일한 기능 //
    // for (let i = 0; i < 기분선택버튼목록.length; i++) {
    //   const el = 기분선택버튼목록[i];
    //   if (el.value === 일기담는통.기분) {
    //     el.checked = true;
    //   }
    // }
    
    const 댓글목록 = 일기담는통.댓글목록 ?? [];

    let HTML_새로운댓글목록 = "";
    댓글목록.forEach((댓글, index) => {
      const hasDivider = index < 댓글목록.length - 1;
  
      HTML_새로운댓글목록 += `
        <div class="comment_item">
          <div class="comment_content">${댓글.댓글내용}</div>
          <div class="comment_date">${댓글.작성일}</div>
        </div>
        ${hasDivider ? '<hr class="comment_divider" />' : ''}
      `;
    });
    
    document.getElementById("HTML_댓글목록영역").innerHTML = HTML_새로운댓글목록;
};


const JS_수정완료하기기능 = () => {
  // 1. 주소에서 일기번호 가져오기
  const 쿼리스트링 = window.location.search;
  const 잘게나누어담은통 = new URLSearchParams(쿼리스트링);
  const 일기번호 = 잘게나누어담은통.get("number");

  // 2. 스토리지에 저장된 일기목록 가져오기
  const 스토리지에저장된일기목록 =
    window.localStorage.getItem("민지의일기목록") ?? "[]";
  const 일기목록 = JSON.parse(스토리지에저장된일기목록);

  // 3. 변경된 일기 새로운 통에 담기
  const 수정된제목담는통 =
    window.document.getElementById("HTML_일기수정제목입력창").value;
  const 수정된내용담는통 =
    window.document.getElementById("HTML_일기수정내용입력창").value;
  let 수정된기분담는통;
  window.document.getElementsByName("HTML_기분선택버튼").forEach((el) => {
    if (el.checked) 수정된기분담는통 = el.value;
  });

  일기목록[일기번호] = {
    제목: 수정된제목담는통,
    내용: 수정된내용담는통,
    기분: 수정된기분담는통,
    작성일: 일기목록[일기번호].작성일,
  };
  window.localStorage.setItem("민지의일기목록", JSON.stringify(일기목록));

  // 4. 상세페이지로 돌아가기
  location.replace(`./detail.html?number=${일기번호}`);
};

const JS_수정취소기능 = () => {
  // 1. 주소에서 일기번호 가져오기
  const 쿼리스트링 = window.location.search;
  const 잘게나누어담은통 = new URLSearchParams(쿼리스트링);
  const 일기번호 = 잘게나누어담은통.get("number");

  // 2. 상세페이지로 돌아가기
  window.location.replace(`./detail.html?number=${일기번호}`);
};

const JS_뒤로가기기능 = () => {
  window.history.back();
};


window.addEventListener("scroll", () => {
  const 화면위에서푸터위까지길이 = document
    .getElementById("HTML_푸터")
    .getBoundingClientRect().top;
  const 보이는화면길이 = window.innerHeight;

  // 1. 푸터가 보일 때는, 화면과 상관없이 사진에 고정시키기
  if (보이는화면길이 >= 화면위에서푸터위까지길이) {
    document.getElementById("HTML_플로팅버튼").style = `
      position: relative;
      bottom: 0;
      left: 97%;
    `;

    // 2. 푸터가 안보일 때는, 사진과 상관없이 화면에 고정시키기
  } else {
    document.getElementById("HTML_플로팅버튼").style = `
      position: fixed;
      bottom: 4rem;
      right: 2rem;
    `;
  }
});


const JS_스크롤위로기능 = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
};