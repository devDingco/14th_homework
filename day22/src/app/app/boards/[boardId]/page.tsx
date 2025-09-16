"use client";

import { useQuery, gql } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./styles.module.css";

import profileImage from "@assets/profile_image.png";
import link from "@assets/link.png";
import location from "@assets/location.png";
import heart from "@assets/heart.png";
import brokenheart from "@assets/brokenheart.png";
import pencil from "@assets/pencil.png";
import left_icon from "@assets/left_icon.png";
import openthesea from "@assets/openthesea.png";


// 서버에 데이터를 요청하기 위한 GraphQL Query
const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      writer
      title
      contents
      likeCount
      dislikeCount
      createdAt
    }
  }
`;

export default function BoardsDetailPage() {
  const router = useRouter();
  const params = useParams();
  const boardId = params.boardId;

  // useQuery로 서버에서 진짜 데이터를 가져옵니다.
  const { data, loading } = useQuery(FETCH_BOARD, {
    variables: { boardId: boardId },
  });

  if (loading) return <div>게시글을 불러오는 중입니다...</div>;

  return (
    <div className={styles.detailLayout}>
      <div className={styles.detailBody}>
        <div className={styles.detailFrame}>
          {/* 하드코딩된 텍스트 대신 `data`에서 받아온 실제 데이터를 사용합니다. */}
          <div className={styles.detailSubject}>{data?.fetchBoard?.title}</div>
          <div className={styles.detailMetadataContainer}>
            <div className={styles.detailMetadataProfile}>
              <Image src={profileImage} alt="프로필이미지" width={40} height={40} />
              <div>{data?.fetchBoard?.writer}</div>
            </div>
            <div className={styles.detailMetadataDate}>
                {data?.fetchBoard?.createdAt.split("T")[0]}
            </div>
          </div>
          <div className={styles.enrollBorder}></div>
          <div className={styles.detailMetadataIconContainer}>
       
            <Image src={link} alt="링크아이콘" />
            <Image src={location} alt="위치아이콘" />
          </div>
          <div className={styles.detailContentContainer}>
            <Image src={openthesea} alt="게시글 이미지" className={styles.detailContentImage}/>
            <div className={styles.detailContentText}>{data?.fetchBoard?.contents}</div>
            <div className={styles.detailContentGoodOrBad}>
              <div className={styles.detailGoodContainer}>
               
                <Image src={heart} alt="좋아요" />
                <div className={styles.detailGoodText}>{data?.fetchBoard?.likeCount}</div>
              </div>
              <div className={styles.detailGoodContainer}>
       
                <Image src={brokenheart} alt="싫어요" />
                <div className={styles.detailBadText}>{data?.fetchBoard?.dislikeCount}</div>
              </div>
            </div>
            <div className={styles.detailButtonsContainer}>
              <button className={styles.detailButton} onClick={() => router.push('/boards')}>
               
                <Image src={left_icon} alt="목록아이콘" />
                <div>목록으로</div>
              </button>
              <button className={styles.detailButton} onClick={() => router.push(`/boards/${boardId}/edit`)}>
                <Image src={pencil} alt="수정아이콘" />
                <div>수정하기</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}