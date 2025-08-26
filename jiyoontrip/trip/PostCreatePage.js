const PostCreatePage = () => {
  return (
    <div className="page">
      <div className="container">
        <header className="postheader">게시물 등록</header>
        <div className="author-password-group">
          <AuthorInput
            label="작성자"
            placeholder="작성자 명을 입력해 주세요."
          />
          <AuthorInput
            label="비밀번호"
            type="password"
            placeholder="비밀번호를 입력해 주세요."
          />
        </div>
        <hr className="line" />
        <AuthorInput label="제목" placeholder="제목을 입력해 주세요." />
        <hr className="line" />
        <AuthorInput
          label="내용"
          placeholder="내용을 입력해 주세요."
          type="textarea"
        />
        <AddressInput label="주소" />
        <hr className="line" />
        <AuthorInput label="유튜브 링크" placeholder="링크를 입력해 주세요." />
        <hr className="line" />
        <ImageUpload label="사진 첨부" />
        <div className="button-group">
          <button className="input-area__button-cancel">취소</button>
          <button className="input-area__button-register">등록하기</button>
        </div>
      </div>
    </div>
  );
};
