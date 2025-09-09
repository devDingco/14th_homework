'use client';
//댓글 목록

import { gql, useMutation, useQuery } from '@apollo/client';
import Image from 'next/image';
import styles from './CommentList.module.css';

const FETCH_BOARD_COMMENTS = gql`
  query fetchBoardComments($page: Int, $boardId: ID!) {
    fetchBoardComments(page: $page, boardId: $boardId) {
      _id
      writer
      contents
      rating
      createdAt
      updatedAt
      deletedAt
    }
  }
`;
const DELETE_BOARD_COMMENT = gql`
  mutation deleteBoardComment($password: String, $boardCommentId: ID!) {
    deleteBoardComment(password: $password, boardCommentId: $boardCommentId)
  }
`;

export default function CommentList({ boardId }) {
  const [deleteBoardComment] = useMutation(DELETE_BOARD_COMMENT);
  const { data, error } = useQuery(FETCH_BOARD_COMMENTS, {
    variables: { boardId: boardId, page: 1 },
  });
  console.log('boardId:', boardId);
  console.log('data:', data); // ← 이거 추가
  console.log('error:', error); // ← 이거 추가

  const onClickDeleteComment = async (event: MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget as HTMLButtonElement;
    const boardCommentId = button.id;
    if (!boardCommentId) {
      alert('댓글 ID를 찾을 수 없습니다.');
      return;
    }

    // 비밀번호 입력 받기
    const password = prompt('게시글을 삭제하려면 비밀번호를 입력하세요:');

    // 비밀번호가 입력되지 않으면 삭제 중단
    if (!password) {
      alert('비밀번호를 입력해야 삭제할 수 있습니다.');
      return;
    }

    try {
      // 삭제 뮤테이션 실행
      await deleteBoardComment({
        variables: {
          boardCommentId: boardCommentId,
          password: password,
        },
        refetchQueries: [
          {
            query: FETCH_BOARD_COMMENTS,
            variables: { boardId: boardId, page: 1 },
          },
        ], // 삭제 후 목록 다시 불러오기
      });
      alert('댓글이 삭제되었습니다.'); // 성공 알림
    } catch (error) {
      console.error('삭제 실패:', error); // 에러 로그
      alert('삭제에 실패했습니다.'); // 실패 알림
    }
  };
  return (
    <div className="container">
      <div>
        {data?.fetchBoardComments?.map((el, index: number) => {
          return (
            <div key={el._id}>
              <div className={styles.comment}>
                <div className={styles.commentWriter}>
                  <Image
                    src="/icons/profile.png"
                    alt="사람아이콘"
                    width={24}
                    height={24}
                  />
                  <div>
                    <span>{el.writer}</span>
                  </div>
                  <div>별점</div>
                </div>
                <div>
                  <button>
                    <Image
                      src="/icons/edit.png"
                      alt="수정"
                      width={20}
                      height={20}
                    />
                  </button>
                  <button
                    id={el._id} // 버튼의 id를 게시글 ID로 설정 */}
                    onClick={onClickDeleteComment}
                  >
                    <Image
                      src="/icons/close.png"
                      alt="삭제"
                      width={20}
                      height={20}
                    />
                  </button>
                </div>
              </div>

              <div className={styles.commentContents}>
                <span>{el.contents}</span>
              </div>
              <span>
                {/* 작성일을 한국 날짜 형식으로 변환 */}
                {new Date(el.createdAt).toLocaleDateString('ko-KR')}
              </span>
              <hr />
            </div>
          );
        })}
      </div>
    </div>
  );
}
