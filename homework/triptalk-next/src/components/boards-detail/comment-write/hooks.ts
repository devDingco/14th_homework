import { useMutation } from '@apollo/client';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import {
  FETCH_CREATE_COMMENT,
  UPDATE_BOARD_COMMENT,
  FETCH_BOARD_COMMENTS,
} from './queries';
import AllModal from '@/components/all-modal';

export default function useCommentWrite({
  isEdit = false,
  comment,
  onEditComplete,
}) {
  const params = useParams(); // URL에서 boardId 파라미터 추출

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [contents, setContents] = useState('');
  const [rating, setrating] = useState(1.0);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const [createBoardComment] = useMutation(FETCH_CREATE_COMMENT);
  const [updateBoardComment] = useMutation(UPDATE_BOARD_COMMENT);
  // 📝 입력값 검증 공통 함수
  const validateInputs = () => {
    if (!name.trim()) {
      setModalMessage('작성자를 입력해주세요.');
      setModalOpen(true);
      return false;
    }
    if (!password.trim()) {
      setModalMessage('비밀번호를 입력해주세요.');
      setModalOpen(true);
      return false;
    }
    if (!contents.trim()) {
      setModalMessage('댓글 내용을 입력해주세요.');
      setModalOpen(true);
      return false;
    }
    return true;
  };

  // 🆕 댓글 등록 함수 (등록 전용)
  const onClickCreate = async () => {
    if (!validateInputs()) return;

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

      // 등록 완료 후 폼 초기화
      setName('');
      setPassword('');
      setContents('');
      setrating(1.0);
    } catch (error) {
      console.error('댓글 등록 에러:', error);
      alert('댓글등록실패');
    }
  };

  // ✏️ 댓글 수정 함수 (수정 전용)
  const onClickUpdate = async () => {
    if (!validateInputs()) return;

    try {
      console.log('수정 시도:', {
        commentId: comment._id,
        contents,
        rating,
        password: password ? '입력됨' : '없음',
      });

      await updateBoardComment({
        variables: {
          updateBoardCommentInput: {
            contents: contents,
            rating: rating,
          },
          password: password,
          boardCommentId: comment._id,
        },
        refetchQueries: [
          {
            query: FETCH_BOARD_COMMENTS,
            variables: { boardId: params.boardId, page: 1 },
          },
        ],
      });

      // 수정 완료 후 수정 모드 종료
      if (onEditComplete) {
        onEditComplete();
      }
    } catch (error) {
      console.error('댓글 수정 에러:', error);
      alert('댓글수정실패');
    }
  };

  // 버튼 비활성화 조건: 이름, 비밀번호, 내용 중 하나라도 비어있으면 비활성화
  const isButtonDisabled = !name.trim() || !password.trim() || !contents.trim();

  //  취소 버튼 클릭 함수
  const onClickCancel = () => {
    if (onEditComplete) {
      onEditComplete(); // 수정 모드 종료
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
    onClickCreate, // 🆕 댓글 등록 함수
    onClickUpdate, // ✏️ 댓글 수정 함수
    onClickCancel, // ❌ 취소 함수
    modalOpen,
    setModalOpen,
    modalMessage,
    isButtonDisabled,
  };
}
