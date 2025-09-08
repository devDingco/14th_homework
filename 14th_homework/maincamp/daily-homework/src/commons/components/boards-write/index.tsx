'use client';

import styles from './styles.module.css';
import { gql, useMutation } from '@apollo/client';
import { useRouter, useParams } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import Link from 'next/link';

const myGraphqlSetting = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
      writer
      title
      contents
      createdAt
      updatedAt
    }
  }
`;

// 수정 mutation
const myGraphqlReviseSetting = gql`
  mutation updateBoard($updateBoardInput: UpdateBoardInput!, $password: String!, $boardId: ID!) {
    updateBoard(updateBoardInput: $updateBoardInput, password: $password, boardId: $boardId) {
      _id
      title
      writer
      contents
    }
  }
`;

const FETCH_BOARD = gql`
  query fetchBoard($ID: ID!) {
    fetchBoard(boardId: $ID) {
      writer
      title
      contents
      createdAt
      updatedAt
    }
  }
`;

type Errors = {
  writer?: string;
  password?: string;
  title?: string;
  content?: string;
};

interface Props {
  isEdit?: boolean;
  data?: {
    fetchBoard: {
      writer: string;
      title: string;
      contents: string;
      createdAt: string;
      updatedAt: string;
    };
  };
}

export default function BoardsWriteAdvanced(props: Props) {
  const [writer, setWriter] = useState<string>(props.data?.fetchBoard.writer || '');
  const [password, setPassword] = useState<string>('');
  const [title, setTitle] = useState<string>(props.data?.fetchBoard.title || '');
  const [content, setContent] = useState<string>(props.data?.fetchBoard.contents || '');

  const router = useRouter();
  const params = useParams();

  const [apiRequire] = useMutation(myGraphqlSetting);

  const onClickSubmit = async () => {
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
    router.push(`/boards/${result.data.createBoard._id}`);
  };

  // 게시글수정API요청함수
  const [reviseApiRequire] = useMutation(myGraphqlReviseSetting);

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

    const updateBoardInput: any = {};

    // 현재 값 또는 기존 값 사용 (변경되지 않았어도 전송)
    updateBoardInput.title = title.trim() || props.data?.fetchBoard.title || '';
    updateBoardInput.contents = content.trim() || props.data?.fetchBoard.contents || '';

    try {
      const result = await reviseApiRequire({
        variables: {
          updateBoardInput,
          password: checkPassword,
          boardId: params.boardId,
        },
        refetchQueries: [{ query: FETCH_BOARD, variables: { ID: params.boardId } }],
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
      const currentTitle = title.trim() || props.data?.fetchBoard.title || '';
      const currentContent = content.trim() || props.data?.fetchBoard.contents || '';

      if (!currentTitle) e.title = '필수입력 사항 입니다.';
      if (!currentContent) e.content = '필수입력 사항 입니다.';
    }

    setErrors(e);

    const ok = Object.keys(e).length === 0;
    if (!ok) {
      alert('에러가 발생하였습니다. 다시 시도해 주세요');
    }

    return ok;
  };

  const checkSubmit = [writer, password, title, content].every((v) => v.trim().length > 0);

  return (
    <div className={styles.layout}>
      <div className={styles['enroll-subject']}>
        <div className={styles['enroll-subject-text']}>게시물 등록</div>
      </div>
      <div className={styles['enroll-row-container']}>
        <div className={styles['enroll-row-section']}>
          <div className={styles['enroll-row-flex']}>
            <div className={styles['flex-half']}>
              <div className={styles['enroll-form-title']}>
                <div>작성자 </div>
                <div className={styles['enroll-required-indicator']}>*</div>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="작성자 명을 입력해 주세요."
                  className={styles['enroll-input']}
                  onChange={onChangeWriter}
                  defaultValue={props.data?.fetchBoard.writer}
                  disabled={props.isEdit}
                />
                {error.writer && <p className={styles.error}>{error.writer}</p>}
              </div>
            </div>
            <div className={styles['flex-half']}>
              <div className={styles['enroll-form-title']}>
                <div>비밀번호</div>
                <div className={styles['enroll-required-indicator']}> *</div>
              </div>
              <input
                type="password"
                placeholder="비밀번호를 입력해 주세요."
                className={styles['enroll-input']}
                onChange={onChangePassword}
                disabled={props.isEdit}
              />
              {error.password && <p className={styles.error}>{error.password}</p>}
            </div>
          </div>
        </div>

        <div className={styles['enroll-border']}></div>

        <div className={styles['enroll-row-section']}>
          <div className={styles['enroll-form-title']}>
            <div>제목</div>
            <div className={styles['enroll-required-indicator']}> *</div>
          </div>
          <input
            type="text"
            className={styles['enroll-input']}
            placeholder="제목을 입력해 주세요."
            onChange={onChangeTitle}
            defaultValue={props.data?.fetchBoard.title}
          />
          {error.title && <p className={styles.error}>{error.title}</p>}
        </div>
        <div className={styles['enroll-border']}></div>
        <div className={styles['enroll-row-section']}>
          <div className={styles['enroll-form-title']}>
            <div>내용</div>
            <div className={styles['enroll-required-indicator']}> *</div>
          </div>
          <input
            type="text"
            className={styles.contents}
            placeholder="내용을 입력해 주세요."
            onChange={onChangeContent}
            defaultValue={props.data?.fetchBoard.contents}
          />
          {error.content && <p className={styles.error}>{error.content}</p>}
        </div>
        <div className={styles['enroll-row-section']}>
          <div className={styles['enroll-form-title']}>
            <div>주소</div>
          </div>
          <div className={styles['enroll-address-firstrow']}>
            <input type="number" className={styles['zipcode-input']} placeholder="12345" />
            <button className={styles['zipcode-search-button']}>우편번호 검색</button>
          </div>

          <input
            placeholder="주소를 입력해주세요."
            className={styles['enroll-input']}
            type="text"
          />
          <input placeholder="상세주소" className={styles['enroll-input']} type="text" />
        </div>
        {/* border */}
        <div className={styles['enroll-border']}></div>
        <div className={styles['enroll-row-section']}>
          <div className={styles['enroll-form-title']}>
            <div>유튜브 링크</div>
          </div>
          <input className={styles['enroll-input']} placeholder="링크를 입력해 주세요." />
        </div>

        {/* border */}
        <div className={styles['enroll-border']}></div>

        <div className={styles['enroll-row-section']}>
          <div>사진 첨부</div>
          <div className={styles['picture-enroll-row']}>
            <img src="/add image.png" />
            <img src="/add image.png" />
            <img src="/add image.png" />
          </div>
        </div>
      </div>
      <div className={styles['enroll-button-container']}>
        <button className={styles['enroll-cancel-button']}>취소</button>
        {/* <Link href={'/boards/detail'}> */}
        <button
          className={styles['enroll-submit-button']}
          onClick={props.isEdit ? onclickUpdate : onClickSubmit}
          //   disabled={!checkSubmit}
          //   aria-disabled={!checkSubmit}
        >
          게시글 {props.isEdit ? '수정' : '등록'}하기
        </button>
        {/* </Link> */}
      </div>
    </div>
  );
}
