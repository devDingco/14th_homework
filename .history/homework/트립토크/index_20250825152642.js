const 메인페이지 = () => {
  return (
    <>
      <h2>게시물등록</h2>
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
        </div>
      </div>
    </>
  );
};
