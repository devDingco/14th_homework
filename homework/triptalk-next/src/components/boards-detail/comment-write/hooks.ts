import { useMutation } from '@apollo/client';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { FETCH_CREATE_COMMENT, FETCH_BOARD_COMMENTS } from './queries';

export default function useCommentWrite() {
  const params = useParams(); // URL에서 boardId 파라미터 추출

  const [name, setName] = useState(''); // 작성자명 상태
  const [password, setPassword] = useState('');
  const [contents, setContents] = useState('');
  const [rating, setrating] = useState(5.0);

  const [createBoardComment] = useMutation(FETCH_CREATE_COMMENT);
  const onClickCommentSubmit = async () => {
    try {
      await createBoardComment({
        variables: {
          createBoardCommentInput: {
            writer: name,
            password: password,
            contents: contents,
            rating: rating,
          },
          boardId: params.boardId,
        },
        refetchQueries: [
          {
            query: FETCH_BOARD_COMMENTS,
            variables: { boardId: params.boardId, page: 1 },
          },
        ],
      });

      // 폼 초기화
      setName('');
      setPassword('');
      setContents('');
      setrating(1.0);
    } catch (error) {
      alert('댓글등록실패');
    }
  };

  return {
    name,
    password,
    contents,
    rating,
    setName,
    setPassword,
    setContents,
    setrating,
    onClickCommentSubmit,
  };
}
