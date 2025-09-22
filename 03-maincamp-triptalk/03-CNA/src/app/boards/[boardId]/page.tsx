"use client"

import { useQuery,gql } from "@apollo/client";
import { useParams } from "next/navigation";
import React from "react";
import styles from "./styles.module.css";
import detailImage from "@/assets/images/detail_example.png";
import thumbnailImage from "@/assets/images/thumbnail_example.png";
import unknownIcon from "@/assets/icons/unknown.png";
import locationIcon from "@/assets/icons/location.png";
import linkIcon from "@/assets/icons/link.png";
import goodIcon from "@/assets/icons/good.png";
import badIcon from "@/assets/icons/bad.svg";
import menuIcon from "@/assets/icons/menu.png";
import editIcon from "@/assets/icons/edit.png";

const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      writer
      title
      contents
    }
  }
`;

export default function BoardsDetail() {
  const { boardId } = useParams<{ boardId: string }>();
  const { data, loading, error } = useQuery(FETCH_BOARD, {
    variables: { boardId },
    skip: !boardId,
  });

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>불러오기에 실패했습니다.</div>;

  const board = data?.fetchBoard;

  return (
    <div className={styles.detailFrame}>
      <div className={styles.detailBody}>
        <div className={styles.detailContainer}>
          <div className={styles.detailTitle}>{board?.title}</div>
          <div className={styles.detailMeta}>
            <div className={styles.detailMetaProfile}>
              <img src={unknownIcon.src} className={styles.profileIcon} />
              <span className={styles.metaAuthor}>{board?.writer}</span>
            </div>
            <span className={styles.metaDate}>2024.11.11</span>
          </div>
          <hr className={styles.formDivider} />
          <div className={styles.headerIcons}>
            <img src={linkIcon.src}></img>
            <img src={locationIcon.src}></img>
          </div>

          {/* <figure className={styles.detailImageBlock}>
            <img
              className={styles.detailImage}
              src={detailImage.src}
              alt="상세화면 임시 이미지"
            />
          </figure> */}

          <article className={styles.detailContent}>{board?.contents}</article>

          {/* <img src={thumbnailImage.src} alt="비디오 썸네일" /> */}

          <div className={styles.contentReaction}>
            <button type="button" className={`${styles.reaction} ${styles.bad}`}>
              <img src={badIcon.src} alt="싫어요" />
              <span className={styles.count}>24</span>
            </button>
            <button type="button" className={`${styles.reaction} ${styles.good}`}>
              <img src={goodIcon.src} alt="좋아요" />
              <span className={styles.count}>12</span>
            </button>
          </div>

          <div className={styles.detailActions}>
            <button type="button" className={styles.btn}>
              <img src={menuIcon.src} alt="목록 아이콘" />
              목록으로
            </button>
            <button type="button" className={styles.btn}>
              <img src={editIcon.src} alt="수정 아이콘" />
              수정하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
