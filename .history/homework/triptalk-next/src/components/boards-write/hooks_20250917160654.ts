'use client';
import { IBoardsWriteProps } from './types';
import { useMutation, useQuery } from '@apollo/client';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { ChangeEvent } from 'react';

import {
  CreateBoardDocument,
  CreateBoardMutation,
  CreateBoardMutationVariables,
  FetchBoardForEditDocument,
  UpdateBoardDocument,
  UpdateBoardMutation,
  UpdateBoardMutationVariables,
} from '@/commons/graphql/graphql';

export default function useBoardsWrite(props?: IBoardsWriteProps) {
  const router = useRouter(); // 페이지 이동을 위한 Next.js 라우터
  const params = useParams(); // URL에서 boardId 파라미터 추출

  // 사용자 입력값을 저장하는 통합된 state
  const [inputs, setInputs] = useState({
    name: '',
    title: '',
    content: '',
  });
  const [password, setPassword] = useState(''); // 비밀번호 상태
  const [zipcode, setZipcode] = useState(''); // 우편번호 상태
  const [address, setAddress] = useState(''); // 기본주소 상태
  const [addressDetail, setAddressDetail] = useState(''); // 상세주소 상태
  const [youtubeUrl, setyoutubeUrl] = useState('');

  // 등록/수정 버튼 활성화 여부를 관리하는 state
  // (모든 필수 입력이 완료되면 true, 아니면 false)
  const [isActive, setIsActive] = useState(props?.isEdit ? true : false);

  // 유효성 검증 실패 시 표시할 에러메시지 state들
  const [nameError, setNameError] = useState(''); // 작성자명 에러메시지
  const [passwordError, setPasswordError] = useState(''); // 비밀번호 에러메시지
  const [titleError, setTitleError] = useState(''); // 제목 에러메시지
  const [contentError, setContentError] = useState(''); // 내용 에러메시지

  // 모달 상태 관리
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // GraphQL 뮤테이션 훅들
  const [createBoard] = useMutation<
    CreateBoardMutation,
    CreateBoardMutationVariables
  >(CreateBoardDocument); // 게시글 생성
  const [updateBoard] = useMutation<
    UpdateBoardMutation,
    UpdateBoardMutationVariables
  >(UpdateBoardDocument); // 게시글 수정
  const { data } = useQuery(FetchBoardForEditDocument, {
    variables: { boardId: params.boardId },
  });
  const onChangeInputs = (event) => {
    setInputs({
      ...inputs,
      [event.target.id]: event.target.value,
    });

    // 업데이트된 값으로 검증하기 위해 새로운 객체 생성
    const newInputs = {
      ...inputs,
      [event.target.id]: event.target.value,
    };

    if (props?.isEdit) {
      if (newInputs.title && newInputs.content) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    } else {
      if (newInputs.name && password && newInputs.title && newInputs.content) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    }
  };
  // 게시글 생성 요청 함수
  const onClickSubmit = async () => {
    try {
      // GraphQL 뮤테이션으로 게시글 생성 요청
      const result = await createBoard({
        variables: {
          createBoardInput: {
            writer: inputs.name, // 작성자명
            title: inputs.title, // 제목
            contents: inputs.content, // 내용
            password: password, // 비밀번호
            boardAddress: {
              zipcode: zipcode, // 우편번호
              address: address, // 기본주소
              addressDetail: addressDetail, // 상세주소
            },
            youtubeUrl: youtubeUrl,
          },
        },
      });
      // 생성된 게시글의 상세 페이지로 이동
      router.push(`/boards/detail/${result.data?.createBoard._id}`);
      console.log(result); // 개발용 로그
    } catch {
      // 에러 발생 시 사용자에게 알림
      setModalMessage('에러가 발생하였습니다. 다시 시도해 주세요.');
      setModalOpen(true);
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
      setModalMessage('글을 입력할때 입력하셨던 비밀번호를 입력해주세요');
      setModalOpen(true);
      return;
    }

    try {
      // 수정할 내용 준비
      const updateBoardInput: {
        title?: string;
        contents?: string;
        boardAddress?: {
          zipcode?: string;
          address?: string;
          addressDetail?: string;
        };
        youtubeUrl?: string;
      } = {};
      if (inputs.title !== '') updateBoardInput.title = inputs.title;
      if (inputs.content !== '') updateBoardInput.contents = inputs.content;
      if (youtubeUrl !== '') updateBoardInput.youtubeUrl = youtubeUrl;
      // 주소는 무조건 기존 데이터로 전송 (간단하게)
      if (data?.fetchBoard.boardAddress) {
        updateBoardInput.boardAddress = {
          zipcode: data.fetchBoard.boardAddress.zipcode,
          address: data.fetchBoard.boardAddress.address,
          addressDetail:
            addressDetail || data.fetchBoard.boardAddress.addressDetail,
        };
      }

      // 수정 요청 데이터 준비
      const updateData = {
        boardId: data?.fetchBoard._id || '', // 수정할 게시글 ID
        password: inputPassword, // 검증용 비밀번호
        updateBoardInput, // 수정할 내용들
      };

      // GraphQL 뮤테이션으로 게시글 수정 요청
      await updateBoard({
        variables: updateData,
      });

      // 수정된 게시글 상세 페이지로 이동
      const boardId = data?.fetchBoard?._id;
      if (boardId) {
        router.push(`/boards/detail/${boardId}`);
        setModalMessage('수정되었습니다!');
        setModalOpen(true);
      }
    } catch {
      // 비밀번호 불일치 또는 기타 에러 처리
      setModalMessage('비밀번호가 틀렸거나 수정 중 에러가 발생했습니다.');
      setModalOpen(true);
    }
  };

  // 유튜브 URL 입력 시 실행되는 함수
  const onChangeYoutubeUrl = (event: ChangeEvent<HTMLInputElement>) => {
    setyoutubeUrl(event.target.value); // 입력된 값을 state에 저장
  };

  // 등록하기 버튼 클릭 시 실행되는 함수
  // 모든 입력값을 검증한 후 게시글 등록 API 요청
  // async/await 사용 이유: API 요청 완료를 기다린 후 성공 알림을 표시하기 위해
  const onClickSignUp = async () => {
    let hasError = false; // 에러 발생 여부를 추적하는 변수

    // 1. 작성자명 유효성 검증
    if (inputs.name.trim() === '') {
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
    if (inputs.title.trim() === '') {
      setTitleError('필수입력 사항입니다.');
      hasError = true;
    } else {
      setTitleError(''); // 유효하면 에러메시지 제거
    }

    // 4. 내용 유효성 검증
    if (inputs.content.trim() === '') {
      setContentError('필수입력 사항입니다.');
      hasError = true;
    } else {
      setContentError(''); // 유효하면 에러메시지 제거
    }

    // 5. 모든 검증을 통과했을 때만 게시글 등록 진행
    if (hasError === false) {
      await onClickSubmit(); // 게시글 등록 API 요청 (완료까지 대기)
      setModalMessage('게시물이 등록되었습니다!');
      setModalOpen(true);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return {
    data,
    inputs,
    password,
    zipcode,
    address,
    addressDetail,
    youtubeUrl,
    setZipcode,
    setAddress,
    setAddressDetail,
    setyoutubeUrl,
    isActive,
    nameError,
    passwordError,
    titleError,
    contentError,
    modalOpen,
    modalMessage,
    closeModal,
    onChangeYoutubeUrl,
    onClickSubmit,
    onClickUpdate,
    onClickSignUp,
    onChangeInputs,
    onChangePassword,
  };
}
