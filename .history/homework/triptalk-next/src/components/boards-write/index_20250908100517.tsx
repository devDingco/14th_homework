'use client'; // 이 컴포넌트를 클라이언트에서 실행하도록 설정
//수정등록컴포넌트 - 게시글 작성과 수정을 처리하는 컴포넌트
import styles from './BoardsNew.module.css'; // CSS 모듈 스타일 import
import { ChangeEvent, useState } from 'react'; // React 훅들 import
import Image from 'next/image'; // Next.js 최적화된 이미지 컴포넌트
import { gql, useMutation } from '@apollo/client'; // GraphQL 관련 import
import { useRouter } from 'next/navigation'; // Next.js 라우터 훅

// 게시글 생성을 위한 GraphQL 뮤테이션
const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id # 게시글 고유 ID
      writer # 작성자명
      title # 제목
      contents # 내용
      youtubeUrl # 유튜브 링크
      likeCount # 좋아요 수
      dislikeCount # 싫어요 수
      images # 첨부 이미지들
      # boardAddress {
      #   zipcode
      #   address
      #   addressDetail
      # }
      # user {
      #   _id
      #   email
      #   name
      # }
      # createdAt
      # updatedAt
      # deletedAt
    }
  }
`;
// 게시글 수정을 위한 GraphQL 뮤테이션
const UPDATE_BOARD = gql`
  mutation updateBoard(
    $updateBoardInput: UpdateBoardInput! # 수정할 데이터
    $password: String # 비밀번호 검증용
    $boardId: ID! # 수정할 게시글 ID
  ) {
    updateBoard(
      updateBoardInput: $updateBoardInput
      password: $password
      boardId: $boardId
    ) {
      _id
      writer
      title
      contents
      youtubeUrl
      likeCount
      dislikeCount
      images
      createdAt
      updatedAt
      deletedAt
    }
  }
