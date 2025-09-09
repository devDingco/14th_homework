'use client';

export default function CommentWrite() {
  return (
    <div>
      <div>댓글</div>
      <div>별점</div>
      <div>
        <div>
          <div>작성자</div>
          <input type="text" placeholder="작성자 명을 입력해 주세요" />
        </div>
        <div>
          <div>비밀번호</div>
          <input type="password" />
        </div>
      </div>
      <input type="text" />
    </div>
  );
}
