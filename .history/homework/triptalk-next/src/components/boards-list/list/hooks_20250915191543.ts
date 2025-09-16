import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { MouseEvent, useState } from 'react';
import { FetchBoardsQuery } from '@/commons/graphql/graphql';
import { FETCH_BOARDS, DELETE_BOARD } from './queries';

export default function useBoardsList() {
  // 모달 상태 관리
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // 게시글 삭제 뮤테이션 훅 (필요할 때 실행)
  const [deleteBoard] = useMutation(DELETE_BOARD);

  // 페이지 이동을 위한 라우터
  const router = useRouter();

  // 게시글 제목을 클릭했을 때 상세 페이지로 이동하는 함수
  const onClickTitle = (boardId: string) => {
    router.push(`/boards/detail/${boardId}`);
  };

  // 삭제 버튼을 클릭했을 때 실행되는 함수
  const onClickDelete = async (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); //이벤트 전파막기
    // event.currentTarget을 사용해서 실제 button 요소 가져오기
    // (event.target은 Image 컴포넌트를 가리킬 수 있음)
    const button = event.currentTarget as HTMLButtonElement;
    const boardId = button.id; // 버튼의 id 속성에서 게시글 ID 가져옴

    console.log('삭제할 게시글 ID:', boardId); // 디버그용 로그

    // boardId가 비어있으면 삭제 중단
    if (!boardId) {
      setModalMessage('게시글 ID를 찾을 수 없습니다.');
      setModalOpen(true);
      return;
    }

    try {
      // 삭제 뮤테이션 실행
      await deleteBoard({
        variables: {
          boardId: boardId,
        },
        refetchQueries: [{ query: FETCH_BOARDS }], // 삭제 후 목록 다시 불러오기
      });
      setModalMessage('게시글이 삭제되었습니다.');
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
    onClickTitle,
    onClickDelete,
    modalOpen,
    modalMessage,
    closeModal,
  };
}
