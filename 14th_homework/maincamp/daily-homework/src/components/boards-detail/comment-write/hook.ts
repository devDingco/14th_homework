import { useMutation } from '@apollo/client';
import { useParams, useRouter } from 'next/navigation';
import { ChangeEvent, useState, useMemo } from 'react';
import { CommentVariables, Errors } from './types';
import { CREATE_BOARD_COMMENT, UPDATE_BOARD_COMMENT } from './queries';
import {
  CreateBoardCommentInput,
  MutationCreateBoardCommentArgs,
  Mutation,
  Query,
} from '@/commons/graphql/graphql';
import { FETCH_BOARD_COMMENTS } from '../comment-list/queries';

export default function useCreateBoardComment(props: CommentVariables) {
  const url = useParams();

  // 수정 모드일 때 초기값 설정
  const [writer, setWriter] = useState<string>(props.editData?.writer || '');
  const [password, setPassword] = useState<string>('');
  const [contents, setContents] = useState<string>(props.editData?.contents || '');

  //rate 용 useState
  const [rating, setRating] = useState<number>(props.editData?.rating || 0);

  const [createBoardApiRequire] = useMutation<
    CreateBoardCommentInput,
    MutationCreateBoardCommentArgs
  >(CREATE_BOARD_COMMENT, {
    // 댓글 등록 후 댓글 목록 다시 불러오기
    refetchQueries: [
      {
        query: FETCH_BOARD_COMMENTS,
        variables: {
          boardId: String(url.boardId),
          page: 1, // 첫 번째 페이지부터 다시 로드
        },
      },
    ],
    awaitRefetchQueries: true, // refetch 완료까지 기다림
  });

  // 댓글 수정용 mutation
  const [updateBoardComment] = useMutation(UPDATE_BOARD_COMMENT, {
    refetchQueries: [
      {
        query: FETCH_BOARD_COMMENTS,
        variables: {
          boardId: String(url.boardId),
          page: 1, // 첫 번째 페이지부터 다시 로드
        },
      },
    ],
    awaitRefetchQueries: true,
  });

  const onClickCommentSubmit = async () => {
    // 유효성 검사 먼저 실행
    if (!validateInputs()) {
      return;
    }

    try {
      if (props.isEdit && props.editData?._id) {
        // 수정 모드
        const result = await updateBoardComment({
          variables: {
            updateBoardCommentInput: {
              contents,
              rating,
            },
            password,
            boardCommentId: props.editData._id,
          },
        });
        console.log('댓글 수정 성공:', result);
      } else {
        // 등록 모드
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

        // 성공 시 폼 상태 초기화 (등록 모드에서만)
        setWriter('');
        setPassword('');
        setContents('');
        setRating(0);
        console.log('댓글 등록 성공:', result);
      }

      // 공통: 에러 상태 초기화
      setErrors({});
    } catch (error) {
      console.error(props.isEdit ? '댓글 수정 실패:' : '댓글 등록 실패:', error);
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
