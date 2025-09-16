import { useMutation } from '@apollo/client';
import { useParams, useRouter } from 'next/navigation';
import { ChangeEvent, useState, useMemo } from 'react';
import { CommentVariables, Errors } from './types';
import { CREATE_BOARD_COMMENT } from './queries';
import {
  CreateBoardCommentInput,
  MutationCreateBoardCommentArgs,
  Mutation,
  Query,
} from '@/commons/graphql/graphql';
import { FETCH_BOARD_COMMENTS } from '../comment-list/queries';

export default function useCreateBoardComment(props: CommentVariables) {
  const url = useParams();

  const [writer, setWriter] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [contents, setContents] = useState<string>('');

  //rate 용 useState
  const [rating, setRating] = useState<number>(0);

  const [createBoardApiRequire] = useMutation<
    CreateBoardCommentInput,
    MutationCreateBoardCommentArgs
  >(CREATE_BOARD_COMMENT, {
    // 댓글 등록 후 댓글 목록 다시 불러오기
    refetchQueries: [
      {
        query: FETCH_BOARD_COMMENTS,
        variables: { boardId: String(url.boardId) },
      },
    ],
    awaitRefetchQueries: true, // refetch 완료까지 기다림
  });

  const onClickCommentSubmit = async () => {
    // 유효성 검사 먼저 실행
    if (!validateInputs()) {
      return;
    }

    try {
      const result = await createBoardApiRequire({
        variables: {
          createBoardCommentInput: {
            writer,
            password,
            rating,
            contents,
          },
          boardId: String(url.boardId),
        },
      });

      // 성공 시 폼 및 에러 상태 초기화
      setWriter('');
      setPassword('');
      setContents('');
      setRating(0);
      setErrors({}); // 에러 상태도 초기화
      console.log('댓글 등록 성공:', result);
    } catch (error) {
      console.error('댓글 등록 실패:', error);
    }
  };

  const [error, setErrors] = useState<Errors>({});

  const onChangeWriter = (event: ChangeEvent<HTMLInputElement>) => {
    setWriter(event.target.value);
    if (error.writer) setErrors((prev) => ({ ...prev, writer: '' }));
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    if (error.password) setErrors((prev) => ({ ...prev, password: '' }));
  };

  const onChangeContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContents(event.target.value);
    if (error.contents) setErrors((prev) => ({ ...prev, contents: '' }));
  };

  const onChangeRating = (event: React.SyntheticEvent, newValue: number | null) => {
    setRating(newValue || 0);
  };

  const validateInputs = (): boolean => {
    const e: Errors = {};

    if (!writer.trim()) e.writer = '필수입력 사항 입니다.';
    if (!password.trim()) e.password = '필수입력 사항 입니다.';
    if (!contents.trim()) e.contents = '필수입력 사항 입니다.';
    // 별점도 추가예정

    setErrors(e);

    const ok = Object.keys(e).length === 0;
    return ok;
  };

  // 버튼 활성화 상태를 useMemo로 계산
  const isFormValid = useMemo(() => {
    return writer.trim() !== '' && password.trim() !== '' && contents.trim() !== '';
  }, [writer, password, contents]);

  return {
    writer,
    password,
    contents,
    rating,
    onChangeWriter,
    onChangePassword,
    onChangeContent,
    onChangeRating,
    onClickCommentSubmit,
    isFormValid,
    error,
  };
}
