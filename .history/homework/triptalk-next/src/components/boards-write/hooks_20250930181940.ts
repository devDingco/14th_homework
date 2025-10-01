/**
 * 📚 boards-write 컴포넌트를 위한 커스텀 훅 (초보자용 가이드)
 *
 * 🎯 이 파일이 뭐하는 곳인가요?
 * → 게시글 작성/수정 페이지의 모든 "기능들"이 들어있는 곳입니다.
 *
 * 💡 쉬운 비유:
 * - 화면(index.tsx) = 음식점의 "메뉴판"
 * - 이 파일(hooks.ts) = 음식점의 "주방"
 * → 손님(사용자)이 메뉴를 보고 주문하면, 주방에서 요리(기능 실행)를 해서 음식(결과)을 내어줌
 *
 * 🔧 주요 기능들:
 * 1️⃣ 입력창 관리 - 사용자가 타이핑한 내용 저장하기
 * 2️⃣ 이미지 업로드 - 사진 파일을 서버에 올리기
 * 3️⃣ 게시글 등록/수정 - 서버에 데이터 보내기
 * 4️⃣ 에러 확인 - 빈 칸이 있으면 알려주기
 * 5️⃣ 버튼 활성화 - 모든 칸이 채워져야 버튼이 파란색이 됨
 *
 * ⚡ 핵심 개념:
 * - useState = 데이터를 저장하는 박스
 * - function = 특정 작업을 하는 도구
 * - async/await = 서버와 통신할 때 기다리는 방법
 */
'use client';
import { IBoardsWriteProps } from './types'; // TypeScript 타입 정의
import { useMutation, useQuery } from '@apollo/client'; // GraphQL 훅들
import { useParams, useRouter } from 'next/navigation'; // Next.js 라우팅 훅들
import { useState, useEffect } from 'react'; // React 훅들
import { ChangeEvent } from 'react'; // TypeScript 이벤트 타입

import {
  CreateBoardDocument,
  CreateBoardMutation,
  CreateBoardMutationVariables,
  FetchBoardForEditDocument,
  UpdateBoardDocument,
  UpdateBoardMutation,
  UpdateBoardMutationVariables,
} from '@/commons/graphql/graphql';
import { UPLOAD_FILE } from './queries';
import { useForm } from 'react-hook-form';
import { schema } from '@/schemas/auth.schema';

