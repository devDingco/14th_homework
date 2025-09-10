"use client";

export default function CommentWriteComponent() {
  return (
    <>
      <div>
        <div>댓글</div>
        <div>별점</div>
        <div>
          <div>
            <div>
              <label>작성자</label>
              <input placeholder="작성자 명을 입력해주세요." />
            </div>
            <div>
              <label>비밀번호</label>
              <input placeholder="작성자 명을 입력해주세요." />
            </div>
          </div>
          <textarea placeholder="댓글을 입력해주세요."></textarea>
          <button>댓글 등록</button>
        </div>
      </div>
    </>
  );
}