`;

// 게시글 작성/수정 컴포넌트 (props를 통해 수정 모드인지 판단)
export default function BoardsWrite(props) {
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

  const router = useRouter(); // 페이지 이동을 위한 Next.js 라우터
  // GraphQL 뮤테이션 훅들
  const [createBoard] = useMutation(CREATE_BOARD); // 게시글 생성
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
      // 수정 요청 데이터 준비
      const updateData: any = {
        boardId: props.data?.fetchBoard._id, // 수정할 게시글 ID
        password: inputPassword, // 검증용 비밀번호
        updateBoardInput: {}, // 수정할 내용들
      };

      // 변경된 내용만 업데이트 데이터에 추가 (효율적인 부분 업데이트)
      if (title !== '') updateData.updateBoardInput.title = title; // 제목 변경 시
      if (content !== '') updateData.updateBoardInput.contents = content; // 내용 변경 시

      // GraphQL 뮤테이션으로 게시글 수정 요청
      const result = await updateBoard({
        variables: updateData,
      });

      // 수정된 게시글 상세 페이지로 이동
      router.push(`/boards/detail/${props.data?.fetchBoard._id}`);
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
    if (props.isEdit) {
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
    if (props.isEdit) {
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
    if (props.isEdit) {
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
    if (props.isEdit) {
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

  // JSX 렌더링 부분 - 실제로 화면에 보여지는 UI
  return (
    <div className="container">
      {/* 상단 네비게이션 바 */}
      <nav className={styles.nav}>
        <div>
          <Image src="/icons/logoArea.png" alt="로고" width={50} height={50} />
        </div>
        <div className={styles.네비}>
          <div>트립토크</div>
          <div>숙박권구매</div>
          <div>마이 페이지</div>
        </div>
      </nav>
      {/* 페이지 제목 */}
      <h2 className={styles.h2}>게시물 등록</h2>
      {/* 작성자와 비밀번호 입력 섹션 */}
      <div className={styles.작성자비밀번호컨테이너}>
        {/* 작성자 입력 필드 */}
        <div className={styles.작성자컨테이너}>
          <div>작성자</div>
          <input
            type="text"
            placeholder="작성자 명을 입력해주세요."
            onChange={onChangeName} // 입력값 변경 시 실행
            defaultValue={props.data?.fetchBoard.writer} // 수정 모드일 때 기존값 표시
            disabled={props.isEdit} // 수정 모드에서는 작성자 변경 불가
          ></input>
          <div className={styles.에러메시지}>{nameError}</div>{' '}
          {/* 작성자 에러메시지 */}
        </div>

        {/* 비밀번호 입력 필드 */}
        <div className={styles.비밀번호컨테이너}>
          <div>비밀번호</div>
          <input
            type="password"
            placeholder="비밀번호를 입력해 주세요."
            onChange={onChangePassword} // 입력값 변경 시 실행
            // defaultValue={props.data?.fetchBoard.password}  // 보안상 비밀번호는 표시하지 않음
            disabled={props.isEdit} // 수정 모드에서는 비밀번호 입력 불가
          ></input>
          <div className={styles.에러메시지}>{passwordError}</div>{' '}
          {/* 비밀번호 에러메시지 */}
        </div>
      </div>
      <hr className={styles.hr} /> {/* 구분선 */}
      {/* 제목 입력 섹션 */}
      <div className={styles.제목컨테이너}>
        <div>제목</div>
        <input
          type="text"
          placeholder="제목을 입력해 주세요."
          onChange={onChangeTitle} // 제목 입력값 변경 시 실행
          defaultValue={props.data?.fetchBoard.title} // 수정 모드일 때 기존 제목 표시
        ></input>
        <div className={styles.에러메시지}>{titleError}</div>{' '}
        {/* 제목 에러메시지 */}
      </div>
      <hr className={styles.hr} /> {/* 구분선 */}
      {/* 내용 입력 섹션 */}
      <div className={styles.내용컨테이너}>
        <div>내용</div>
        <textarea
          placeholder="내용을 입력해 주세요."
          onChange={onChangeContent} // 내용 입력값 변경 시 실행
          defaultValue={props.data?.fetchBoard.contents} // 수정 모드일 때 기존 내용 표시
        ></textarea>
        <div className={styles.에러메시지}>{contentError}</div>{' '}
        {/* 내용 에러메시지 */}
      </div>
      {/* 주소 입력 섹션 (현재 기능 미구현) */}
      <div>
        <div className={styles.주소컨테이너}>
          <div>주소</div>

          {/* 우편번호 검색 */}
          <div className={styles.우편번호}>
            <input type="text" placeholder="01234"></input>
            <button>우편번호 검색</button> {/* 우편번호 검색 기능 (미구현) */}
          </div>

          {/* 주소 입력 필드들 */}
          <div className={styles.상세주소컨테이너}>
            <input type="text" placeholder="주소를 입력해 주세요."></input>{' '}
            {/* 기본 주소 */}
            <input type="text" placeholder="상세주소"></input> {/* 상세 주소 */}
          </div>
        </div>
      </div>
      <hr className={styles.hr} /> {/* 구분선 */}
      {/* 유튜브 링크 입력 섹션 */}
      <div>
        <div className={styles.유튜브컨테이너}>
          <div>유튜브 링크</div>
          <input type="text" placeholder="링크를 입력해 주세요"></input>{' '}
          {/* 유튜브 URL 입력 */}
        </div>
      </div>
      <hr className={styles.hr} /> {/* 구분선 */}
      {/* 사진 첨부 섹션 (현재 기능 미구현) */}
      <div className={styles.사진첨부컨테이너}>
        <div>사진첨부</div>
        <div className={styles.사진첨부}>
          {/* 사진 업로드 버튼들 (최대 3개) */}
          <button>
            <Image src="/icons/add.png" alt="업로드" width={40} height={40} />
            <br />
            클릭해서 사진 업로드
          </button>
          <button>
            <Image src="/icons/add.png" alt="업로드" width={40} height={40} />
            <br />
            클릭해서 사진 업로드
          </button>
          <button>
            <Image src="/icons/add.png" alt="업로드" width={40} height={40} />
            <br />
            클릭해서 사진 업로드
          </button>
        </div>
      </div>
      {/* 하단 버튼 섹션 */}
      <div className={styles.취소등록버튼}>
        {/* 취소 버튼 */}
        <button className={styles.취소버튼}>취소</button>

        {/* 등록/수정 버튼 */}
        {/* 버튼 활성화 상태에 따라 배경색 변경 (활성화: 파란색, 비활성화: 회색) */}
        {/* 수정 모드인지에 따라 다른 함수 실행 */}
        <button
          className={styles.등록하기버튼}
          style={{ backgroundColor: isActive === true ? '#2974E5' : '#C7C7C7' }}
          onClick={props.isEdit ? onClickUpdate : onClickSignUp}
        >
          {/* 수정 모드인지에 따라 버튼 텍스트 변경 */}
          {props.isEdit ? '수정' : '등록'}하기
        </button>
      </div>
    </div>
  );
}
