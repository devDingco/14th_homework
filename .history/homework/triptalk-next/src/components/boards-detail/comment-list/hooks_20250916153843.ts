import { useMutation, useQuery } from '@apollo/client';
import { FETCH_BOARD_COMMENTS, DELETE_BOARD_COMMENT } from './queries';
import { UseCommentListParams, UseCommentListReturn, FetchBoardCommentsData } from './types';
import { MouseEvent, useState } from 'react';

export default function useCommentList({ boardId }: UseCommentListParams): UseCommentListReturn {
  const [deleteBoardComment] = useMutation(DELETE_BOARD_COMMENT);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const { data, error } = useQuery<FetchBoardCommentsData>(FETCH_BOARD_COMMENTS, {
    variables: { boardId: boardId, page: 1 },
  });
  console.log('boardId:', boardId);
  console.log('data:', data); 
  console.log('error:', error); 
  const [hasMore, setHasMore] = useState(true);
  const { fetchMore } = useQuery(FETCH_BOARD_COMMENTS , {
    variables: { boardId: boardId, page: 1 }
  });;

  const onNext = () => {
    if (data === undefined) return;
    fetchMore({
      variables: {
        page: Math.ceil(data.fetchBoardComments.length ?? 10 / 10) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult.fetchBoardComments?.length) {
          setHasMore(false);
          return;
        }
        return {
          fetchBoardComments: [
            ...prev.fetchBoardComments,
            ...fetchMoreResult.fetchBoardComments,
          ],
        };
      },
    });
  const onClickDeleteComment = async (event: MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget as HTMLButtonElement;
    const boardCommentId = button.id;
    if (!boardCommentId) {
      setModalMessage('댓글 ID를 찾을 수 없습니다.');
      setModalOpen(true);
      return;
    }

    // 비밀번호 입력 받기
    const password = prompt('게시글을 삭제하려면 비밀번호를 입력하세요:');

    // 비밀번호가 입력되지 않으면 삭제 중단
    if (!password) {
      setModalMessage('비밀번호를 입력해야 삭제할 수 있습니다.');
      setModalOpen(true);
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
      setModalMessage('댓글이 삭제되었습니다.');
      setModalOpen(true);
    } catch (error) {
      console.error('삭제 실패:', error); // 에러 로그
      setModalMessage('삭제에 실패했습니다.');
      setModalOpen(true);
    }
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return {
    data,
    onClickDeleteComment,
    modalOpen,
    modalMessage,
    closeModal
  };
}