'use client';
//댓글 등록
import { gql, useMutation } from '@apollo/client';

import styles from './CommentWrite.module.css';
import Image from 'next/image';

import { useParams } from 'next/navigation';
import { useState } from 'react';

const FETCH_CREATE_COMMENT = gql`
  mutation createBoardComment(
    $createBoardCommentInput: CreateBoardCommentInput!
    $boardId: ID!
  ) {
    createBoardComment(
      createBoardCommentInput: $createBoardCommentInput
      boardId: $boardId
    ) {
      _id
      writer
      contents
    }
  }
`;

export default function CommentWrite() {
  const params = useParams(); // URL에서 boardId 파라미터 추출

  const [name, setName] = useState(''); // 작성자명 상태
  const [password, setPassword] = useState('');
  const [contents, setContents] = useState('');
  const [rating, setrating] = useState(5.0);

  const [createBoardComment] = useMutation(FETCH_CREATE_COMMENT);
  const onClickCommentSubmit = async () => {
    try {
      const result = await createBoardComment({
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

      // 폼 초기화
      setName('');
      setPassword('');
      setContents('');
      setrating(5.0);
    } catch (error) {
      alert('댓글등록실패');
    }
  };

  return (
    <div className="container">
      <hr />
      <div className={styles.comment}>
        <Image src="/icons/chat.png" alt="아이콘" width={24} height={24} />
        <div>댓글</div>
      </div>
      <div className={styles.star}>별점</div>
      <div className={styles.commentContainer}>
        <div className={styles.commentInput}>
          <div>작성자</div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="작성자 명을 입력해 주세요"
          />
        </div>
        <div className={styles.commentInput}>
          <div>비밀번호</div>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="비밀번호를 입력해 주세요."
          />
        </div>
      </div>
      <textarea
        value={contents}
        onChange={(e) => setContents(e.target.value)}
        placeholder="댓글을 입력해 주세요."
        className={styles.textInput}
      />
      <div className={styles.commentbutton}>
        <button onClick={onClickCommentSubmit}>댓글 등록</button>
      </div>
    </div>
  );
}
