// src/app/boards/[boardId]/page.tsx

"use client"; // 👈 [핵심] useState, useRouter, useQuery 같은 훅(hook)을 사용하려면 반드시 최상단에 선언해야 합니다.

import { useQuery, gql } from "@apollo/client";
import { useParams, useRouter } from "next/navigation"; // 👈 [기능] useRouter는 페이지 이동을 위해, useParams는 주소창의 ID를 가져오기 위해 필요합니다.
import Image from "next/image"; // 👈 [성능] Next.js의 최적화된 이미지 컴포넌트를 사용합니다.
import styles from "./styles.module.css"; // 👈 [디자인] 이 페이지 전용 스타일 파일을 불러옵니다.

// [관리] 사용할 이미지들을 미리 import하고 객체로 관리하면, 나중에 수정하거나 찾기 편리합니다.
import profileImage from "@assets/profile_image.png";
import linkImage from "@assets/link.png";
import locationImage from "@assets/location.png";
import heartImage from "@assets/heart.png";
import brokenheartImage from "@assets/brokenheart.png";
import pencilImage from "@assets/pencil.png";
import listImage from "@assets/list.png";
import contentImage from "@assets/openthesea.png";
import video from "@assets/video.png";

]
  

// [데이터] 서버에 어떤 데이터를 요청할지 미리 작성해둔 '요청서(Query)'입니다.
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
  const router = useRouter(); // 👈 [준비] 페이지 이동 기능을 사용할 수 있도록 준비합니다.
  const params = useParams(); // 👈 [준비] 주소창의 동적인 값([boardId])을 가져올 수 있도록 준비합니다.
  const boardId = params.boardId; // 👈 [실행] 주소창에서 실제 ID 값을 추출합니다.

  // [핵심] Apollo Client의 useQuery를 사용해 서버에 데이터를 요청합니다.
  // boardId를 variables에 담아 보내면, 서버는 그 ID에 맞는 게시글 하나만 찾아서 보내줍니다.
  const { data, loading } = useQuery(FETCH_BOARD, {
    variables: { boardId: boardId },
  });

  // [안정성] 데이터가 로딩 중일 때는 잠시 "로딩 중"이라는 글자를 보여줘서, 데이터가 없는 상태에서 발생하는 오류를 막아줍니다.
  if (loading) return <div>게시글을 불러오는 중입니다...</div>;

  return (
    <div className={styles.detailLayout}>
      <div className={styles.detailBody}>
        <div className={styles.detailFrame}>
          {/* [데이터 표시] "살어리랏다" 같은 고정된 텍스트 대신, data 객체에서 받아온 실제 제목을 보여줍니다. */}
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
            <Image src={linkImage} alt="링크아이콘" />
            <Image src={locationImage} alt="위치아이콘" />
          </div>
          <div className={styles.detailContentContainer}>
            <Image src={contentImage} alt="게시글 이미지" className={styles.detailContentImage}/>
            <div className={styles.detailContentText}>{data?.fetchBoard?.contents}</div>
            <div className={styles.detailContentGoodOrBad}>
              <div className={styles.detailGoodContainer}>
                <Image src={goodImage} alt="좋아요" />
                <div className={styles.detailGoodText}>{data?.fetchBoard?.likeCount}</div>
              </div>
              <div className={styles.detailGoodContainer}>
                <Image src={badImage} alt="싫어요" />
                <div className={styles.detailBadText}>{data?.fetchBoard?.dislikeCount}</div>
              </div>
            </div>
            {/* [기능] 버튼에 onClick 이벤트를 연결해서, 클릭 시 실제로 페이지가 이동하도록 만듭니다. */}
            <div className={styles.detailButtonsContainer}>
              <button className={styles.detailButton} onClick={() => router.push('/boards')}>
                <Image src={listImage} alt="목록아이콘" />
                <div>목록으로</div>
              </button>
              <button className={styles.detailButton} onClick={() => router.push(`/boards/${boardId}/edit`)}>
                <Image src={pencilImage} alt="수정아이콘" />
                <div>수정하기</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}