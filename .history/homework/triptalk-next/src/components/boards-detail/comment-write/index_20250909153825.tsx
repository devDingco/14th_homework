'use client';
import styles from './CommentWrite.module.css';
import Image from 'next/image';

export default function CommentWrite() {
  return (
    <div className="container">
      <Image src="/icons/chat.png" alt="아이콘" width={24} height={24} />
      <div>댓글</div>
      <div>별점</div>
      <div>
        <div>
          <div>작성자</div>
          <input type="text" placeholder="작성자 명을 입력해 주세요" />
        </div>
        <div>
          <div>비밀번호</div>
          <input type="password" placeholder="비밀번호를 입력해 주세요." />
        </div>
      </div>
      <input type="text" placeholder="댓글을 입력해 주세요." />
      <button>댓글 등록</button>
      <hr />
      여기아래로 댓글목록임
    </div>
  );
}
