"use client";
import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import styles from "./styles.module.css";
import Image from "next/image";
import { FETCH_BOARD } from "components/queries";
import { useRouter } from "next/navigation";
import profileImage from "@assets/profile_image.png";
import linkImage from "@assets/link.png";
import locationImage from "@assets/location.png";
import cheongsanImage from "@assets/cheongsan.png";
import neotubeImage from "@assets/neotube.png";
import badImage from "@assets/bad.svg";
import goodImage from "@assets/good.png";
import hamberger from "@assets/hamberger.png";
import pencil from "@assets/pencil.png";

const IMAGE_SRC = {
  profileImage: {
    src: profileImage,
    alt: "프로필이미지",
  },
  linkImage: {
    src: linkImage,
    alt: "링크아이콘",
  },
  locationImage: {
    src: locationImage,
    alt: "위치아이콘",
  },
  cheongsanImage: {
    src: cheongsanImage,
    alt: "청산사진",
  },
  neotubeImage: {
    src: neotubeImage,
    alt: "너튜브사진",
  },
  badImage: {
    src: badImage,
    alt: "싫어요",
  },
  goodImage: {
    src: goodImage,
    alt: "좋아요",
  },
  hamberger: {
    src: hamberger,
    alt: "목록아이콘",
  },
  pencil: {
    src: pencil,
    alt: "수정아이콘",
  },
} as const;

export default function BoardsDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.boardId;

  // 보여줄 board 정보 받아오기
  const { data } = useQuery(FETCH_BOARD, {
    variables: { boardId: id },
  });

  //수정하기 페이지로 이동
  const goToEditPage = () => {
    router.push(`${id}/edit`);
  };

  return (
    <div className={styles.detailLayout}>
      <div className={styles.detailBody}>
        <div className={styles.detailFrame}>
          <div className={styles.detailSubject}>{data?.fetchBoard?.title}</div>
          <div className={styles.detailMetadataContainer}>
            <div className={styles.detailMetadataProfile}>
              <Image
                src={IMAGE_SRC.profileImage.src}
                alt={IMAGE_SRC.profileImage.alt}
              />
              <div> {data?.fetchBoard?.writer}</div>
            </div>
            <div className={styles.detailMetadataDate}>
              {data?.fetchBoard?.createdAt}
            </div>
          </div>
          <div className={styles.enrollBorder}></div>
          <div className={styles.detailMetadataIconContainer}>
            <Image
              src={IMAGE_SRC.linkImage.src}
              alt={IMAGE_SRC.linkImage.alt}
            />
            <Image
              src={IMAGE_SRC.locationImage.src}
              alt={IMAGE_SRC.locationImage.alt}
            />
          </div>
          <div className={styles.detailContentContainer}>
            <Image
              src={IMAGE_SRC.cheongsanImage.src}
              alt={IMAGE_SRC.cheongsanImage.alt}
              className={styles.detailContentImage}
            />
            <div className={styles.detailContentText}>
              {data?.fetchBoard?.contents}
            </div>
            <Image
              src={IMAGE_SRC.neotubeImage.src}
              alt={IMAGE_SRC.neotubeImage.alt}
            />
            <div className={styles.detailContentGoodOrBad}>
              <div className={styles.detailGoodContainer}>
                <Image
                  src={IMAGE_SRC.badImage.src}
                  alt={IMAGE_SRC.badImage.alt}
                />
                <div className={styles.detailBadText}>24</div>
              </div>
              <div className={styles.detailGoodContainer}>
                <Image
                  src={IMAGE_SRC.goodImage.src}
                  alt={IMAGE_SRC.goodImage.alt}
                />
                <div className={styles.detailGoodText}>12</div>
              </div>
            </div>
            <div className={styles.detailButtonsContainer}>
              <button className={styles.detailButton}>
                <Image
                  src={IMAGE_SRC.hamberger.src}
                  alt={IMAGE_SRC.hamberger.alt}
                />
                <div>목록으로</div>
              </button>
              <button className={styles.detailButton} onClick={goToEditPage}>
                <Image src={IMAGE_SRC.pencil.src} alt={IMAGE_SRC.pencil.alt} />
                <div>수정하기</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
