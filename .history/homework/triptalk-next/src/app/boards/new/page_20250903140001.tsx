'use client';

import styles from './BoardsNew.module.css';
import logo from '../../../assets/icons/logoArea.png';
import add from '../../../assets/icons/add.png';
import { ChangeEvent, useState } from 'react';
import Image from 'next/image';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';

const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
      writer
      title
      contents
      youtubeUrl
      likeCount
      dislikeCount
      images
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

export default function BoardsNew() {
  //입력값을 저장하는 state
  const [name, setName] = useState(''); //사용자가 입력한 이름
  const [password, setPassword] = useState(''); //사용자가 입력한 비밀번호
  const [title, setTitle] = useState(''); //사용자가 입력한 제목
  const [content, setContent] = useState(''); //사용자가 입력한 내용

  const [isActive, setIsActive] = useState(false); //등록하기 버튼 활성화 여부 state(활성화:true, 비활성화:false) is붙이는 이유: boolean값이라서 관례같은것

  // 입력값에 문제가 있을 경우 보여줄 에러메시지 state
  const [nameError, setNameError] = useState(''); //이름 에러메시지
  const [passwordError, setPasswordError] = useState(''); //비밀번호 에러메시지
  const [titleError, setTitleError] = useState(''); //제목 에러메시지
  const [contentError, setContentError] = useState(''); //내용 에러메시지

  const router = useRouter();
  //게시글 등록 api등록요청 함수
  const [createProduct] = useMutation(CREATE_BOARD);
  const onClickSubmit = async () => {
    const result = await createProduct({
      variables: {
        createBoardInput: {
          writer: name,
          title: title,
          contents: content,
          password: password,
        },
      },
    });
    console.log(result);
  };

  //변경값 확인하여 state에 저장
  const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    if (event.target.value && title && content) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };
  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    if (event.target.value && title && content) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };
  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    if (event.target.value && title && content) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };
  const onChangeContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
    if (event.target.value && title && content) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  //등록하기 버튼 클릭시 실행되는 함수
  // 모든 입력값 검증 후 에러메시지 보여주기 + 게시글 등록 api요청
  //async await를 사용하는 이유: api요청이 끝날때까지 기다렸다가 alert를 띄우기 위해서

  const onClickSignUp = async () => {
    // 0. 모든 에러메시지 초기화
    let hasError = false;
    // 1. 작성자 이름 검증하기
    if (name.trim() === '') {
      setNameError('필수입력 사항입니다.');
      hasError = true;
    } else {
      setNameError('');
    }

    // 2. 비밀번호 검증하기
    if (password.length === 0) {
      setPasswordError('필수입력 사항입니다.');
      hasError = true;
    } else {
      setPasswordError('');
    }
    // 3. 제목 검증하기
    if (title.trim() === '') {
      setTitleError('필수입력 사항입니다.');
      hasError = true;
    } else {
      setTitleError('');
    }

    // 4. 내용 검증하기
    if (content.trim() === '') {
      setContentError('필수입력 사항입니다.');
      hasError = true;
    } else {
      setContentError('');
    }
    //5. 성공알람 보여주는곳
    if (hasError === false) {
      await onClickSubmit(); // 게시글 등록 api요청,
      //await를 사용하는 이유: api요청이 끝날때까지 기다렸다가 alert를 띄우기 위해서 안쓰면 바로 alert가 뜸
      alert('게시물이 등록되었습니다!');
    }
  };

  // 그려주는곳
  return (
    <div className="container">
      <nav className={styles.nav}>
        <div>
          <Image src={logo} alt="로고" />
        </div>
        <div className={styles.네비}>
          <div>트립토크</div>
          <div>숙박권구매</div>
          <div>마이 페이지</div>
        </div>
      </nav>
      <h2 className={styles.h2}>게시물 등록</h2>
      <div className={styles.작성자비밀번호컨테이너}>
        <div className={styles.작성자컨테이너}>
          <div>작성자</div>
          <input
            type="text"
            placeholder="작성자 명을 입력해주세요."
            onChange={onChangeName}
          ></input>
          <div className={styles.에러메시지}>{nameError}</div>
        </div>
        <div className={styles.비밀번호컨테이너}>
          <div>비밀번호</div>
          <input
            type="password"
            placeholder="비밀번호를 입력해 주세요."
            onChange={onChangePassword}
          ></input>
          <div className={styles.에러메시지}>{passwordError}</div>
        </div>
      </div>
      <hr className={styles.hr} />
      <div className={styles.제목컨테이너}>
        <div>제목</div>
        <input
          type="text"
          placeholder="제목을 입력해 주세요."
          onChange={onChangeTitle}
        ></input>
        <div className={styles.에러메시지}>{titleError}</div>
      </div>
      <hr className={styles.hr} />
      <div className={styles.내용컨테이너}>
        <div>내용</div>
        <textarea
          placeholder="내용을 입력해 주세요."
          onChange={onChangeContent}
        ></textarea>
        <div className={styles.에러메시지}>{contentError}</div>
      </div>
      <div>
        <div className={styles.주소컨테이너}>
          <div>주소</div>

          <div className={styles.우편번호}>
            <input type="text" placeholder="01234"></input>
            <button>우편번호 검색</button>
          </div>
          <div className={styles.상세주소컨테이너}>
            <input type="text" placeholder="주소를 입력해 주세요."></input>
            <input type="text" placeholder="상세주소"></input>
          </div>
        </div>
      </div>
      <hr className={styles.hr} />
      <div>
        <div className={styles.유튜브컨테이너}>
          <div>유튜브 링크</div>
          <input type="text" placeholder="링크를 입력해 주세요"></input>
        </div>
      </div>
      <hr className={styles.hr} />
      <div className={styles.사진첨부컨테이너}>
        <div>사진첨부</div>
        <div className={styles.사진첨부}>
          <button>
            <Image src={add} alt="업로드" />
            <br />
            클릭해서 사진 업로드
          </button>
          <button>
            <Image src={add} alt="업로드" />
            <br />
            클릭해서 사진 업로드
          </button>
          <button>
            <Image src={add} alt="업로드" />
            <br />
            클릭해서 사진 업로드
          </button>
        </div>
      </div>
      <div className={styles.취소등록버튼}>
        <button className={styles.취소버튼}>취소</button>
        <button
          className={styles.등록하기버튼}
          style={{ backgroundColor: isActive === true ? '#2974E5' : '#C7C7C7' }}
          onClick={onClickSignUp}
        >
          등록하기
        </button>
      </div>
    </div>
  );
}
