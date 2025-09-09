'use client';
import { IBoardsWriteProps, IUpdateBoardVariables } from './types';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ChangeEvent } from 'react';
import { CREATE_BOARD, UPDATE_BOARD } from './queries';
import {
  CreateBoardDocument,
  CreateBoardMutation,
  CreateBoardMutationVariables,
} from '@/commons/graphql/graphql';

export default function useBoardsWrite(props?: IBoardsWriteProps) {
  const router = useRouter(); // 페이지 이동을 위한 Next.js 라우터
  // 사용자 입력값을 저장하는 state들
  const [name, setName] = useState(''); // 작성자명 상태
  const [password, setPassword] = useState(''); // 비밀번호 상태
  const [title, setTitle] = useState(''); // 제목 상태
  const [content, setContent] = useState(''); // 내용 상태

  // 등록/수정 버튼 활성화 여부를 관리하는 state
  // (모든 필수 입력이 완료되면 true, 아니면 false)
  const [isActive, setIsActive] = useState(false);

  // 유효성 검증 실패 시 표시할 에러메시지 state들
  const [nameError, setNameError] = useState(''); // 작성자명 에러메시지
  const [passwordError, setPasswordError] = useState(''); // 비밀번호 에러메시지
  const [titleError, setTitleError] = useState(''); // 제목 에러메시지
  const [contentError, setContentError] = useState(''); // 내용 에러메시지

  // GraphQL 뮤테이션 훅들
  const [createBoard] = useMutation<
    CreateBoardMutation,
    CreateBoardMutationVariables
  >(CREATE_BOARD); // 게시글 생성
  const [updateBoard] = useMutation(UPDATE_BOARD); // 게시글 수정

  // 게시글 생성 요청 함수
  const onClickSubmit = async () => {
    try {
      // GraphQL 뮤테이션으로 게시글 생성 요청
      const result = await createBoard({
        variables: {
          createBoardInput: {
            writer: name, // 작성자명
            title: title, // 제목
            contents: content, // 내용
            password: password, // 비밀번호
          },
        },
      });
      // 생성된 게시글의 상세 페이지로 이동
      router.push(`/boards/detail/${result.data.createBoard._id}`);
      console.log(result); // 개발용 로그
    } catch (error) {
      // 에러 발생 시 사용자에게 알림
      alert('에러가 발생하였습니다. 다시 시도해 주세요.');
    } finally {
      // 성공/실패와 관계없이 실행할 코드 (현재 비어있음)
    }
  };

  // 게시글 수정 함수
  const onClickUpdate = async () => {
    // 비밀번호 확인을 위해 prompt 창으로 입력 받기
    const inputPassword = prompt(
      '글을 입력할때 입력하셨던 비밀번호를 입력해주세요'
    );

    // 비밀번호가 입력되지 않으면 함수 종료
    if (!inputPassword) {
      alert('글을 입력할때 입력하셨던 비밀번호를 입력해주세요');
      return;
    }

    try {
      // 수정할 내용 준비
      const updateBoardInput: { title?: string; contents?: string } = {};
      if (title !== '') updateBoardInput.title = title;
      if (content !== '') updateBoardInput.contents = content;

      // 수정 요청 데이터 준비
      const updateData = {
        boardId: props?.data?.fetchBoard._id || '', // 수정할 게시글 ID
        password: inputPassword, // 검증용 비밀번호
        updateBoardInput, // 수정할 내용들
      };

      // GraphQL 뮤테이션으로 게시글 수정 요청
      const result = await updateBoard({
        variables: updateData,
      });

      // 수정된 게시글 상세 페이지로 이동
      router.push(`/boards/detail/${props?.data?.fetchBoard._id}`);
      alert('수정되었습니다!');
    } catch (error) {
      // 비밀번호 불일치 또는 기타 에러 처리
      alert('비밀번호가 틀렸거나 수정 중 에러가 발생했습니다.');
    }
  };

  // 작성자명 입력 시 실행되는 함수
  const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value); // 입력된 값을 state에 저장

    // 수정 모드와 등록 모드에 따라 다른 검증 로직 적용
    if (props?.isEdit) {
      // 수정 모드: 제목과 내용만 있으면 버튼 활성화
      if (title && content) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    } else {
      // 등록 모드: 모든 필수 필드가 입력되어야 버튼 활성화
      if (event.target.value && password && title && content) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    }
  };
  // 비밀번호 입력 시 실행되는 함수
  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value); // 입력된 값을 state에 저장

    // 수정 모드와 등록 모드에 따라 다른 검증 로직 적용
    if (props?.isEdit) {
      // 수정 모드: 제목과 내용만 있으면 버튼 활성화
      if (title && content) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    } else {
      // 등록 모드: 모든 필수 필드가 입력되어야 버튼 활성화
      if (name && event.target.value && title && content) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    }
  };
  // 제목 입력 시 실행되는 함수
  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value); // 입력된 값을 state에 저장

    // 수정 모드와 등록 모드에 따라 다른 검증 로직 적용
    if (props?.isEdit) {
      // 수정 모드: 제목과 내용만 있으면 버튼 활성화
      if (event.target.value && content) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    } else {
      // 등록 모드: 모든 필수 필드가 입력되어야 버튼 활성화
      if (name && password && event.target.value && content) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    }
  };
  // 내용 입력 시 실행되는 함수
  const onChangeContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value); // 입력된 값을 state에 저장

    // 수정 모드와 등록 모드에 따라 다른 검증 로직 적용
    if (props?.isEdit) {
      // 수정 모드: 제목과 내용만 있으면 버튼 활성화
      if (title && event.target.value) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    } else {
      // 등록 모드: 모든 필수 필드가 입력되어야 버튼 활성화
      if (name && password && title && event.target.value) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    }
  };

  // 등록하기 버튼 클릭 시 실행되는 함수
  // 모든 입력값을 검증한 후 게시글 등록 API 요청
  // async/await 사용 이유: API 요청 완료를 기다린 후 성공 알림을 표시하기 위해
  const onClickSignUp = async () => {
    let hasError = false; // 에러 발생 여부를 추적하는 변수

    // 1. 작성자명 유효성 검증
    if (name.trim() === '') {
      setNameError('필수입력 사항입니다.');
      hasError = true;
    } else {
      setNameError(''); // 유효하면 에러메시지 제거
    }

    // 2. 비밀번호 유효성 검증
    if (password.length === 0) {
      setPasswordError('필수입력 사항입니다.');
      hasError = true;
    } else {
      setPasswordError(''); // 유효하면 에러메시지 제거
    }

    // 3. 제목 유효성 검증
    if (title.trim() === '') {
      setTitleError('필수입력 사항입니다.');
      hasError = true;
    } else {
      setTitleError(''); // 유효하면 에러메시지 제거
    }

    // 4. 내용 유효성 검증
    if (content.trim() === '') {
      setContentError('필수입력 사항입니다.');
      hasError = true;
    } else {
      setContentError(''); // 유효하면 에러메시지 제거
    }

    // 5. 모든 검증을 통과했을 때만 게시글 등록 진행
    if (hasError === false) {
      await onClickSubmit(); // 게시글 등록 API 요청 (완료까지 대기)
      alert('게시물이 등록되었습니다!'); // 등록 완료 후 알림
    }
  };

  return {
    name,
    password,
    title,
    content,
    isActive,
    nameError,
    passwordError,
    titleError,
    contentError,
    onChangeName,
    onChangePassword,
    onChangeTitle,
    onChangeContent,
    onClickSubmit,
    onClickUpdate,
    onClickSignUp,
  };
}
