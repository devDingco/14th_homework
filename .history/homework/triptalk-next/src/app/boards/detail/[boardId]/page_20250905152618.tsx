'use client';
//상세페이지
import styles from './BoardsDetail.module.css';
import profile from '../../../../assets/icons/profile.png';
import myVideo from '../../../../assets/image/video.png';
import link1 from '../../../../assets/icons/link1.png';
import location from '../../../../assets/icons/location.png';
import sea from '../../../../assets/image/sea.png';
import bad from '../../../../assets/icons/bad.png';
import good from '../../../../assets/icons/good.png';
import list from '../../../../assets/icons/list.png';
import pen from '../../../../assets/icons/pen.png';
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
  const onClickList = () => {
    router.push('/boards');
  };
  const 내주소변수 = useParams();
  const { data } = useQuery(FETCH_BOARD, {
    variables: {
      boardId: 내주소변수.boardId,
    },
  });
  // 그려주는곳
  return (
    <div className="container">
      <h1 className={styles.h1}>{data?.fetchBoard.title}</h1>
      <div className={styles.작성자날짜}>
        <div className={styles.작성자}>
          <Image src={profile} alt="" width={0} height={0} />
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
          <Image src={link1} alt="" />
          <Image src={location} alt="" />
        </div>
      </div>
      <Image src={sea} alt="" className={styles.바다사진} />
      <div>{data?.fetchBoard.contents}</div>
      <div className={styles.동영상배경}>
        <Image src={myVideo} alt="동영상이미지" />
      </div>
      <div className={styles.싫어요좋아요}>
        <div className={styles.싫어요}>
          <div>
            <Image src={bad} alt="" />
          </div>
          <div>24</div>
        </div>

        <div className={styles.좋아요}>
          <div>
            <Image src={good} alt="" />
          </div>
          <div>12</div>
        </div>
      </div>
      <div className={styles.목록수정}>
        <button onClick={onClickList} className={styles.목록버튼}>
          <Image src={list} alt="" />
          목록으로
        </button>
        <button className={styles.수정버튼}>
          <Image src={pen} alt="" />
          수정하기
        </button>
      </div>
    </div>
  );
}
