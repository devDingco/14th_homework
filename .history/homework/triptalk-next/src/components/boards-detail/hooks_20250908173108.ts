import { useQuery } from '@apollo/client';
import { useParams, useRouter } from 'next/navigation';

export default function useBoardsDetail() {
  const router = useRouter(); // 페이지 이동을 위한 라우터 훅
  const params = useParams(); // URL에서 boardId 파라미터 추출

  // GraphQL 쿼리를 사용해서 게시글 상세 데이터 가져오기
  const { data } = useQuery(FETCH_BOARD, {
    variables: {
      boardId: params.boardId, // URL 파라미터로 받은 게시글 ID 전달
    },
  });

  // 수정 페이지로 이동하는 함수
  const onClickEdit = () => {
    router.push(`/boards/detail/${params.boardId}/edit`);
  };

  // 목록 페이지로 이동하는 함수
  const onClickList = () => {
    router.push('/boards');
  };
  return {
    data,
    onClickEdit,
    onClickList,
  };
}