export default function useBoardsWrite(props?: IBoardsWriteProps) {
  const router = useRouter(); // 페이지 이동을 위한 Next.js 라우터
  const params = useParams(); // URL에서 boardId 파라미터 추출 (수정 모드에서 사용)
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  // === 입력 필드 상태 관리 ===
  // 사용자 입력값을 저장하는 통합된 state 객체
  const [inputs, setInputs] = useState({
    name: '', // 작성자명
    title: '', // 게시글 제목
    content: '', // 게시글 내용
  });
  const [password, setPassword] = useState(''); // 비밀번호 (게시글 수정/삭제 시 필요)
  const [zipcode, setZipcode] = useState(''); // 우편번호 (다음 API로 검색)
  const [address, setAddress] = useState(''); // 기본 주소 (예: 서울특별시 강남구 테헤란로)
  const [addressDetail, setAddressDetail] = useState(''); // 상세 주소 (예: 123동 456호)
  const [youtubeUrl, setyoutubeUrl] = useState(''); // 유튜브 동영상 URL
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]); // 업로드된 이미지 파일 URL 배열 (최대 3개)

  // === 버튼 활성화 상태 관리 ===
  // 등록/수정 버튼 활성화 여부를 관리하는 state
  // 수정 모드: 기본적으로 활성화, 등록 모드: 모든 필수 입력이 완료되면 활성화
  const [isActive, setIsActive] = useState(props?.isEdit ? true : false);

  // === 유효성 검증 에러 메시지 상태 ===
  // 각 입력 필드별로 유효성 검증 실패 시 표시할 에러 메시지
  const [nameError, setNameError] = useState(''); // 작성자명 에러메시지 (필수입력 검증)
  const [passwordError, setPasswordError] = useState(''); // 비밀번호 에러메시지 (필수입력 검증)
  const [titleError, setTitleError] = useState(''); // 제목 에러메시지 (필수입력 검증)
  const [contentError, setContentError] = useState(''); // 내용 에러메시지 (필수입력 검증)

  // === 모달 상태 관리 ===
  // 성공/실패/경고 메시지를 사용자에게 알리기 위한 모달 창 상태
  const [modalOpen, setModalOpen] = useState(false); // 모달 창 표시 여부
  const [modalMessage, setModalMessage] = useState(''); // 모달 창에 표시할 메시지 내용

  // === GraphQL API 훅들 ===
  // 게시글 생성을 위한 뮤테이션 훅 (등록 모드에서 사용)
  const [createBoard] = useMutation<
    CreateBoardMutation,
    CreateBoardMutationVariables
  >(CreateBoardDocument);

  // 게시글 수정을 위한 뮤테이션 훅 (수정 모드에서 사용)
  const [updateBoard] = useMutation<
    UpdateBoardMutation,
    UpdateBoardMutationVariables
  >(UpdateBoardDocument);

  // 파일 업로드를 위한 뮤테이션 훅 (이미지를 Google Cloud Storage에 업로드)
  const [uploadFile] = useMutation(UPLOAD_FILE);

  // 수정 모드일 때 기존 게시글 데이터를 가져오는 쿼리 훅
  const { data } = useQuery(FetchBoardForEditDocument, {
    variables: { boardId: params.boardId }, // URL에서 가져온 boardId로 게시글 조회
  });

  // === useEffect: 수정 모드 데이터 초기화 ===
  // 수정 모드일 때 기존 게시글의 이미지 데이터를 업로드 파일 상태에 설정
  // 이렇게 하면 수정 페이지에서 기존에 업로드된 이미지들이 미리보기로 표시됨
  useEffect(() => {
    if (data?.fetchBoard?.images && props?.isEdit) {
      setUploadedFiles(data.fetchBoard.images);
    }
  }, [data, props?.isEdit]); // data 또는 isEdit이 변경될 때마다 실행
  // === 입력창에 글자를 타이핑할 때마다 실행되는 함수 ===
  /**
   * 🎯 이 함수의 목적: 사용자가 입력창에 뭔가 입력할 때마다 실행됨
   *
   * 💡 쉬운 예시:
   * - 제목 입력창에 "안녕"이라고 타이핑 → 이 함수가 실행됨
   * - 내용 입력창에 "하세요"라고 타이핑 → 이 함수가 또 실행됨
   *
   * 🔄 함수가 하는 일:
   * 1️⃣ 타이핑한 내용을 저장하기
   * 2️⃣ 모든 칸이 채워졌는지 확인해서 "등록하기" 버튼 활성화 여부 결정
   */
  const onChangeInputs = (event) => {
    // 🎯 1단계: 타이핑한 내용을 저장하기
    // event.target.id = 어떤 입력창인지 알려줌 ("name", "title", "content" 중 하나)
    // event.target.value = 실제로 타이핑한 내용

    console.log('어떤 입력창:', event.target.id); // 디버깅용
    console.log('타이핑한 내용:', event.target.value); // 디버깅용

    setInputs({
      ...inputs, // 기존에 저장된 다른 입력창 내용들은 그대로 유지
      [event.target.id]: event.target.value, // 지금 타이핑한 입력창만 새로운 내용으로 교체
    });

    // 📝 예시:
    // 만약 제목 입력창(id="title")에 "안녕하세요"라고 타이핑했다면
    // inputs = { name: "기존내용", title: "안녕하세요", content: "기존내용" } 이렇게 됨

    // 🎯 2단계: 버튼 활성화 여부 결정하기
    // ⚠️ 중요: setState는 즉시 반영되지 않아서 새로운 객체를 만들어 확인해야 함
    const newInputs = {
      ...inputs,
      [event.target.id]: event.target.value,
    };

    // 🔍 3단계: 모든 필수 항목이 채워졌는지 확인
    if (props?.isEdit) {
      // 📝 수정 모드일 때: 제목과 내용만 있으면 OK
      if (newInputs.title && newInputs.content) {
        setIsActive(true); // 버튼 파란색으로 활성화
      } else {
        setIsActive(false); // 버튼 회색으로 비활성화
      }
    } else {
      // 📝 등록 모드일 때: 이름, 비밀번호, 제목, 내용 모두 필요
      if (newInputs.name && password && newInputs.title && newInputs.content) {
        setIsActive(true); // 모든 칸이 채워짐 → 버튼 활성화
      } else {
        setIsActive(false); // 하나라도 비어있음 → 버튼 비활성화
      }
    }
  };
  // === 게시글 등록 함수 ===
  /**
   * 새 게시글을 서버에 등록하는 함수 (등록 모드에서 사용)
   * GraphQL createBoard 뮤테이션을 호출하여 게시글 데이터를 서버에 저장
   * 성공 시 생성된 게시글의 상세 페이지로 자동 이동
   */

  const onClickSubmit = async (data: ISchema) => {
    try {
      // GraphQL 뮤테이션으로 게시글 생성 요청
      const result = await createBoard({
        variables: {
          createBoardInput: {
            writer: inputs.name, // 작성자명
            title: inputs.title, // 제목
            contents: inputs.content, // 내용
            password: password, // 비밀번호 (수정/삭제 시 필요)
            boardAddress: {
              zipcode: zipcode, // 우편번호
              address: address, // 기본주소
              addressDetail: addressDetail, // 상세주소
            },
            youtubeUrl: youtubeUrl, // 유튜브 동영상 URL
            images: uploadedFiles, // 업로드된 이미지 URL 배열
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

  // === 게시글 수정 함수 ===
  /**
   * 기존 게시글을 수정하는 함수 (수정 모드에서 사용)
   * 1. 사용자에게 비밀번호 입력 요청 (보안 확인)
   * 2. GraphQL updateBoard 뮤테이션으로 게시글 수정
   * 3. 성공 시 수정된 게시글 상세 페이지로 이동
   */
  const onClickUpdate = async () => {
    // 비밀번호 확인을 위해 prompt 창으로 입력 받기
    // (실제 프로덕션에서는 더 안전한 방식 사용 권장)
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
        images?: string[];
      } = {};
      if (inputs.title !== '') updateBoardInput.title = inputs.title;
      if (inputs.content !== '') updateBoardInput.contents = inputs.content;
      if (youtubeUrl !== '') updateBoardInput.youtubeUrl = youtubeUrl;
      // 이미지 배열 업데이트
      updateBoardInput.images = uploadedFiles.filter(
        (file) => file !== undefined && file !== ''
      );
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

  // 비밀번호 입력 시 실행되는 함수
  const onChangePassword = (event) => {
    setPassword(event.target.value);
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

  // === 📸 이미지 업로드 함수들 (쉬운 설명) ===
  /**
   * 🎯 첫 번째 이미지 업로드 함수
   *
   * 💡 언제 실행되나?
   * → 사용자가 첫 번째 업로드 버튼을 클릭해서 이미지 파일을 선택했을 때
   *
   * 🔄 함수가 하는 일 (순서대로):
   * 1️⃣ 사용자가 선택한 파일을 가져오기
   * 2️⃣ 파일을 서버(구글 클라우드)에 업로드하기
   * 3️⃣ 업로드 완료 후 받은 URL을 첫 번째 자리(배열[0])에 저장하기
   */
  const onFileUpload0 = async (event: ChangeEvent<HTMLInputElement>) => {
    console.log('📸 첫 번째 이미지 업로드 시작!');

    // 🎯 1단계: 사용자가 선택한 파일 가져오기
    const file = event.target.files?.[0]; // files[0] = 선택한 첫 번째 파일
    if (!file) {
      console.log('❌ 파일이 선택되지 않았습니다');
      return; // 파일이 없으면 함수 끝내기
    }

    console.log('✅ 선택된 파일:', file.name);

    // 🎯 2단계: 파일을 서버에 업로드하기
    const result = await uploadFile({ variables: { file } });
    console.log('📤 업로드 완료! 받은 URL:', result.data?.uploadFile?.url);

    // 🎯 3단계: 업로드된 URL을 첫 번째 자리에 저장하기
    const newFiles = [...uploadedFiles]; // 기존 배열을 복사 (중요!)
    newFiles[0] = result.data?.uploadFile?.url; // 0번 자리에 새 URL 저장
    setUploadedFiles(newFiles); // 화면에 반영

    console.log('💾 저장 완료! 현재 파일 목록:', newFiles);
  };

  /**
   * 🎯 두 번째 이미지 업로드 함수
   * 💡 첫 번째 함수와 똑같은 방식이지만, 배열의 1번 자리에 저장
   */
  const onFileUpload1 = async (event: ChangeEvent<HTMLInputElement>) => {
    console.log('📸 두 번째 이미지 업로드 시작!');

    const file = event.target.files?.[0];
    if (!file) return;

    const result = await uploadFile({ variables: { file } });
    const newFiles = [...uploadedFiles];
    newFiles[1] = result.data?.uploadFile?.url; // ⭐ 1번 자리에 저장 (0번 아님!)
    setUploadedFiles(newFiles);

    console.log('💾 두 번째 이미지 저장 완료!');
  };

  /**
   * 🎯 세 번째 이미지 업로드 함수
   * 💡 첫 번째 함수와 똑같은 방식이지만, 배열의 2번 자리에 저장
   */
  const onFileUpload2 = async (event: ChangeEvent<HTMLInputElement>) => {
    console.log('📸 세 번째 이미지 업로드 시작!');

    const file = event.target.files?.[0];
    if (!file) return;

    const result = await uploadFile({ variables: { file } });
    const newFiles = [...uploadedFiles];
    newFiles[2] = result.data?.uploadFile?.url; // ⭐ 2번 자리에 저장
    setUploadedFiles(newFiles);

    console.log('💾 세 번째 이미지 저장 완료!');
  };

  // 🧠 왜 함수를 3개로 나눴을까?
  // → 각 버튼이 각자의 자리(0번, 1번, 2번)에 저장하기 위해서
  // → 예: [첫번째이미지URL, 두번째이미지URL, 세번째이미지URL]

  // === 컴포넌트에서 사용할 상태와 함수들 반환 ===
  return {
    // 상태 데이터
    data, // 수정 모드일 때 기존 게시글 데이터
    inputs, // 입력 필드 값들 {name, title, content}
    password, // 비밀번호
    zipcode, // 우편번호
    address, // 기본 주소
    addressDetail, // 상세 주소
    youtubeUrl, // 유튜브 URL
    uploadedFiles, // 업로드된 이미지 URL 배열

    // 상태 설정 함수들
    setZipcode, // 우편번호 설정
    setAddress, // 기본 주소 설정
    setAddressDetail, // 상세 주소 설정
    setyoutubeUrl, // 유튜브 URL 설정

    // UI 상태
    isActive, // 버튼 활성화 상태
    modalOpen, // 모달 표시 여부
    modalMessage, // 모달 메시지

    // 에러 메시지들
    nameError, // 작성자명 에러
    passwordError, // 비밀번호 에러
    titleError, // 제목 에러
    contentError, // 내용 에러

    // 이벤트 핸들러 함수들
    register,
    handleSubmit,
    onChangeInputs, // 공통 입력 필드 변경
    onChangePassword, // 비밀번호 변경
    onChangeYoutubeUrl, // 유튜브 URL 변경
    onFileUpload0, // 첫 번째 이미지 업로드
    onFileUpload1, // 두 번째 이미지 업로드
    onFileUpload2, // 세 번째 이미지 업로드

    // 주요 액션 함수들
    onClickSignUp, // 게시글 등록 (유효성 검증 포함)
    onClickSubmit, // 게시글 등록 API 호출
    onClickUpdate, // 게시글 수정
    closeModal, // 모달 닫기
  };
}

/**
 * 🎓 시험 대비 핵심 요약 (꼭 기억하세요!)
 *
 * 📝 함수 작성 패턴:
 * 1️⃣ 이벤트 함수: const 함수명 = (event) => { ... }
 * 2️⃣ 비동기 함수: const 함수명 = async () => { ... }
 * 3️⃣ 상태 업데이트: set함수명(새로운값)
 *
 * 🔄 자주 나오는 패턴들:
 * - 입력값 저장: [event.target.id]: event.target.value
 * - 배열 복사: const 새배열 = [...기존배열]
 * - 조건부 실행: if (조건) { ... } else { ... }
 * - 파일 확인: if (!file) return;
 *
 * ⚠️ 실수하기 쉬운 부분:
 * - useState는 즉시 반영 안됨 → 새 객체 만들어서 확인
 * - 배열 수정할 때 반드시 복사본 만들기
 * - async 함수에는 반드시 await 붙이기
 * - 파일 업로드는 event.target.files[0] 사용
 *
 * 🎯 면접/시험 단골 질문:
 * Q: useState는 왜 즉시 반영이 안 되나요?
 * A: React가 성능을 위해 상태 업데이트를 모아서 처리하기 때문
 *
 * Q: ...inputs는 왜 사용하나요?
 * A: 기존 데이터는 유지하고 일부만 변경하기 위해서 (스프레드 연산자)
 */
