const 메인페이지 = () => {
  return (
    <>
      <nav></nav>
      <h2>게시물 등록</h2>
      <div>
        <div>
          <div>작성자</div>
          <input placeholder="작성자 명을 입력해주세요."></input>
        </div>
        <div>
          <div>비밀번호</div>
          <input placeholder="비밀번호를 입력해 주세요."></input>
        </div>
      </div>
      <hr />
      <div>
        <div>제목</div>
        <input placeholder="제목을 입력해 주세요."></input>
      </div>
      <hr />
      <div>
        <div>내용</div>
        <input placeholder="내용을 입력해 주세요."></input>
      </div>
      <div>
        <div>주소</div>
        <div>
          <input placeholder="01234"></input>
          <button>우편번호 검색</button>
          <input placeholder="주소를 입력해 주세요."></input>
          <input placeholder="상세주소"></input>
        </div>
      </div>
      <hr />
      <div>
        <div>유튜브 링크</div>
        <input placeholder="링크를 입력해 주세요"></input>
      </div>
      <hr />
      <div>
        <div>사진첨부</div>
        <div>
          <button>클릭해서 사진 업로드</button>
          <button>클릭해서 사진 업로드</button>
          <button>클릭해서 사진 업로드</button>
        </div>
      </div>
    </>
  );
};
