'use client';
import { gql, useMutation } from '@apollo/client';
import styles from './CommentWrite.module.css';
import Image from 'next/image';

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
   const router = useRouter(); // 페이지 이동을 위한 Next.js 라우터
  const params = useParams(); // URL에서 boardId 파라미터 추출
  const [createBoardComment] = useMutation(FETCH_CREATE_COMMENT);
  const onClickCommentSubmit = async() => {
    try{
      const result = await createBoardComment({
        variables: {
          createBoardCommentInput:{
            writer: name,
            password: password,
            contents: contents,
            rating: rating,
          }
        }
      })

    }

  }

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
          <input type="text" placeholder="작성자 명을 입력해 주세요" />
        </div>
        <div className={styles.commentInput}>
          <div>비밀번호</div>
          <input type="password" placeholder="비밀번호를 입력해 주세요." />
        </div>
      </div>
      <textarea
        placeholder="댓글을 입력해 주세요."
        className={styles.textInput}
      />
      <div className={styles.commentbutton}>
        <button>댓글 등록</button>
      </div>
      <hr />
      여기아래로 댓글목록임
    </div>
  );
}
