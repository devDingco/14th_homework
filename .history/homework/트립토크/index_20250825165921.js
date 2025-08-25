const 메인페이지 = () => {
  return (
    <>
      <nav>
        <div>
          <img src="./assets/icons/logo area.png" />
        </div>
        <div>숙박권구매</div>
        <div>마이 페이지</div>
      </nav>
      <h2>게시물 등록</h2>
      <div className="작성자비밀번호컨테이너">
        <div className="작성자컨테이너">
          <div>작성자</div>
          <input type="text" tplaceholder="작성자 명을 입력해주세요."></input>
        </div>
        <div className="비밀번호컨테이너">
          <div>비밀번호</div>
          <input
            type="password"
            placeholder="비밀번호를 입력해 주세요."
          ></input>
        </div>
      </div>
      <hr />
      <div className="제목컨테이너">
        <div>제목</div>
        <input type="text" placeholder="제목을 입력해 주세요."></input>
      </div>
      <hr />
      <div className="내용컨테이너">
        <div>내용</div>
        <textarea placeholder="내용을 입력해 주세요."></textarea>
      </div>
      <div>
        <div className="주소컨테이너">
          <div>주소</div>

          <div className="우편번호">
            <input type="text" placeholder="01234"></input>
            <button>우편번호 검색</button>
          </div>
          <div className="상세주소컨테이너">
            <input type="text" placeholder="주소를 입력해 주세요."></input>
            <input type="text" placeholder="상세주소"></input>
          </div>
        </div>
      </div>
      <hr />
      <div>
        <div className="유튜브컨테이너">
          <div>유튜브 링크</div>
          <input type="text" placeholder="링크를 입력해 주세요"></input>
        </div>
      </div>
      <hr />
      <div className="사진첨부컨테이너">
        <div>사진첨부</div>
        <div className="사진첨부">
          <button>
            <img src="./assets/icons/add.png" alt="업로드" />
            <br />
            클릭해서 사진 업로드
          </button>
          <button>
            <img src="./assets/icons/add.png" alt="업로드" />
            <br />
            클릭해서 사진 업로드
          </button>
          <button>
            <img src="./assets/icons/add.png" alt="업로드" />
            <br />
            클릭해서 사진 업로드
          </button>
        </div>
      </div>
    </>
  );
};
