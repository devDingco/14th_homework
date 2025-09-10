import { useMutation } from '@apollo/client';
import { useParams, useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';

import { CREATE_BOARD, UPDATE_BOARD, FETCH_BOARD } from './queries';
import { Errors, BoardVariables } from './types';
import {
  CreateBoardDocument,
  CreateBoardMutation,
  CreateBoardMutationVariables,
} from '@/commons/graphql/graphql';

export default function useBoardsWriteAdvanced(props: BoardVariables) {
  const router = useRouter();
  const params = useParams();

  const [writer, setWriter] = useState<string>(props.data?.fetchBoard?.writer || '');
  const [password, setPassword] = useState<string>('');
  const [title, setTitle] = useState<string>(props.data?.fetchBoard?.title || '');
  const [content, setContent] = useState<string>(props.data?.fetchBoard?.contents || '');

  const [apiRequire] = useMutation<CreateBoardMutation, CreateBoardMutationVariables>(
    CreateBoardDocument
  );

  const onClickSubmit = async () => {
    if (!checkRegister()) {
      return;
    }
    const result = await apiRequire({
      variables: {
        createBoardInput: {
          writer,
          password,
          title,
          contents: content,
        },
      },
    });
    // console.log(result);
    router.push(`/boards/${result.data?.createBoard?._id}`);
  };

  // 게시글수정API요청함수
  const [reviseApiRequire] = useMutation(UPDATE_BOARD);

  const onclickUpdate = async () => {
    // 필수 입력값 검증
    if (!checkRegister()) {
      return;
    }

    // 비밀번호 검증
    const checkPassword = prompt('비밀번호를 입력해주세요');
    if (!checkPassword) {
      alert('비밀번호를 입력해주세요.');
      return;
    }

    const updateBoardInput: { title: string; contents: string } = {
      title: '',
      contents: '',
    };

    // 현재 값 또는 기존 값 사용 (변경되지 않았어도 전송)
    updateBoardInput.title = title.trim() || props.data?.fetchBoard?.title || '';
    updateBoardInput.contents = content.trim() || props.data?.fetchBoard?.contents || '';

    try {
      const result = await reviseApiRequire({
        variables: {
          updateBoardInput,
          password: checkPassword,
          boardId: params.boardId,
        },
        refetchQueries: [{ query: FETCH_BOARD, variables: { boardId: params.boardId } }],
      });

      alert('게시글이 수정되었습니다.');
      router.push(`/boards/${params.boardId}`);
    } catch (error) {
      console.error(error);
      alert('비밀번호가 일치하지 않습니다!');
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

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    if (error.title) setErrors((prev) => ({ ...prev, title: '' }));
  };

  const onChangeContent = (event: ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
    if (error.content) setErrors((prev) => ({ ...prev, content: '' }));
  };

  const checkRegister = (): boolean => {
    const e: Errors = {};
    // 수정 모드가 아닌 경우에만 작성자, 비밀번호 검증
    if (!props.isEdit) {
      if (!writer.trim()) e.writer = '필수입력 사항 입니다.';
      if (!password.trim()) e.password = '필수입력 사항 입니다.';
      // 등록 모드에서는 제목과 내용도 필수
      if (!title.trim()) e.title = '필수입력 사항 입니다.';
      if (!content.trim()) e.content = '필수입력 사항 입니다.';
    } else {
      // 수정 모드에서는 기존 데이터가 있으므로 빈 값이어도 허용
      // 하지만 사용자가 입력한 값이 공백만 있다면 검증
      const currentTitle = title.trim() || props.data?.fetchBoard?.title || '';
      const currentContent = content.trim() || props.data?.fetchBoard?.contents || '';

      if (!currentTitle) e.title = '필수입력 사항 입니다.';
      if (!currentContent) e.content = '필수입력 사항 입니다.';
    }

    setErrors(e);

    const ok = Object.keys(e).length === 0;
    // if (!ok) {
    //   alert('에러가 발생하였습니다. 다시 시도해 주세요');
    // }
    return ok;
  };

  //    const checkSubmit = [writer, password, title, content].every((v) => v.trim().length > 0);

  return {
    onChangeWriter,
    onChangePassword,
    onChangeTitle,
    onChangeContent,
    onclickUpdate,
    onClickSubmit,
    error,
    checkRegister,
  };
}
