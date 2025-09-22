const 게시글등록페이지 = () => {
  return (
    <div className="container">
      <form className="post-form">
        <h1 className="page-title">게시물 등록</h1>
        {/* 작성자와 비밀번호 */}
        <div className="form-row">
          <div className="form-group">
            <label className="form-label required">작성자</label>
            <input
              type="text"
              className="form-input"
              placeholder="작성자 명을 입력해 주세요."
            />
          </div>
          <div className="form-group">
            <label className="form-label required">비밀번호</label>
            <input
              type="password"
              className="form-input"
              placeholder="비밀번호를 입력해 주세요."
            />
          </div>
        </div>

        <hr className="form-divider" />

        {/* 제목 */}
        <div className="form-group">
          <label className="form-label required">제목</label>
          <input
            type="text"
            className="form-input"
            placeholder="제목을 입력해 주세요."
          />
        </div>

        <hr className="form-divider" />

        {/* 내용 */}
        <div className="form-group">
          <label className="form-label required">내용</label>
          <textarea
            className="form-textarea"
            placeholder="내용을 입력해 주세요."
          ></textarea>
        </div>

        {/* 주소 */}
        <div className="form-group">
          <label className="form-label">주소</label>
          <div className="address-row">
            <input
              type="text"
              className="form-input postcode-input"
              placeholder="01234"
            />
            <button type="button" className="postcode-btn">
              우편번호 검색
            </button>
          </div>
          <input
            type="text"
            className="form-input"
            placeholder="주소를 입력해 주세요."
          />
          <input type="text" className="form-input" placeholder="상세주소" />
        </div>

        <hr className="form-divider" />

        {/* 유튜브 링크 */}
        <div className="form-group">
          <label className="form-label">유튜브 링크</label>
          <input
            type="text"
            className="form-input"
            placeholder="링크를 입력해 주세요."
          />
        </div>

        <hr className="form-divider" />

        {/* 사진 첨부 */}
        <div className="form-group">
          <label className="form-label">사진 첨부</label>
          <div className="photo-upload-container">
            <div className="photo-upload-box">
              <img
                src="assets/icons/add.svg"
                alt="추가"
                className="upload-icon"
              />
              <div className="upload-text">클릭해서 사진 업로드</div>
            </div>
            <div className="photo-upload-box">
              <img
                src="assets/icons/add.svg"
                alt="추가"
                className="upload-icon"
              />
              <div className="upload-text">클릭해서 사진 업로드</div>
            </div>
            <div className="photo-upload-box">
              <img
                src="assets/icons/add.svg"
                alt="추가"
                className="upload-icon"
              />
              <div className="upload-text">클릭해서 사진 업로드</div>
            </div>
          </div>
        </div>

        {/* 버튼 */}
        <div className="form-actions">
          <button type="button" className="cancel-btn">
            취소
          </button>
          <button type="submit" className="submit-btn">
            등록하기
          </button>
        </div>
      </form>
    </div>
  );
};