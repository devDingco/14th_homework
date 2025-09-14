import { useMutation } from '@apollo/client';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { FETCH_CREATE_COMMENT, FETCH_BOARD_COMMENTS } from './queries';
import AllModal from '@/components/all-modal';

export default function useCommentWrite() {
  const params = useParams(); // URL에서 boardId 파라미터 추출

  const [name, setName] = useState(''); // 작성자명 상태
  const [password, setPassword] = useState('');
  const [contents, setContents] = useState('');
  const [rating, setrating] = useState(1.0);
  
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const [createBoardComment] = useMutation(FETCH_CREATE_COMMENT);
  const onClickCommentSubmit = async () => {
    // 입력값 검증
    if (!name.trim()) {
      setModalMessage('작성자를 입력해주세요.');
      setModalOpen(true);
      return;
    }
    if (!password.trim()) {
      setModalMessage('비밀번호를 입력해주세요.');
      setModalOpen(true);
      return;
    }
    if (!contents.trim()) {
      setModalMessage('댓글 내용을 입력해주세요.');
      setModalOpen(true);
      return;
    }

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
    modalOpen,
    setModalOpen,
    modalMessage,
  };
}
