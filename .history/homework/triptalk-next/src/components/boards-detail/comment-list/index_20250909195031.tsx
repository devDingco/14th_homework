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

export default function CommentList({ boardId }) {
  const { data } = useQuery(FETCH_BOARD_COMMENTS, {
    variables: { boardId: boardId, page: 1 },
  });

  return (
    <div className="container">
      <div>
        <Image
          src="/icons/profile.png"
          alt="사람아이콘"
          width={24}
          height={24}
        />
        {data?.fetchBoardComments?.map((el, index: number) => {
          return (
            <div key={el._id}>
              <div>
                <span>{el.writer}</span>
              </div>

              <div>
                <span>{el.contents}</span> {/* 작성자 이름 */}
                <span>
                  {/* 작성일을 한국 날짜 형식으로 변환 */}
                  {new Date(el.createdAt).toLocaleDateString('ko-KR')}
                </span>
              </div>
              {/* 삭제 버튼 (호버 시에만 보임, 절대 위치로 배치) */}
              {/* <button
                id={el._id} // 버튼의 id를 게시글 ID로 설정 */}
              {/* // onClick={onClickDelete} // 클릭 시 삭제 함수 실행
                // 삭제 버튼 스타일
              > */}
              {/* <Image
                  src="/icons/delete.png"
                  alt="delete"
                  width={24}
                  height={24}
                />
              </button> */}
            </div>
          );
        })}

        <div>홍길동</div>
        <div>별이5개</div>
      </div>
      <div>내용입니다</div>
      <div>날짜입니다</div>
    </div>
  );
}
