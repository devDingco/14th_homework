// JSX 문법을 번역

// class => className 
// 재사용이 다른거 
// index.js

const 게시글등록페이지 = () => {
    return (
        
      <div className="css_부모바디">
        <h1 className="css_헤드">게시물 등록</h1>
  
        {/* 모든 입력 필드를 하나의 form으로 감싸기 */}
        <form>
          <div className="css_작성ip">
            <div className="css_작성ip_wrapperleft">
              <label>
                작성자<span className="css_별">*</span>
              </label>
              
              <input type="text" className="css_작성자입력박스" placeholder="작성자 명을 입력해주세요." />
              
            </div>
            <div className="css_작성ip_wrapperright">
              <label>
                비밀번호<span className="css_별">*</span>
              </label>
              <input type="password" className="css_비밀번호입력박스" placeholder="비밀번호를 입력해주세요." />
            </div>
          </div>
  
          <hr />
  
          <div className="css_제목">
            <label>
              제목<span className="css_별">*</span>
            </label>
            <input type="text" className="css_제목입력창" placeholder="제목을 입력해 주세요." />
          </div>
  
          <hr />
  
          <div className="css_내용영역">
            <label>
              내용<span className="css_별">*</span>
            </label>
            <textarea className="css_내용입력창" placeholder="내용을 입력해 주세요."></textarea>
          </div>
  
          <hr />
  
          <div className="css_주소영역">
            <label>주소</label>
            <div className="css_우편번호검색영역">
              <input type="text" className="css_우편번호입력창"  placeholder="01234"  />
              <button type="button" id="우편번호검색">
                우편번호 검색
              </button>
            </div>
            <input type="text" placeholder="주소를 입력해 주세요." />
            <input type="text" placeholder="상세주소" />
          </div>
  
          <hr />
  
          <div className="유튜브링크영역">
            <label>유튜브링크</label>
         
            <input type="text" className="css_유튜브링크입력창" placeholder="링크를 입력해 주세요." />
         

          </div>
  
          <hr />
  
          <div className="css_사진첨부영역">
            <label>사진첨부</label>
            <div className="css_이미지업로드영역">
              <div className="css_이미지업로드상자">
                <span className="css_사진첨부더하기">+</span>
                <p>클릭해서 사진 업로드</p>
              </div>
              <div className="css_이미지업로드상자">
                <span className="css_사진첨부더하기">+</span>
                <p>클릭해서 사진 업로드</p>
              </div>
              <div className="css_이미지업로드상자">
                <span className="css_사진첨부더하기">+</span>
                <p>클릭해서 사진 업로드</p>
              </div>
            </div>
          </div>
        </form>
  
        <div className="css_푸터영역">
          <button type="button" className="css_취소">
            취소
          </button>
          <button type="button" className="css_등록하기">
            등록하기
          </button>
        </div>
      </div>
    );
  };
  
  // '게시글등록페이지' 컴포넌트를 id가 'root'인 div에 그려줍니다.
  ReactDOM.render(<게시글등록페이지 />, document.getElementById("root"));


        
gi