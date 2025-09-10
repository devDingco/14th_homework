'use client';
import Image from 'next/image';
//댓글 목록
export default function CommentList() {
  return (
    <div className="container">
      <div>
        <Image
          src="/icons/profile.png"
          alt="사람아이콘"
          width={24}
          height={24}
        />
        <div>홍길동</div>
        <div>별이5개</div>
      </div>
    </div>
  );
}
