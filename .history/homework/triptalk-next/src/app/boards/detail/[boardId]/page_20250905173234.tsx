'use client';
//상세페이지
import styles from './BoardsDetail.module.css';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';

const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
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

export default function BoardsDetail() {
  const router = useRouter();
  const onClickEdit = () => {
    router.push(`/boards/detail/${params.boardId}/edit`);
  };
  const onClickList = () => {
    router.push('/boards');
  };
  const params = useParams();
  const { data } = useQuery(FETCH_BOARD, {
    variables: {
      boardId: params.boardId,
    },
  });
  // 그려주는곳
  return (
    <div className="container">
      <h1 className={styles.h1}>{data?.fetchBoard.title}</h1>
      <div className={styles.작성자날짜}>
        <div className={styles.작성자}>
          <Image src="/icons/profile.png" alt="" width={24} height={24} />
          <div>{data?.fetchBoard.writer}</div>
        </div>
        <div className={styles.날짜}>
          {data?.fetchBoard.createdAt &&
            new Date(data.fetchBoard.createdAt).toLocaleDateString('ko-KR')}
        </div>
      </div>
      <hr className={styles.hr} />
      <div>
        <div className={styles.링크위치}>
          <Image src="/icons/link1.png" alt="" width={24} height={24} />
          <Image src="/icons/location.png" alt="" width={24} height={24} />
        </div>
      </div>
      <Image
        src="/icons/sea.png"
        alt=""
        className={styles.바다사진}
        width={400}
        height={531}
      />
      <div>{data?.fetchBoard.contents}</div>
      <div className={styles.동영상배경}>
        <Image
          src="/icons/video.png"
          alt="동영상이미지"
          width={300}
          height={200}
        />
      </div>
      <div className={styles.싫어요좋아요}>
        <div className={styles.싫어요}>
          <div>
            <Image src="/icons/bad.png" alt="" width={24} height={24} />
          </div>
          <div>24</div>
        </div>

        <div className={styles.좋아요}>
          <div>
            <Image src="/icons/good.png" alt="" width={24} height={24} />
          </div>
          <div>12</div>
        </div>
      </div>
      <div className={styles.목록수정}>
        <button onClick={onClickList} className={styles.목록버튼}>
          <Image src="/icons/list.png" alt="" width={16} height={16} />
          목록으로
        </button>
        <button onClick={onClickEdit} className={styles.수정버튼}>
          <Image src="/icons/pen.png" alt="" width={16} height={16} />
          수정하기
        </button>
      </div>
    </div>
  );
}
