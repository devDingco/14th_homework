'use client';
//댓글 목록
import { gql, useQuery } from '@apollo/client';
import Image from 'next/image';

const FETCH_BOARD_COMMENTS = gql`
  query fetchBoardComments($page: Int, $boardId: ID!) {
    fetchBoardComments(page: $page, boardId: $boardId) {
      _id
      writer
      contents
      rating
      user
      createdAt
      updatedAt
      deletedAt
    }
  }
`;

export default function CommentList() {
  const { data } = useQuery(FETCH_BOARD_COMMENTS);
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
      <div>내용입니다</div>
      <div>날짜입니다</div>
    </div>
  );
}
