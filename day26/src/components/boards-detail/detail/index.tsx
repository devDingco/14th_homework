// src/components/boards-detail/index.tsx
"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./styles.module.css";
import { useBoardDetail } from "./hook";

// 이미지 import
import profileImage from "@/assets/profile_image.png";
import linkImage from "@/assets/link.png";
import locationImage from "@/assets/location.png";
import heartImage from "@/assets/heart.png";
import brokenheartImage from "@/assets/brokenheart.png";
import pencilImage from "@/assets/pencil.png";
import listImage from "@/assets/spinningtop.png";
import contentImage from "@/assets/beauty.png";

export default function BoardsDetail() {
  const router = useRouter();
  const params = useParams();
  const boardId = params.boardId;

  const { board, loading } = useBoardDetail(boardId);

  if (loading) {return <div>게시글을 불러오는 중입니다...</div>};
      console.log("게시글 상세 데이터:", board);

  return (
    <div className={styles.detailLayout}>ㅔ
      <div className={styles.detailBody}>
        <div className={styles.detailFrame}>
          <div className={styles.detailSubject}>{board?.title}</div>
          <div className={styles.detailMetadataContainer}>
            <div className={styles.detailMetadataProfile}>
              <Image src={profileImage} alt="프로필이미지" width={40} height={40} />
              <div>{board?.writer}</div>
            </div>
            <div className={styles.detailMetadataDate}>
              {board?.createdAt.split("T")[0]}
            </div>
          </div>

          <div className={styles.enrollBorder}></div>

          <div className={styles.detailMetadataIconContainer}>
            <Image src={linkImage} alt="링크아이콘" width={24} height={24} />
            <Image src={locationImage} alt="위치아이콘" />
          </div>

          <div className={styles.detailContentContainer}>
            {/* 게시글 이미지 */}
            <Image src={contentImage} alt="게시글 이미지"  className={styles.detailContentImage} />

            {/* 본문 */}
            <div className={styles.detailContentText}>{board?.contents}</div>

            {/* 유튜브 영상 */}
            <div className={styles.detailYoutubeWrapper}>
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/6KcVHc48hs7iIix2`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* 좋아요 / 싫어요 */}
            <div className={styles.detailContentGoodOrBad}>
              <div className={styles.detailGoodContainer}>
                <Image src={heartImage} alt="좋아요" />
                <div className={styles.detailGoodText}>{board?.likeCount}</div>
              </div>
              <div className={styles.detailGoodContainer}>
                <Image src={brokenheartImage} alt="싫어요" />
                <div className={styles.detailBadText}>{board?.dislikeCount}</div>
              </div>
            </div>

            {/* 버튼 */}
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

