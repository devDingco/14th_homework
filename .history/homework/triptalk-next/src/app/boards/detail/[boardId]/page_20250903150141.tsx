'use client';

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
          <div>{data?.fetchBoard.name}</div>
        </div>
        <div className={styles.날짜}>2024.11.11</div>
      </div>
      <hr className={styles.hr} />
      <div>
        <div className={styles.링크위치}>
          <Image src={link1} alt="" />
          <Image src={location} alt="" />
        </div>
      </div>
      <Image src={sea} alt="" className={styles.바다사진} />
      <div>
        살겠노라 살겠노라. 청산에 살겠노라. 머루랑 다래를 먹고 청산에 살겠노라.
        얄리얄리 얄랑셩 얄라리 얄라 우는구나 우는구나 새야. 자고 일어나 우는구나
        새야. 너보다 시름 많은 나도 자고 일어나 우노라. 얄리얄리 얄라셩 얄라리
        얄라 갈던 밭(사래) 갈던 밭 보았느냐. 물 아래(근처) 갈던 밭 보았느냐 이끼
        묻은 쟁기를 가지고 물 아래 갈던 밭 보았느냐. 얄리얄리 얄라셩 얄라리 얄라
        이럭저럭 하여 낮일랑 지내 왔건만 올 이도 갈 이도 없는 밤일랑 또 어찌 할
        것인가. 얄리얄리 얄라셩 얄라리 얄라 어디다 던지는 돌인가 누구를 맞히려던
        돌인가. 미워할 이도 사랑할 이도 없이 맞아서 우노라. 얄리얄리 얄라셩
        얄라리 얄라 살겠노라 살겠노라. 바다에 살겠노라. 나문재, 굴, 조개를 먹고
        바다에 살겠노라. 얄리얄리 얄라셩 얄라리 얄라 가다가 가다가 듣노라.
        에정지(미상) 가다가 듣노라. 사슴(탈 쓴 광대)이 솟대에 올라서 해금을 켜는
        것을 듣노라. 얄리얄리 얄라셩 얄라리 얄라 가다 보니 배불룩한 술독에 독한
        술을 빚는구나. 조롱박꽃 모양 누룩이 매워 (나를) 붙잡으니 내 어찌
        하리이까.[1] 얄리얄리 얄라셩 얄라리 얄라
      </div>
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
        <button className={styles.목록버튼}>
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
